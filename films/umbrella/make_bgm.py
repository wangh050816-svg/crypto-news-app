"""《帶傘的人》的配樂：程式合成（鋼琴 + 鼓 + 低音 + 長音），不用外部素材。84 BPM，一小節 ≈ 2.857 秒。
段落跟著故事走（成片時間，秒）：
  0–28.4    街上、辦公室：A 小調（Am–F–C–G），鋼琴分解和弦 + 輕鼓，有點可愛、有點憂鬱
  28.4–45   夜裡：鼓停，鋼琴變稀，只剩長音
  45–53.6   暗下來：長音慢慢升起
  53.6–61   片名：大和弦 + 鐘
  61–90     月曆、心理學：節奏回來；86 秒「只改一個詞」轉到 C 大調
  90–106.4  三個方法、出門：C 大調（C–G–Am–F），完整的鼓 + 旋律
  106.4–110 下雨：整首悶住（低通）、變小
  110.4–122 一起撐傘、彩虹：副歌全開
  122.4–128 片尾：鋼琴收在一個和弦
用法：python make_bgm.py [輸出，預設 audio/bgm.wav]
"""
import sys, wave
from pathlib import Path
import numpy as np
from scipy.signal import butter, lfilter, sosfilt, fftconvolve

SR = 48000
DUR = 128.0
N = int(DUR * SR)
BPM = 84; BEAT = 60 / BPM; BAR = BEAT * 4
rng = np.random.default_rng(84)
music = np.zeros((N, 2))

def hz(m): return 440 * 2 ** ((m - 69) / 12)
def lp(x, fc): b, a = butter(2, fc / (SR / 2), "low"); return lfilter(b, a, x)
def hp(x, fc): b, a = butter(2, fc / (SR / 2), "high"); return lfilter(b, a, x)
def env(n, tau, att=.003): t = np.arange(n) / SR; return np.minimum(1, t / att) * np.exp(-t / tau)
def put(x, t, gain=1.0, pan=0.0):
    i = int(t * SR)
    if i >= N or i < 0: return
    x = x[: N - i] * gain
    music[i:i + len(x), 0] += x * np.sqrt((1 - pan) / 2); music[i:i + len(x), 1] += x * np.sqrt((1 + pan) / 2)

# ---------- 樂器 ----------
_piano = {}
def piano(m, d=1.8, vel=1.0):
    key = (m, round(d, 2))
    if key not in _piano:
        n = int(d * SR); t = np.arange(n) / SR; f = hz(m); x = np.zeros(n)
        for k in range(1, 9):
            fk = f * k * (1 + .0004 * k * k); x += np.sin(2 * np.pi * fk * t) / k ** 1.3 * np.exp(-t * (1.2 + k * .55))
        x += hp(rng.standard_normal(n), 2000) * env(n, .004) * .05             # 琴槌
        x *= np.minimum(1, t / .004); x[-int(.08 * SR):] *= np.linspace(1, 0, int(.08 * SR))
        _piano[key] = lp(x, 5200)
    return _piano[key] * vel
def kick(): n = int(.4 * SR); t = np.arange(n) / SR; f = 45 + 90 * np.exp(-t * 30); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .16)
def snare(): n = int(.25 * SR); t = np.arange(n) / SR; return (hp(rng.standard_normal(n), 1500) * .6 + np.sin(2 * np.pi * 190 * t) * .5) * np.exp(-t / .06)
def rim(): n = int(.06 * SR); t = np.arange(n) / SR; return (np.sin(2 * np.pi * 1700 * t) * .5 + hp(rng.standard_normal(n), 3000) * .4) * np.exp(-t / .012)
def hat(open_=False): d = .25 if open_ else .05; n = int(d * SR); return hp(rng.standard_normal(n), 7000) * np.exp(-np.arange(n) / SR / (.07 if open_ else .012))
def bass(m, d): n = int(d * SR); t = np.arange(n) / SR; f = hz(m); x = np.sin(2 * np.pi * f * t) + .25 * np.sin(2 * np.pi * 2 * f * t); return x * np.minimum(1, t / .01) * np.exp(-t / (d * .9)) * np.minimum(1, (d - t) / .05).clip(0)
def pad(ms, d, att=1.0, rel=1.2):
    n = int(d * SR); t = np.arange(n) / SR; x = np.zeros(n)
    for m in ms:
        for dt in (-.06, .06): f = hz(m) * 2 ** (dt / 12); x += np.sin(2 * np.pi * f * t) + .25 * np.sin(2 * np.pi * 2 * f * t)
    return lp(x / len(ms) / 2 * np.minimum(1, t / att) * np.minimum(1, (d - t) / rel).clip(0), 1800)
def bell(m, d=4.0):
    n = int(d * SR); t = np.arange(n) / SR; f = hz(m)
    return sum(a * np.sin(2 * np.pi * f * r * t) * env(n, tau) for r, a, tau in ((1, 1, 1.6), (2.76, .45, .6), (5.4, .2, .3)))

# ---------- 和弦（根音, 和弦音） ----------
AM = [(45, [57, 60, 64]), (41, [57, 60, 65]), (48, [55, 60, 64]), (43, [55, 59, 62])]      # Am F C G
CM = [(48, [55, 60, 64]), (43, [55, 59, 62]), (45, [57, 60, 64]), (41, [57, 60, 65])]      # C G Am F

def section(t0, t1, prog, drums=0, arp=1.0, mel=None, padg=.05, bassg=.28):
    """drums: 0 無 / 1 輕（邊擊 + 鈸）/ 2 完整（大鼓 + 小鼓 + 鈸）。mel：每小節一組 (拍, 音) 的旋律"""
    bar, t = 0, t0
    while t < t1 - .05:
        root, ch = prog[bar % 4]
        put(pad(ch, min(BAR, t1 - t) + .5, .5, .6), t, padg)
        if bassg: put(bass(root - 12 + 12, BEAT * 1.8), t, bassg); put(bass(root, BEAT * 1.8), t + BEAT * 2, bassg * .8)
        if arp:
            pat = [0, 1, 2, 1, 0, 2, 1, 2]
            for i, p in enumerate(pat):
                tt = t + i * BEAT / 2
                if tt >= t1: break
                put(piano(ch[p] + 12, 1.4), tt, .10 * arp * (1 if i % 2 == 0 else .7), -.25 if p == 0 else .25)
        if mel:
            for beat, m in mel[bar % len(mel)]:
                tt = t + beat * BEAT
                if tt < t1: put(piano(m + 24, 2.2), tt, .17, .1)
        for b in range(4):
            tt = t + b * BEAT
            if tt >= t1: break
            if drums >= 1: put(hat(), tt, .10); put(hat(), tt + BEAT / 2, .06)
            if drums == 1 and b in (1, 3): put(rim(), tt, .16)
            if drums >= 2:
                if b in (0, 2): put(kick(), tt, .55)
                if b == 2 and bar % 2: put(kick(), tt + BEAT / 2, .35)
                if b in (1, 3): put(snare(), tt, .30)
        bar += 1; t += BAR

MEL_A = [[(0, 64), (1.5, 62), (2, 60), (3, 59)], [(0, 60), (2, 57)], [(0, 60), (1, 62), (2, 64), (3, 67)], [(0, 67), (2, 62)]]
MEL_C = [[(0, 64), (1, 67), (2, 72), (3, 71)], [(0, 71), (1.5, 69), (2, 67)], [(0, 69), (1, 72), (2, 76), (3, 74)], [(0, 72), (2, 69), (3, 67)]]

# 1–2. 街上、辦公室
section(0.2, 12.2, AM, drums=1, arp=.9)
section(12.2, 28.4, AM, drums=1, arp=1.0, mel=MEL_A)
# 3. 夜裡：鼓停，鋼琴稀疏
section(28.4, 45.0, AM, drums=0, arp=.55, padg=.06, bassg=.18)
# 暗下來 → 片名
put(pad([57, 60, 64, 69], 8.6, 3.0, 1.0), 45.0, .10)
for i, m in enumerate([69, 72, 76]): put(piano(m, 3), 45.3 + i * 2.6, .16)
put(pad([45, 57, 60, 64, 67, 72], 8.0, .6, 2.6), 53.4, .14)
put(bell(76, 5), 53.6, .20); put(bell(84, 4), 54.9, .10); put(piano(45, 4) + piano(57, 4), 53.6, .3)
# 4–5. 月曆、心理學；86 秒轉到 C 大調
section(61.0, 86.4, AM, drums=1, arp=1.0, mel=MEL_A)
section(86.4, 90.2, CM, drums=1, arp=1.0)
# 6. 三個方法、出門：完整的鼓
section(90.2, 106.4, CM, drums=2, arp=1.0, mel=MEL_C, padg=.06)
# 7. 下雨（之後整段做低通）→ 撐傘 → 副歌
section(106.4, 110.4, CM, drums=1, arp=.7, padg=.06)
for i in range(8): put(snare() * (i / 8), 109.4 + i * BEAT / 8 * 2, .2)            # 撐傘前的鼓滾
section(110.4, 122.4, CM, drums=2, arp=1.1, mel=MEL_C, padg=.08, bassg=.32)
put(bell(84, 4), 119.2, .14); put(bell(88, 4), 119.6, .1)
# 片尾
put(pad([48, 55, 60, 64, 67, 72], 6.0, .3, 3.0), 122.4, .14)
for i, m in enumerate([60, 64, 67, 72]): put(piano(m, 5), 122.4 + i * .12, .2)
put(piano(48, 5) + piano(36, 5), 122.4, .25)

# 下雨那段整首悶住：低通 + 壓小
a, b = int(106.4 * SR), int(110.4 * SR)
for c in (0, 1): seg = music[a - 2400:b + 2400, c]; f = lp(lp(seg, 700), 700); w = np.ones(len(seg)); r = 2400; w[:r] = np.linspace(0, 1, r); w[-r:] = np.linspace(1, 0, r); music[a - 2400:b + 2400, c] = seg * (1 - w) + f * w * .7

# 混響 + 限幅
irn = int(1.8 * SR); ir = lp(rng.standard_normal(irn) * np.exp(-6.9 * np.arange(irn) / SR / 1.8), 4500); ir /= np.abs(ir).sum() / 5
wet = np.stack([fftconvolve(music[:, c], ir)[:N] for c in (0, 1)], 1)
mix = music + .2 * wet
fn = int(1.0 * SR); mix[-fn:] *= np.linspace(1, 0, fn)[:, None]
mix = np.tanh(mix / np.abs(mix).max() * 1.5) * .75
dst = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).parent / "audio" / "bgm.wav"); dst.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(dst), "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype("<i2").tobytes())
print("bgm:", dst)
