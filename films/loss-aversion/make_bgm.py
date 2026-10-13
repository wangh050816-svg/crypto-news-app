"""《损失的重量》的配乐：代码合成，不用外部素材。
96 BPM，一小节 2.5 秒，D 大调 I–vi–IV–V。马林巴琶音 + 拨弦低音 + 长音垫底。
段落跟着画面走（秒）：
  0–35     猴舍：马林巴 + 拨弦，好奇、轻快
  35–36.4  收住
  36.4–44  片名：暖和弦铺开 + 一声钟
  44–52.4  规则卡：只有低音和长音
  52.4–60.4 抛硬币：心跳一样的低音脉冲，越来越近，58.4 秒停
  60.4–67.9 "正面要赢多少"：悬着的长音；67.9 秤放平，落回大调，琶音轻轻回来，76.5 淡出
用法：python make_bgm.py [输出路径，默认 audio/bgm.wav]
"""
import sys, wave
from pathlib import Path
import numpy as np
from scipy.signal import butter, lfilter, fftconvolve

SR = 48000
DUR = 76.5
BEAT = 60 / 96
BAR = BEAT * 4
N = int(DUR * SR)
rng = np.random.default_rng(7)

def hz(midi): return 440 * 2 ** ((midi - 69) / 12)
def lp(x, fc): b, a = butter(2, fc / (SR / 2), "low"); return lfilter(b, a, x)
def env(n, tau, att=.004):
    t = np.arange(n) / SR
    return np.minimum(1, t / att) * np.exp(-t / tau)

out = np.zeros((N, 2))
def put(x, t, pan=0.0, gain=1.0):
    i = int(t * SR)
    if i >= N: return
    x = x[: N - i] * gain
    out[i:i + len(x), 0] += x * np.sqrt((1 - pan) / 2)
    out[i:i + len(x), 1] += x * np.sqrt((1 + pan) / 2)

def marimba(m, dur=.9):
    n = int(dur * SR); t = np.arange(n) / SR; f = hz(m)
    x = np.sin(2 * np.pi * f * t) * env(n, .32) + .35 * np.sin(2 * np.pi * f * 3.93 * t) * env(n, .05) + .12 * np.sin(2 * np.pi * f * 9.2 * t) * env(n, .015)
    return x
def pizz(m, dur=.8):
    n = int(dur * SR); t = np.arange(n) / SR; f = hz(m)
    x = sum(np.sin(2 * np.pi * f * k * t) / k ** 1.4 for k in range(1, 7)) * env(n, .28, .006)
    return lp(x, 900)
def pad(ms, dur, att=1.2, rel=1.5):
    n = int(dur * SR); t = np.arange(n) / SR; x = np.zeros(n)
    for m in ms:
        for d in (-.07, .07):
            f = hz(m) * 2 ** (d / 12); x += np.sin(2 * np.pi * f * t) + .3 * np.sin(2 * np.pi * 2 * f * t) + .12 * np.sin(2 * np.pi * 3 * f * t)
    e = np.minimum(1, t / att) * np.minimum(1, (dur - t) / rel).clip(0)
    return lp(x * e / len(ms) / 2, 1600)
def bell(m, dur=4.0):
    n = int(dur * SR); t = np.arange(n) / SR; f = hz(m)
    return sum(a * np.sin(2 * np.pi * f * r * t) * env(n, tau) for r, a, tau in ((1, 1, 1.6), (2.76, .5, .7), (5.4, .25, .3), (8.93, .12, .15)))
def thump(dur=.5):
    n = int(dur * SR); t = np.arange(n) / SR; f = 70 * np.exp(-t * 10) + 42
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .14, .003)

# 和弦（midi）：根音、三个和弦音
MAJ = [(50, [62, 66, 69]), (47, [59, 62, 66]), (43, [62, 67, 71]), (45, [61, 64, 69])]     # D  Bm  G  A
MIN = [(47, [59, 62, 66]), (43, [59, 62, 67]), (40, [59, 64, 67]), (42, [58, 61, 66])]     # Bm G  Em F#
PAT = [0, 2, 1, 2, 0, 2, 1, 2]

def groove(t0, t1, prog, gain=1.0, sparse=False):
    bar = 0; t = t0
    while t < t1 - .01:
        root, ch = prog[bar % 4]
        for i, p in enumerate(PAT):
            tt = t + i * BEAT / 2
            if tt >= t1 or (sparse and i % 2): continue
            m = ch[p] + 12
            put(marimba(m), tt, pan=(-.35 if p == 0 else .25 if p == 1 else 0), gain=.16 * gain * (1.0 if i % 2 == 0 else .75))
        for b in (0, 2):
            tt = t + b * BEAT
            if tt < t1: put(pizz(root), tt, gain=.32 * gain)
        put(pad(ch, min(BAR, t1 - t) + .6, .6, .8), t, gain=.07 * gain)
        bar += 1; t += BAR

groove(0.3, 35.0, MAJ)
put(pad([62, 66, 69, 74], 3.0, 1.0, 1.4), 34.6, gain=.10)                        # 收住
put(pad([50, 57, 62, 66, 69], 8.0, .6, 2.4), 36.1, gain=.16)                      # 片名
put(bell(74, 5.0), 36.4, gain=.22); put(bell(81, 4.0), 37.65, gain=.12); put(bell(78, 4.0), 38.9, gain=.1)
put(pad([47, 59, 62, 66], 8.4, .8, 1.6), 44.0, gain=.12)                          # 规则卡
for tt in (44.4, 46.9, 49.4): put(pizz(35, 1.6), tt, gain=.45)
put(pizz(38, 1.6), 50.6, gain=.35)
# 抛硬币：心跳，越来越快，"−100" 落进秤里时停
t, gap = 53.4, .62
while t < 58.2:
    put(thump(), t, gain=.3); put(thump(), t + .18, gain=.16); t += gap; gap = max(.42, gap * .95)
put(pad([47, 54, 59], 6.0, 1.0, 1.4), 52.6, gain=.08)
put(bell(59, 3.0), 58.4, gain=.18)
put(pad([47, 54, 59, 62], 7.6, 1.2, 1.0), 60.4, gain=.09)                         # 正面要赢多少：悬着
put(pad([50, 57, 62, 66, 69], 9.0, .4, 3.0), 67.9, gain=.15)                      # 放平：落回 D 大调
put(bell(74, 5.0), 67.95, gain=.2); put(bell(78, 4.0), 68.6, gain=.1)
groove(70.0, 75.6, MAJ, gain=.6, sparse=True)

# 一点混响 + 限幅
ir_n = int(2.2 * SR); ir = lp(rng.standard_normal(ir_n) * np.exp(-6.9 * np.arange(ir_n) / SR / 2.2), 4000); ir /= np.abs(ir).sum() / 6
wet = np.stack([fftconvolve(out[:, c], ir)[:N] for c in (0, 1)], 1)
mix = out + .18 * wet
fade = np.ones(N); fn = int(.8 * SR); fade[-fn:] = np.linspace(1, 0, fn)
mix *= fade[:, None]
mix = np.tanh(mix / max(1e-9, np.abs(mix).max()) * 1.4) * .7

dst = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).parent / "audio" / "bgm.wav"); dst.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(dst), "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((mix * 32767).astype("<i2").tobytes())
print("bgm:", dst)
