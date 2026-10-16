"""《帶傘的人》的音效軌：全部用程式合成，沒有配樂。時間是成片時間（秒），和 film.js 對齊。
用法：python make_sfx.py [輸出，預設 audio/sfx.wav]
"""
import sys, wave
from pathlib import Path
import numpy as np
from scipy.signal import butter, lfilter, fftconvolve

SR = 48000
DUR = 128.0
N = int(DUR * SR)
rng = np.random.default_rng(1229)
out = np.zeros((N, 2))

def bp(x, lo, hi, order=2): b, a = butter(order, [lo / (SR / 2), hi / (SR / 2)], "band"); return lfilter(b, a, x)
def lp(x, fc, order=2): b, a = butter(order, fc / (SR / 2), "low"); return lfilter(b, a, x)
def hp(x, fc, order=2): b, a = butter(order, fc / (SR / 2), "high"); return lfilter(b, a, x)
def env(n, tau, att=.003):
    t = np.arange(n) / SR
    return np.minimum(1, t / att) * np.exp(-t / tau)
def noise(d): return rng.standard_normal(int(d * SR))
def put(x, t, gain=1.0, pan=0.0):
    i = int(t * SR)
    if i >= N or i < 0: return
    x = x[: N - i] * gain
    out[i:i + len(x), 0] += x * np.sqrt((1 - pan) / 2)
    out[i:i + len(x), 1] += x * np.sqrt((1 + pan) / 2)
def db(x): return 10 ** (x / 20)

# ---------- 音色 ----------
def click(d=.03): n = int(d * SR); return hp(noise(d), 2500) * env(n, .004)
def thump(f0=90, f1=45, d=.5):
    n = int(d * SR); t = np.arange(n) / SR; f = f1 + (f0 - f1) * np.exp(-t * 12)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .12)
def switch():                                      # 大开关"喀"：咔嗒 + 低沉一下
    x = np.zeros(int(.5 * SR)); c = click(.04) * 1.2; x[:len(c)] += c; x += thump(140, 60, .5) * .8
    return x
def hum(d, a=.6):                                  # 灯泡嗡嗡：60Hz 系列 + 一点沙沙
    n = int(d * SR); t = np.arange(n) / SR
    x = .5 * np.sin(2 * np.pi * 120 * t) + .25 * np.sin(2 * np.pi * 240 * t) + .12 * np.sin(2 * np.pi * 360 * t) + .15 * bp(noise(d), 3000, 7000)
    e = np.minimum(1, t / a) * np.minimum(1, (d - t) / .4).clip(0)
    return x * e
def step(i):                                       # 脚步：低频闷响 + 鞋底擦一下
    d = .14; n = int(d * SR)
    return lp(noise(d), 500) * env(n, .03) * 1.6 + bp(noise(d), 1500, 4000) * env(n, .012) * .25 + thump(110 + 15 * (i % 2), 60, d) * .5
def creak(d=.9):                                   # 门轴嘎吱：一串小颗粒，音高慢慢变
    n = int(d * SR); t = np.arange(n) / SR; f = 260 + 140 * np.sin(np.pi * t / d) + 30 * np.sin(2 * np.pi * 3 * t)
    ph = np.cumsum(f) / SR; saw = 2 * (ph % 1) - 1
    grain = (np.sin(2 * np.pi * 38 * t) > .2).astype(float)
    return bp(saw * grain, 300, 3000) * np.sin(np.pi * t / d) ** .6
def door_close(): x = thump(80, 40, .6) * 1.2; c = click(.05); x[:len(c)] += c * .8; return x
def whoosh(d=.28, lo=400, hi=2400):                # 咻：几条带通噪声，重心从 lo 滑到 hi
    n = int(d * SR); k = np.arange(n) / n; x = noise(d); y = np.zeros(n)
    fcs = np.geomspace(min(lo, hi), max(lo, hi), 5)
    for fc in fcs:
        band = bp(x, fc * .75, min(fc * 1.35, 20000)); cur = lo * (hi / lo) ** k
        y += band * np.exp(-np.log(cur / fc) ** 2 / .18)
    return y * np.sin(np.pi * k) ** 2
def murmur(d):                                     # 窃窃私语：几个"声音"，每个是带通噪声 + 随机音节包络
    n = int(d * SR); t = np.arange(n) / SR; y = np.zeros(n)
    for v in range(6):
        lo, hi = 250 + v * 90, 1100 + v * 160
        syl = np.zeros(n); tt = rng.uniform(0, .3)
        while tt < d:
            L = rng.uniform(.08, .22); i0, i1 = int(tt * SR), min(n, int((tt + L) * SR)); syl[i0:i1] = np.sin(np.linspace(0, np.pi, i1 - i0)); tt += L + rng.uniform(.03, .25)
        y += bp(noise(d), lo, hi) * syl
    return y * np.minimum(1, t / .8) * np.minimum(1, (d - t) / .8).clip(0)
def heartbeat(): x = np.zeros(int(.6 * SR)); a = thump(70, 40, .3); x[:len(a)] += a; b = thump(65, 38, .3) * .6; i = int(.17 * SR); x[i:i + len(b)] += b; return x
def scratch():                                     # 铅笔沙沙：一小串高频摩擦
    d = rng.uniform(.15, .45); n = int(d * SR); t = np.arange(n) / SR
    am = (np.sin(2 * np.pi * rng.uniform(6, 11) * t) * .5 + .5) ** 2
    return bp(noise(d), 2500, 7000) * am * np.sin(np.pi * t / d)
def blip(f, d=.25):
    n = int(d * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) + .3 * np.sin(2 * np.pi * 2 * f * t)) * env(n, .08, .004)
def pop(f0=900, f1=280):
    d = .09; n = int(d * SR); t = np.arange(n) / SR; f = f1 + (f0 - f1) * np.exp(-t * 60)
    x = np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .03, .001); c = click(.01); x[:len(c)] += c * .3
    return x
def puff(): d = .35; n = int(d * SR); return bp(noise(d), 600, 3000) * np.sin(np.pi * np.arange(n) / n) ** 3 * .7
def chime(f, d=3.0):
    n = int(d * SR); t = np.arange(n) / SR
    return sum(a * np.sin(2 * np.pi * f * r * t) * env(n, tau) for r, a, tau in ((1, 1, 1.2), (2.76, .45, .5), (5.4, .2, .25)))
def shimmer(d=2.0):
    n = int(d * SR); t = np.arange(n) / SR; y = np.zeros(n)
    for k in range(10):
        f = rng.uniform(2000, 5200); t0 = rng.uniform(0, d * .6); i0 = int(t0 * SR); m = n - i0
        y[i0:] += np.sin(2 * np.pi * f * t[:m]) * env(m, .25, .01) * rng.uniform(.3, 1)
    return y
def power_down(d=2.4):
    n = int(d * SR); t = np.arange(n) / SR; f = 80 + 260 * np.exp(-t * 1.6)
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * .6 + lp(noise(d), 800) * .3) * np.minimum(1, t / .2) * np.exp(-t / 1.1)
def riser(d, lo=200, hi=900):
    n = int(d * SR); t = np.arange(n) / SR; f = lo * (hi / lo) ** (t / d)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * (t / d) ** 2 * .5

# ---------- 新音色 ----------
def chirp():                                        # 鳥叫：兩三聲快速上滑的短音
    y = np.zeros(int(.5 * SR)); t0 = 0
    for _ in range(rng.integers(2, 4)):
        d = rng.uniform(.05, .09); n = int(d * SR); tt = np.arange(n) / SR; f0 = rng.uniform(2600, 3600)
        f = f0 + 1600 * tt / d; x = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * tt / d)
        i = int(t0 * SR); y[i:i + n] += x[:len(y) - i]; t0 += d + rng.uniform(.03, .08)
    return y
def cricket(d):                                     # 蟋蟀：高頻、成串的脈衝
    n = int(d * SR); t = np.arange(n) / SR
    pulse = (np.sin(2 * np.pi * 30 * t) > .6) * ((t % 1.1) < .45)
    return np.sin(2 * np.pi * 4300 * t) * pulse * np.minimum(1, t / 1) * np.minimum(1, (d - t) / 1).clip(0)
def key(): d = .04; n = int(d * SR); return bp(noise(d), 1500, 6000) * env(n, .006) + thump(300, 180, d) * .2
def ping(f1=1320, f2=1760):                         # 手機訊息「叮咚」
    a = blip(f1, .25); b = blip(f2, .35); y = np.zeros(int(.5 * SR)); y[:len(a)] += a; i = int(.11 * SR); y[i:i + len(b)] += b; return y
def send(): return whoosh(.25, 800, 3000) * .8
def thunder(d=1.8):
    n = int(d * SR); t = np.arange(n) / SR
    return lp(noise(d), 160) * np.minimum(1, t / .08) * np.exp(-t / .6) * 3 + lp(noise(d), 600) * env(n, .15) * .6
def clap_crowd(d=1.6):
    y = np.zeros(int(d * SR))
    for _ in range(80):
        t0 = rng.uniform(0, d - .05); c = bp(noise(.03), 800, 4000) * env(int(.03 * SR), .006); i = int(t0 * SR); y[i:i + len(c)] += c * rng.uniform(.4, 1)
    return y * np.minimum(1, np.arange(len(y)) / SR / .2) * np.minimum(1, (d - np.arange(len(y)) / SR) / .5)
def sigh(): d = 1.0; n = int(d * SR); t = np.arange(n) / SR; return bp(noise(d), 400, 2200) * np.sin(np.pi * t / d) ** 2 * np.exp(-t / .7)
def slurp(): d = .5; n = int(d * SR); t = np.arange(n) / SR; return bp(noise(d), 500, 2500) * (np.sin(2 * np.pi * 14 * t) * .5 + .5) * np.sin(np.pi * t / d)
def rain_bed(d):
    n = int(d * SR); x = bp(noise(d), 1200, 9000) * .8 + lp(noise(d), 500) * .4
    for _ in range(int(d * 18)):
        i = rng.integers(0, n - 2000); dr = blip(rng.uniform(1800, 3200), .04) * rng.uniform(.2, .6); x[i:i + len(dr)] += dr
    t = np.arange(n) / SR; return x * np.minimum(1, t / 1.2) * np.minimum(1, (d - t) / 1.5).clip(0)
def umbrella_open(): d = .45; n = int(d * SR); t = np.arange(n) / SR; x = lp(noise(d), 1200) * (t / d) ** 2 * 1.2; x[-int(.05 * SR):] *= np.linspace(1, 0, int(.05 * SR)); y = np.zeros(int(.8 * SR)); y[:n] += x; th = thump(130, 70, .3) * .7; y[n - 400:n - 400 + len(th)] += th; return y
def paper(): d = .3; n = int(d * SR); t = np.arange(n) / SR; return bp(noise(d), 1500, 7000) * (np.sin(2 * np.pi * 9 * t) * .5 + .5) * np.sin(np.pi * t / d)
def drop(f):
    y = blip(f, .5) * .8; p = pop(f * 1.6, f) * .2; y[:len(p)] += p; return y

def amb(fn, t0, t1, gain, rate, pan=.6):
    t = t0
    while t < t1: put(fn(), t, gain, rng.uniform(-pan, pan)); t += rng.uniform(rate * .5, rate * 1.5)

# ---------- 1. 晴天街上 ----------
put(lp(noise(12.4), 700) * np.minimum(1, np.arange(int(12.4 * SR)) / SR) * .3, 0, db(-24))      # 遠處車流
for i, ts in enumerate(np.arange(.4, 4.0, .33)): put(step(i), ts, db(-12), -.4)
put(ping(), 4.6, db(-12), .5)
put(thunder(1.6), 8.6, db(-16)); put(pop(600, 250), 8.6, db(-18), .3)
# ---------- 2. 辦公室 ----------
amb(key, 12.4, 28.4, db(-24), .11, .3)
for i, ts in enumerate(np.arange(12.7, 14.2, .33)): put(step(i), ts, db(-14), .5)
put(paper(), 13.4, db(-14), .3)
put(blip(220, .5) + blip(208, .5), 16.8, db(-14)); put(whoosh(.2, 900, 500), 16.9, db(-20)); put(whoosh(.2, 500, 900), 17.2, db(-20))
put(chime(1046, 2), 20.8, db(-14), .5); put(clap_crowd(1.8), 20.9, db(-16), .4)
for i in range(10): put(pop(1200, 500), 20.9 + i * .07, db(-24), .5)
put(sigh(), 24.8, db(-12), -.4)
# ---------- 3. 夜裡的房間 ----------
put(cricket(17.0), 28.4, db(-28), -.3); put(cricket(17.0) * .7, 28.9, db(-30), .4)
put(ping(), 29.4, db(-12), .5)
for i in range(3): put(thunder(1.2), 33.2 + i * .5, db(-17), -.5 + i * .4); put(pop(500, 220), 33.2 + i * .5, db(-18), -.5 + i * .4)
for i in range(7): put(key(), 37.2 + i * .11, db(-16), .5)
put(send(), 38.0, db(-14), .5)
put(ping(1568, 2093), 41.0, db(-13), .5); put(slurp(), 42.6, db(-16), -.1); put(slurp(), 43.3, db(-18), -.1)
put(power_down(3.0), 45.4, db(-18)); put(riser(3.0, 160, 600), 49.6, db(-24))
# ---------- 片名 ----------
put(chime(880, 4), 53.6, db(-14)); put(chime(1318, 3.5), 54.2, db(-20)); put(shimmer(2.6), 53.8, db(-22))
# ---------- 4. 月曆 ----------
t0 = 62.2
while t0 < 65.4: put(click(.02), t0, db(-22), rng.uniform(-.5, .5)); t0 += .14 * (1 - .8 * (t0 - 62.2) / 3.2) + .02
for i, f in enumerate([1568, 1318, 1760, 1175, 1480]): put(drop(f), 66.3 + i * .22, db(-14), -.6 + i * .3)
put(thump(70, 40, .8), 70.3, db(-16))
# ---------- 5. 心理學紙卡 ----------
for i in range(3): put(paper(), 78.6 + i * .35, db(-14), -.2 + i * .2); put(thump(150, 80, .2) * .5, 78.7 + i * .35, db(-18))
for i in range(3): put(whoosh(.25, 600, 2200), 86.6 + i * .5, db(-18)); put(blip(988 * 2 ** (i * 4 / 12), .4), 87.1 + i * .5, db(-14))
# ---------- 6. 三個方法 ----------
t0 = 90.8
while t0 < 93.8: put(scratch(), t0, db(-14), -.1); t0 += rng.uniform(.25, .45)
put(ping(), 94.6, db(-13))
for i in range(4): put(key(), 95.0 + i * .12, db(-16))
put(send(), 95.6, db(-14)); put(chime(1318, 2), 96.3, db(-16)); put(clap_crowd(1.0) * .6, 96.3, db(-22))
put(creak(1.0), 99.2, db(-15)); put(whoosh(1.0, 300, 1500), 99.4, db(-18)); put(shimmer(2), 99.8, db(-22))
# ---------- 7. 結尾街上 ----------
for i, ts in enumerate(np.arange(102.5, 105.6, .33)): put(step(i), ts, db(-12), -.4)
put(rain_bed(14.4), 106.3, db(-14)); put(thunder(2.2), 106.6, db(-18))
for i, ts in enumerate(np.arange(109.7, 111.0, .32)): put(step(i), ts, db(-14), .5)
put(umbrella_open(), 109.7, db(-10), .4)
put(chime(784, 3), 114.6, db(-20))
put(chime(1046, 4), 119.2, db(-16)); put(chime(1318, 4), 119.6, db(-18)); put(shimmer(3), 119.4, db(-20))
put(chime(587, 5), 123.2, db(-16))

# ---------- 一点房间混响 + 限幅 ----------
ir_n = int(.9 * SR); ir = lp(rng.standard_normal(ir_n) * np.exp(-6.9 * np.arange(ir_n) / SR / .9), 5000); ir /= np.abs(ir).sum() / 4
wet = np.stack([fftconvolve(out[:, c], ir)[:N] for c in (0, 1)], 1)
mix = out + .12 * wet
fn = int(.8 * SR); mix[-fn:] *= np.linspace(1, 0, fn)[:, None]
peak = np.abs(mix).max(); mix = np.tanh(mix / peak * 1.3) * .8
dst = Path(sys.argv[1] if len(sys.argv) > 1 else Path(__file__).parent / "audio" / "sfx.wav"); dst.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(dst), "wb") as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype("<i2").tobytes())
print("sfx:", dst)
