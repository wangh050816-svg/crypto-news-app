"""Remotion 廣告的少量音效：只打在剪接點上（hook 重擊、每個快剪的咻聲、數字跳到 30% 的重擊、CTA 的叮）。三支變體時間軸相同，共用這一軌。"""
import sys, wave
from pathlib import Path
import numpy as np
from scipy.signal import butter, lfilter
SR = 48000; DUR = 20.0; N = int(DUR * SR); rng = np.random.default_rng(31)
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

def drone(d):                                        # 低沉長音：兩個略微失諧的低音 + 很淡的五度
    n = int(d * SR); t = np.arange(n) / SR; f = 55
    x = np.sin(2 * np.pi * f * t) + np.sin(2 * np.pi * f * 1.003 * t) + .35 * np.sin(2 * np.pi * f * 1.5 * t) + .15 * np.sin(2 * np.pi * f * 3 * t)
    return lp(x, 500) * np.minimum(1, t / 2.0) * np.minimum(1, (d - t) / 1.2).clip(0) * .5
put(boom(1.0), .05, -6); put(whoosh(.4, 600, 3000), .1, -16)           # Hook 進場
put(riser(.4, 200, 900), 2.6, -20); put(boom(), 3.0, -5)                # 萬聖節狂歡夜 重擊
put(whoosh(.4, 500, 2600), 3.5, -18, -.4)                              # 標語帶
for i in range(5): put(whoosh(.35, 500, 3200), 7.0 + i * 1.6, -15, .5 * (1 if i % 2 else -1))   # 五個福利快剪
put(riser(.8, 200, 1400), 15.0, -17); put(boom(), 15.8, -4)             # 30% 跳上去
put(whoosh(.5, 300, 2400), 17.0, -16); put(ding(1046), 17.4, -11); put(ding(1568, 1.6), 17.52, -15)   # CTA
fn = int(.5 * SR); out[-fn:] *= np.linspace(1, 0, fn)[:, None]
out = np.tanh(out / np.abs(out).max() * 1.2) * .85
dst = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).parent / "audio" / "sfx.wav"); dst.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(dst), "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((out * 32767).astype("<i2").tobytes())
print("sfx:", dst)
