# 混音：配音 + 程式合成的背景音樂 + 音效，輸出 44.1kHz 立體聲 wav。
# 用法：python mix.py <plan.json> <out.wav>
# plan = {"dur": 秒, "voice": [{"file", "t"}], "sfx": [{"name", "t", "gain"?}], "music": {...}}
# music：{"style": "calm"|"beat", "chords": [...], "bpm": 72} 用程式合成；{"file": "音樂檔路徑", "gain": 1} 用自己的音樂（自動循環、淡出）。
# 用自己的音樂請確定有使用權（免版稅、買斷或自己做的）。
import json, sys, subprocess, tempfile, os
import numpy as np
from scipy.io import wavfile
from scipy.signal import resample_poly, butter, lfilter

SR = 44100
rng = np.random.default_rng(3)

def env(n, a, r):  # attack/release 包絡（樣本數）
    e = np.ones(n); a = min(a, n // 2); r = min(r, n - a)
    if a: e[:a] = np.linspace(0, 1, a)
    if r: e[-r:] *= np.linspace(1, 0, r)
    return e

def tone(f, d, harm=(1,), decay=None):
    t = np.arange(int(d * SR)) / SR
    f = np.broadcast_to(f, t.shape) if np.ndim(f) else np.full(t.shape, f)
    ph = 2 * np.pi * np.cumsum(f) / SR
    w = sum(np.sin(ph * (k + 1)) * h for k, h in enumerate(harm))
    return w * (np.exp(-t / decay) if decay else 1)

def lp(x, fc):
    b, a = butter(2, fc / (SR / 2)); return lfilter(b, a, x)

def hp(x, fc):
    b, a = butter(2, fc / (SR / 2), "high"); return lfilter(b, a, x)

SFX = {
    "key":    lambda: hp(lp(rng.standard_normal(int(.018 * SR)), 5000), 1800) * np.exp(-np.arange(int(.018 * SR)) / 180) * .35,
    "tick":   lambda: tone(2200, .03, decay=.006) * .5,
    "pop":    lambda: tone(np.linspace(500, 1300, int(.06 * SR)), .06, (1, .3)) * env(int(.06 * SR), 40, 900) * .6,
    "whoosh": lambda: hp(lp(rng.standard_normal(int(.5 * SR)), 2500), 300) * np.hanning(int(.5 * SR)) * .35,
    "ding":   lambda: (tone(1046, 1.4, (1, 0, .4), .35) + tone(1568, 1.4, (1,), .25) * .4) * .35,
    "down":   lambda: tone(np.geomspace(520, 110, int(.6 * SR)), .6, (1, .5, .25)) * env(int(.6 * SR), 200, 8000) * .35,
    "thud":   lambda: tone(np.geomspace(140, 50, int(.35 * SR)), .35, decay=.09) * .9,
    "error":  lambda: np.concatenate([tone(196, .12, (1, 0, .33, 0, .2)) * env(int(.12 * SR), 50, 600),
                                      tone(156, .2, (1, 0, .33, 0, .2)) * env(int(.2 * SR), 50, 2500)]) * .3,
    "rise":   lambda: tone(np.geomspace(300, 900, int(.5 * SR)), .5, (1, .3)) * env(int(.5 * SR), 8000, 3000) * .25,
}

NOTE = {"C": 0, "D": 2, "E": 4, "F": 5, "G": 7, "A": 9, "B": 11}
def chord_freqs(name):  # "Am", "F", "C", "G", "Dm", "Bb", "F#m"
    root = NOTE[name[0]] + (name[1:2] == "#") - (name[1:2] == "b"); minor = name.endswith("m")
    return [440 * 2 ** ((root + i - 9) / 12) for i in (0, 3 if minor else 4, 7)]

def music(dur, chords, bpm):
    n = int(dur * SR); out = np.zeros(n); beat = 60 / bpm; bar = beat * 4
    i, t0 = 0, 0.0
    while t0 < dur:
        fs = chord_freqs(chords[i % len(chords)]); s = int(t0 * SR); L = int(bar * SR) + int(.8 * SR)
        pad = sum(tone(f / 2 * d, L / SR, (1, .5, .25, .12)) for f in fs for d in (1, 1.004)) / 6
        pad *= env(L, int(.6 * SR), int(.9 * SR)) * .5
        bass = tone(fs[0] / 4, bar, (1, .3), decay=bar * .6) * .5
        seg = slice(s, min(n, s + L)); out[seg] += pad[: seg.stop - s]
        out[s: min(n, s + len(bass))] += bass[: min(n, s + len(bass)) - s]
        arp = [fs[0], fs[1], fs[2], fs[1] * 2, fs[2], fs[1], fs[0] * 2, fs[2]]  # 8 分音符琶音
        for k, f in enumerate(arp):
            ts = int((t0 + k * beat / 2) * SR)
            if ts >= n: break
            p = tone(f, .9, (1, .2, .05), decay=.22) * .16 * (1.0 if k % 2 == 0 else .7)
            out[ts: ts + len(p)] += p[: n - ts]
        for k in range(4):  # 很輕的鼓：1、3 拍 kick，2、4 拍 hat
            ts = int((t0 + k * beat) * SR)
            if ts >= n: break
            h = SFX["thud"]() * .35 if k % 2 == 0 else hp(rng.standard_normal(int(.04 * SR)), 6000) * np.exp(-np.arange(int(.04 * SR)) / 300) * .06
            out[ts: ts + len(h)] += h[: n - ts]
        t0 += bar; i += 1
    out = lp(out, 5000)
    fade = int(1.5 * SR); out[:int(.8 * SR)] *= np.linspace(0, 1, int(.8 * SR)); out[-fade:] *= np.linspace(1, 0, fade)
    return out

def beat(dur, chords, bpm):
    """有節奏的版本：四拍 kick、2/4 拍 clap、反拍 hi-hat、8 分音符貝斯、16 分音符琶音，pad 跟著 kick 起伏（sidechain）。"""
    n = int(dur * SR); beat_s = 60 / bpm; bar = beat_s * 4
    pad = np.zeros(n); bass = np.zeros(n); drums = np.zeros(n); arp = np.zeros(n)
    def put(buf, x, t):
        s0 = int(t * SR)
        if s0 < n: buf[s0: s0 + len(x)] += x[: n - s0]
    kick = tone(np.geomspace(160, 45, int(.25 * SR)), .25, decay=.11)
    clap = sum(np.roll(np.pad(hp(lp(rng.standard_normal(int(.15 * SR)), 4000), 900) * np.exp(-np.arange(int(.15 * SR)) / 2200), (0, 600)), d) for d in (0, 220, 440)) * .22
    hat = hp(rng.standard_normal(int(.05 * SR)), 7000) * np.exp(-np.arange(int(.05 * SR)) / 350) * .09
    i, t0 = 0, 0.0
    while t0 < dur:
        fs = chord_freqs(chords[i % len(chords)]); L = int(bar * SR) + int(.5 * SR)
        p = sum(tone(f / 2 * d, L / SR, (1, .45, .2, .1)) for f in fs for d in (1, 1.005)) / 6 * env(L, int(.08 * SR), int(.5 * SR))
        put(pad, p, t0)
        for k in range(4):
            put(drums, kick * .75, t0 + k * beat_s)
            if k % 2: put(drums, clap, t0 + k * beat_s)
            put(drums, hat, t0 + k * beat_s + beat_s / 2)
        for k, step in enumerate((0, 1.5, 2, 3.5)):  # 貝斯：1、2&、3、4&
            put(bass, tone(fs[0] / 4, .35, (1, .5, .2), decay=.16) * .55, t0 + step * beat_s)
        notes = [fs[0], fs[1], fs[2], fs[1] * 2, fs[2] * 2, fs[1] * 2, fs[2], fs[1]]
        for k in range(16):
            put(arp, tone(notes[k % 8] * 2, .3, (1, .15), decay=.07) * (.10 if k % 2 == 0 else .06), t0 + k * beat_s / 4)
        t0 += bar; i += 1
    # sidechain：每拍 kick 後 pad 壓下再回來
    ph = (np.arange(n) / SR) % beat_s / beat_s
    side = .35 + .65 * np.clip(ph / .45, 0, 1) ** .7
    out = lp(pad, 3500) * side * .6 + lp(bass, 900) + drums + lp(arp, 6000) * side
    fade = int(1.5 * SR); out[:int(.3 * SR)] *= np.linspace(0, 1, int(.3 * SR)); out[-fade:] *= np.linspace(1, 0, fade)
    return out / (np.abs(out).max() + 1e-9) * .9

def music_file(path, dur, gain=1.0):
    with tempfile.TemporaryDirectory() as d:
        tmp = os.path.join(d, "m.wav")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", path, "-ac", "1", "-ar", str(SR), tmp], check=True)
        w = load(tmp)
    n = int(dur * SR); w = np.tile(w, n // len(w) + 1)[:n]
    w = w / (np.sqrt(np.mean(w ** 2)) + 1e-9) * .18 * gain  # 統一響度
    fade = int(2 * SR); w[-fade:] *= np.linspace(1, 0, fade)
    return w

def load(path):
    sr, w = wavfile.read(path); w = w.astype(np.float64) / 32768
    return resample_poly(w, SR, sr) if sr != SR else w

def main():
    plan = json.load(open(sys.argv[1])); dur = plan["dur"]; n = int(dur * SR)
    voice = np.zeros(n); fx = np.zeros(n)
    for v in plan["voice"]:
        w = load(v["file"]); s = int(v["t"] * SR); voice[s: s + len(w)] += w[: max(0, n - s)]
    for e in plan["sfx"]:
        w = SFX[e["name"]]() * e.get("gain", 1); s = int(e["t"] * SR)
        if s < n: fx[s: s + len(w)] += w[: n - s]
    m = plan.get("music", {})
    if m is None: m = {}
    if m is False: bg = np.zeros(n)
    elif m.get("file"): bg = music_file(m["file"], dur, m.get("gain", 1.0)) / .32
    elif m.get("style") == "beat": bg = beat(dur, m.get("chords", ["F", "C", "Dm", "Bb"]), m.get("bpm", 112)) * .8 * m.get("gain", 1.0)
    else: bg = music(dur, m.get("chords", ["Am", "F", "C", "G"]), m.get("bpm", 72))
    act = lp((np.abs(voice) > .02).astype(float), 3)  # 有人聲時把音樂壓低（ducking）
    duck = 1 - .55 * np.clip(act * 1.6, 0, 1)
    mix = voice * .95 + fx * .7 + bg * .32 * duck
    if m is not False:  # 有音樂時把整體響度拉到約 -15 dBFS（短影音平台常見音量），再用 tanh 柔性限幅
        mix *= 10 ** (-15 / 20) / (np.sqrt(np.mean(mix ** 2)) + 1e-9)
        mix = np.tanh(mix * 1.1) / 1.1
    mix /= max(1, np.abs(mix).max() / .95)
    st = np.stack([mix, mix], 1)
    wavfile.write(sys.argv[2], SR, (st * 32767).astype(np.int16))

if __name__ == "__main__":
    main()
