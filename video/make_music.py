"""合成一段原創 lo-fi 背景音樂，並混進 naval_trading.mp4。

用法: python3 video/make_music.py [影片路徑]
需要: numpy、ffmpeg
節奏 64 BPM：一小節 3.75 秒，剛好每兩小節對應影片的一個段落 (7.5 秒)。
"""
import subprocess
import sys
import wave
from pathlib import Path

import numpy as np

SR = 44100
BPM = 64
BEAT = 60 / BPM
BAR = BEAT * 4
GRID_OFFSET = 0.75  # 讓小節線對齊第一個段落 (4.5 秒) 的起點
DRUMS_IN = 12.0
OUTRO_AT = 57.0

# Am9 – Fmaj7 – C(add9) – G6，每小節一個和弦
CHORDS = [
    [57, 60, 64, 67, 71],
    [53, 57, 60, 64, 69],
    [48, 55, 60, 62, 64],
    [43, 55, 59, 62, 64],
]


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


def env_ar(n, attack, release):
    e = np.ones(n)
    a = min(n, int(attack * SR))
    r = min(n - a, int(release * SR))
    if a:
        e[:a] = np.linspace(0, 1, a)
    if r:
        e[n - r:] = np.linspace(1, 0, r)
    return e


def add(buf, start, sig):
    i = int(start * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[: j - i]


def lowpass(x, cutoff):
    """簡單的一階低通濾波 (向量化近似：用 FFT 做頻域衰減)。"""
    spec = np.fft.rfft(x)
    f = np.fft.rfftfreq(len(x), 1 / SR)
    spec /= np.sqrt(1 + (f / cutoff) ** 2)
    return np.fft.irfft(spec, len(x))


def pad_note(freq, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    sig = np.zeros(n)
    for detune in (-0.12, 0.0, 0.12):
        f = freq * 2 ** (detune / 12)
        for h, amp in ((1, 1.0), (2, 0.35), (3, 0.15), (4, 0.07)):
            sig += amp * np.sin(2 * np.pi * f * h * t + detune * 7)
    trem = 1 + 0.08 * np.sin(2 * np.pi * 0.25 * t)
    return sig * trem * env_ar(n, 1.2, 1.4) / 4


def pluck(freq, dur=1.6):
    n = int(dur * SR)
    t = np.arange(n) / SR
    sig = np.sin(2 * np.pi * freq * t) + 0.3 * np.sin(2 * np.pi * freq * 2 * t)
    sig += 0.1 * np.sin(2 * np.pi * freq * 3 * t)
    return sig * np.exp(-t * 4.5) * env_ar(n, 0.004, 0.05)


def bass(freq, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    sig = np.sin(2 * np.pi * freq * t) + 0.25 * np.sin(2 * np.pi * freq * 2 * t)
    return sig * np.exp(-t * 1.2) * env_ar(n, 0.01, 0.15)


def kick():
    n = int(0.45 * SR)
    t = np.arange(n) / SR
    f = 45 + 80 * np.exp(-t * 30)
    phase = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(phase) * np.exp(-t * 9)


def snare(rng):
    n = int(0.3 * SR)
    t = np.arange(n) / SR
    noise = lowpass(rng.standard_normal(n), 3500)
    tone = np.sin(2 * np.pi * 185 * t)
    return (0.6 * noise * np.exp(-t * 18) + 0.4 * tone * np.exp(-t * 25)) * 0.8


def hat(rng):
    n = int(0.08 * SR)
    t = np.arange(n) / SR
    noise = np.diff(rng.standard_normal(n + 1))
    return noise * np.exp(-t * 60) * 0.25


def reverb(x, seconds=2.2, mix=0.28, rng=None):
    n = int(seconds * SR)
    t = np.arange(n) / SR
    ir = rng.standard_normal(n) * np.exp(-t * 3.2)
    ir = lowpass(ir, 5000)
    ir /= np.sqrt(np.sum(ir ** 2))
    size = 1 << int(np.ceil(np.log2(len(x) + n)))
    wet = np.fft.irfft(np.fft.rfft(x, size) * np.fft.rfft(ir, size), size)[: len(x)]
    return (1 - mix) * x + mix * wet


def video_duration(path):
    out = subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "format=duration",
        "-of", "default=nw=1:nk=1", str(path),
    ])
    return float(out)


def compose(total):
    rng = np.random.default_rng(7)
    n = int((total + 3) * SR)
    pads = np.zeros(n)
    plucks = np.zeros(n)
    low = np.zeros(n)
    drums = np.zeros(n)

    # 前奏：段落開始前先鋪一點和弦
    add(pads, 0, pad_note(hz(CHORDS[3][0] + 12), GRID_OFFSET + 0.8) * 0.6)

    bar_idx = 0
    t0 = GRID_OFFSET
    arp_pattern = [0, 2, 4, 3, 1, 3, 2, 4]
    while t0 < total:
        chord = CHORDS[bar_idx % len(CHORDS)]
        for note in chord:
            add(pads, t0, pad_note(hz(note), BAR + 1.2))

        if t0 >= 4.4:
            root = chord[0] - 12 if chord[0] >= 48 else chord[0]
            add(low, t0, bass(hz(root), BEAT * 2))
            add(low, t0 + BEAT * 2.5, bass(hz(root), BEAT * 1.5) * 0.7)
            for k, idx in enumerate(arp_pattern):
                if t0 >= OUTRO_AT and k % 2:
                    continue
                vel = 0.55 + 0.25 * rng.random()
                add(plucks, t0 + k * BEAT / 2, pluck(hz(chord[idx] + 12)) * vel)

        if DRUMS_IN - 0.01 <= t0 < OUTRO_AT:
            for b in range(4):
                bt = t0 + b * BEAT
                if b in (0, 2):
                    add(drums, bt, kick())
                if b == 2 and rng.random() < 0.5:
                    add(drums, bt + BEAT * 0.75, kick() * 0.5)
                if b in (1, 3):
                    add(drums, bt, snare(rng))
                for half in (0, 0.5):
                    add(drums, bt + half * BEAT + rng.normal(0, 0.006), hat(rng) * (1 if half else 0.6))
        t0 += BAR
        bar_idx += 1

    # 撥弦加一個 3/8 拍的回音
    d = int(BEAT * 0.75 * SR)
    echo = np.zeros_like(plucks)
    echo[d:] = plucks[:-d] * 0.35
    plucks = plucks + echo

    pads = lowpass(pads, 1800)
    music_l = 0.55 * pads + 0.42 * plucks + 0.6 * low + 0.5 * drums
    music_r = 0.55 * pads + 0.30 * np.roll(plucks, int(0.012 * SR)) + 0.6 * low + 0.5 * drums
    music_l = reverb(music_l, rng=rng)
    music_r = reverb(music_r, rng=rng)

    st = np.stack([music_l, music_r], axis=1)[: int(total * SR)]
    fade_in = int(1.0 * SR)
    fade_out = int(3.5 * SR)
    st[:fade_in] *= np.linspace(0, 1, fade_in)[:, None]
    st[-fade_out:] *= np.linspace(1, 0, fade_out)[:, None] ** 1.5
    st = np.tanh(st / np.max(np.abs(st)) * 1.2) * 0.8  # 柔性限幅
    return st


def write_wav(path, st):
    data = (st * 32767).astype("<i2")
    with wave.open(str(path), "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(data.tobytes())


def main():
    video = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent / "naval_trading.mp4"
    total = video_duration(video)
    wav = video.with_name("naval_trading_music.wav")
    write_wav(wav, compose(total))

    tmp = video.with_name(video.stem + ".tmp.mp4")
    subprocess.run([
        "ffmpeg", "-y", "-loglevel", "error", "-i", str(video), "-i", str(wav),
        "-map", "0:v", "-map", "1:a", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
        "-af", "loudnorm=I=-16:TP=-1.5:LRA=11", "-shortest", "-movflags", "+faststart", str(tmp),
    ], check=True)
    tmp.replace(video)
    wav.unlink()
    print(f"已加入背景音樂: {video} ({total:.1f} 秒)")


if __name__ == "__main__":
    main()
