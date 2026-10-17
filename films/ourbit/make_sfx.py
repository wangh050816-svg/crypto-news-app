"""OURBIT 萬聖節短片的少量音效：只在幾個進場點放聲音（低頻重擊、咻、閃光聲、叮）。程式合成，沒有配樂。"""
import sys, wave
from pathlib import Path
import numpy as np
from scipy.signal import butter, lfilter
SR = 48000; DUR = 23.0; N = int(DUR * SR); rng = np.random.default_rng(31)
out = np.zeros((N, 2))
def bp(x, lo, hi): b, a = butter(2, [lo / (SR / 2), hi / (SR / 2)], "band"); return lfilter(b, a, x)
def lp(x, fc): b, a = butter(2, fc / (SR / 2), "low"); return lfilter(b, a, x)
def env(n, tau, att=.003): t = np.arange(n) / SR; return np.minimum(1, t / att) * np.exp(-t / tau)
def put(x, t, db=0, pan=0):
    g = 10 ** (db / 20); i = int(t * SR); x = x[: N - i] * g
    out[i:i + len(x), 0] += x * np.sqrt((1 - pan) / 2); out[i:i + len(x), 1] += x * np.sqrt((1 + pan) / 2)
def boom(d=1.6):                                    # 低頻重擊：下滑的正弦 + 一點噪聲
    n = int(d * SR); t = np.arange(n) / SR; f = 38 + 90 * np.exp(-t * 9)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .45) + lp(rng.standard_normal(n), 400) * env(n, .08) * .6
def whoosh(d=.5, lo=300, hi=3000):
    n = int(d * SR); k = np.arange(n) / n; x = rng.standard_normal(n); y = np.zeros(n)
    for fc in np.geomspace(lo, hi, 6): y += bp(x, fc * .75, min(fc * 1.35, 20000)) * np.exp(-np.log((lo * (hi / lo) ** k) / fc) ** 2 / .18)
    return y * np.sin(np.pi * k) ** 2
def shimmer(d=1.6):
    n = int(d * SR); t = np.arange(n) / SR; y = np.zeros(n)
    for _ in range(12):
        f = rng.uniform(2500, 6000); i0 = int(rng.uniform(0, d * .5) * SR); m = n - i0; y[i0:] += np.sin(2 * np.pi * f * t[:m]) * env(m, .3, .01) * rng.uniform(.3, 1)
    return y
def ding(f, d=2.0):
    n = int(d * SR); t = np.arange(n) / SR
    return sum(a * np.sin(2 * np.pi * f * r * t) * env(n, tau) for r, a, tau in ((1, 1, .9), (2.76, .4, .35), (5.4, .15, .15)))
def riser(d, lo=150, hi=900): n = int(d * SR); t = np.arange(n) / SR; f = lo * (hi / lo) ** (t / d); return np.sin(2 * np.pi * np.cumsum(f) / SR) * (t / d) ** 2 * .6 + bp(rng.standard_normal(n), 2000, 8000) * (t / d) ** 3 * .25

put(shimmer(2.0), 1.0, -16)                         # Logo 掃光
put(riser(.6), 2.65, -18); put(boom(), 3.25, -4)     # 標題重擊
put(whoosh(.45, 400, 2400), 4.0, -16, -.4)          # 標語滑入
put(whoosh(.8, 200, 1500), 6.3, -14)                # 卡包升起
put(shimmer(1.8), 7.4, -14)                         # 金光掃過
put(riser(.9, 200, 1400), 10.05, -18); put(boom(), 10.95, -3)   # 30% 重擊
put(whoosh(.4, 600, 3000), 11.7, -16, .3)           # 加碼徽章
for i, c in enumerate([13.7, 14.95, 16.2, 17.45]): put(whoosh(.35, 500, 3200), c, -16, .5)   # 四張卡
put(ding(1046), 20.3, -12); put(ding(1568, 1.6), 20.42, -16)    # 立即註冊
fn = int(.5 * SR); out[-fn:] *= np.linspace(1, 0, fn)[:, None]
out = np.tanh(out / np.abs(out).max() * 1.2) * .85
dst = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).parent / "audio" / "sfx.wav"); dst.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(dst), "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype("<i2").tobytes())
print("sfx:", dst)
