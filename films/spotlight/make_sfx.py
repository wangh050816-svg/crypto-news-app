"""《聚光燈效應》的音效轨：全部用代码合成，没有配乐。时间是成片时间（秒），和 film.js 对齐。
（film.js 里 t ≥ 31 的段落是"故事时间 + 3 秒"，这里已经换算好。）
用法：python make_sfx.py [输出，默认 audio/sfx.wav]
"""
import sys, wave
from pathlib import Path
import numpy as np
from scipy.signal import butter, lfilter, fftconvolve

SR = 48000
DUR = 95.0
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

# ---------- 底：教室环境音（标题和片尾时关掉） ----------
def room_level(t):
    on = np.clip(t / .6, 0, 1)
    on *= 1 - np.clip((t - 19.6) / 3.0, 0, 1) * (t < 31)
    on = np.where((t >= 30.2) & (t < 31.4), np.clip((t - 30.2) / 1.2, 0, 1), on)
    on *= 1 - np.clip((t - 88.8) / 1.0, 0, 1)
    on *= np.where((t > 8.6) & (t < 19.6), .55, 1.0)            # 聚光灯下：环境压低
    on *= np.where((t > 56.2) & (t < 85.6), .6, 1.0)
    return on
tt = np.arange(N) / SR
base = lp(rng.standard_normal(N), 900) * .05 + bp(rng.standard_normal(N), 150, 400) * .04
lvl = room_level(tt)
out[:, 0] += base * lvl * db(-6); out[:, 1] += np.roll(base, 2400) * lvl * db(-6)

# 铅笔沙沙：学生低头写字时；被聚光灯/想像打断时停
for _ in range(220):
    t0 = rng.uniform(0, 89)
    if (12.4 < t0 < 18.2) or (19.4 < t0 < 31.2): continue
    put(scratch(), t0, gain=db(-27) * float(room_level(np.array([t0]))[0]), pan=rng.uniform(-.7, .7))

# ---------- 开场 ----------
put(creak(1.0), 0.3, db(-14), -.6)                               # 门口
for i, ts in enumerate(np.arange(4.65, 7.4, .32)): put(step(i), ts, db(-11), -.5 + .15 * i / 8)
put(door_close(), 7.75, db(-12), -.7)
put(switch(), 8.6, db(-4)); put(hum(10.6, .3), 8.7, db(-26))
put(whoosh(.5, 300, 1200), 8.55, db(-16))
order = [6, 0, 7, 1, 8, 2, 9, 3, 10, 4, 11, 5]
for k in range(12): put(whoosh(.22, 600, 2600), 12.6 + k * .12, db(-17), rng.uniform(-.2, .8))
put(murmur(4.6), 12.9, db(-17))
t0, gap = 13.2, .82
while t0 < 17.4: put(heartbeat(), t0, db(-6)); t0 += gap; gap = max(.5, gap * .93)
put(riser(1.4, 300, 1400), 15.8, db(-20))
for k in range(12): put(whoosh(.2, 2000, 700), 17.4 + k * .04, db(-22), rng.uniform(-.2, .8))   # 头转回去
put(hp(noise(.4), 4000) * env(int(.4 * SR), .08) * .4, 16.6, db(-20))

# ---------- 片名：暗下去 → 光里浮出片名 ----------
put(power_down(2.6), 19.7, db(-12))
put(hum(4.0, .2) * np.linspace(1, 0, int(4.0 * SR)), 19.6, db(-26))
put(riser(3.0, 180, 700), 21.0, db(-22))
put(chime(880, 4), 24.0, db(-14)); put(chime(1318, 3.5), 24.6, db(-20)); put(shimmer(2.6), 24.2, db(-22))
put(whoosh(1.0, 1500, 300), 30.2, db(-20))

# ---------- 实验（故事时间 + 3） ----------
put(creak(.8), 35.0, db(-15), -.7)
for i, ts in enumerate(np.arange(39.85, 41.0, .32)): put(step(i), ts, db(-12), -.6)
for i, ts in enumerate(np.arange(42.05, 43.2, .32)): put(step(i), ts, db(-12), -.5)
put(door_close(), 43.5, db(-13), -.7)
for i in range(3): put(whoosh(.2, 700, 2200), 40.4 + i * .25, db(-17), .3)
put(pop(700, 500), 43.7, db(-16))                                    # "你猜几个？"
for i in range(6): put(blip(523 * 2 ** (i * 2 / 12)), 47.8 + i * .24, db(-14), -.3)   # 他猜：一格一格往上
put(chime(1046, 2), 49.3, db(-20), -.3)
for i in range(3): put(blip(392 * 2 ** (-i * 3 / 12)), 52.6 + i * .33, db(-12), .4)     # 实际：往下沉
put(thump(70, 40, .7), 53.7, db(-10)); put(hp(noise(.3), 3000) * env(int(.3 * SR), .05), 53.6, db(-24))
put(switch(), 56.2, db(-8)); put(hum(29.0, .5), 56.3, db(-30))
for i in range(12): put(pop(1000 + 40 * (i % 5), 320), 60.0 + i * .18, db(-15), -.2 + .1 * (i % 6))   # 烦恼泡泡冒出来
for j in range(12): put(click(.03) * 1.3 + 0, 64.4 + j * .16, db(-12), -.2 + .1 * (j % 6)); put(blip(660 + 30 * (j % 4), .3), 64.4 + j * .16, db(-26), .1 * (j % 6))
put(chime(659, 4), 66.4, db(-18)); put(shimmer(3), 66.5, db(-22))
# 收尾几句
for i in range(12): put(puff(), 69.8 + i * .12, db(-18), -.2 + .1 * (i % 6))                 # 别人的泡泡散了
put(pop(1100, 400), 69.6, db(-12), -.6)                                                      # 他自己的泡泡冒出来
put(shimmer(2.2), 77.4, db(-20))                                                             # 他笑了，灯变宽
put(puff(), 81.6, db(-14), -.6); put(shimmer(2.5), 81.2, db(-18)); put(chime(1175, 3), 81.4, db(-20))
put(switch(), 85.4, db(-6)); put(power_down(1.4) * .6, 85.45, db(-16))                       # 关灯 → 教室亮起来
put(riser(1.2, 300, 1200), 85.6, db(-22)); put(chime(784, 4), 86.4, db(-16)); put(chime(988, 4), 86.75, db(-19)); put(chime(1175, 4), 87.1, db(-21))
put(chime(587, 5), 89.6, db(-16))                                                            # 片尾

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
