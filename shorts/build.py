# 用法：python3 shorts/build.py shorts/projects/<名稱>.py
# 把一支橫式教學錄影剪成 1080×1920 直式短片：大字跳出字幕、關鍵字變色、推鏡、衝擊音效、背景音樂自動避讓人聲。
# 輸出：shorts/out/<名稱>/final.mp4、cover.png、caption.txt
import sys, os, math, subprocess, wave, random, urllib.request
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H, FPS, SR = 1080, 1920, 30, 44100
proj = os.path.abspath(sys.argv[1])
name = os.path.splitext(os.path.basename(proj))[0]
OUT = os.path.join(os.path.dirname(__file__), 'out', name)
os.makedirs(OUT, exist_ok=True)
P = {}
exec(open(proj, encoding='utf-8').read(), P)
SRC = os.path.expanduser(P['SRC'])
# 原片裡的廣告／彈窗：用彈出前的乾淨畫面蓋掉那一塊（PATCHES：t=(開始, 結束)、box=(x, y, w, h)、clean=取乾淨畫面的秒數）
if P.get('PATCHES'):
    clean = os.path.join(OUT, 'clean.mp4')
    args, fl, last_ = ['ffmpeg', '-v', 'error', '-y', '-i', SRC], [], '0:v'
    for i, pt in enumerate(P['PATCHES']):
        x, y, w, h = pt['box']
        args += ['-ss', str(pt['clean']), '-i', SRC]
        fl.append(f"[{i + 1}:v]trim=end_frame=1,crop={w}:{h}:{x}:{y},setpts=0[p{i}];"
                  f"[{last_}][p{i}]overlay={x}:{y}:eof_action=repeat:enable='between(t,{pt['t'][0]},{pt['t'][1]})'[v{i}]")
        last_ = f'v{i}'
    args += ['-filter_complex', ';'.join(fl), '-map', f'[{last_}]', '-map', '0:a', '-c:v', 'libx264', '-crf', '14', '-preset', 'fast', '-c:a', 'copy', clean]
    subprocess.run(args, check=True)
    SRC = clean
SPEED = P.get('SPEED', 1.0)
LAND = P.get('LAYOUT') == 'landscape'      # landscape：1920×1080 給 YouTube；預設直式 1080×1920
if LAND: W, H = 1920, 1080

# ---------- 字型（思源黑體 TC，第一次執行時下載到 out/_fonts） ----------
FD = os.path.join(os.path.dirname(__file__), 'out', '_fonts')
os.makedirs(FD, exist_ok=True)
def font_file(w):
    f = os.path.join(FD, f'tc-{w}.woff2')
    if not os.path.exists(f):
        urllib.request.urlretrieve(f'https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-tc@5.0.0/files/noto-sans-tc-chinese-traditional-{w}-normal.woff2', f)
    return f
_fc = {}
FALLBACK = '/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc'
_nd = {}
def has(f, ch):
    if f not in _nd: _nd[f] = bytes(f.getmask('\uffff'))
    return bytes(f.getmask(ch)) != _nd[f]
def fallback(size): return font(size, 'fb')
def font(size, w=900):
    k = (size, w)
    if k not in _fc: _fc[k] = ImageFont.truetype(FALLBACK if w == 'fb' else font_file(w), size)
    return _fc[k]

# ---------- 配色 ----------
C = dict(bg1=(10, 13, 20), bg2=(20, 26, 42), accent=(255, 196, 0), hot=(255, 84, 84), text=(255, 255, 255), dim=(150, 160, 180), panel=(44, 56, 84))
C.update(P.get('COLORS', {}))

# ---------- 切點對齊到最安靜的地方，避免切到字 ----------
def read_wav(path):
    w = wave.open(path); a = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
    return a.reshape(-1, w.getnchannels()).mean(1)
wav = os.path.join(OUT, 'src.wav')
# ---------- 去滑鼠／鍵盤點擊聲 ----------
def declick(a, SR, ratio=7.0, maxdur=.007, gain_db=-30):
    # 滑鼠點擊：4kHz 以上突然暴增（>7 倍背景）而且 7ms 內就結束；講話的子音不到 3 倍、持續 15ms 以上
    X = np.fft.rfft(a); f = np.fft.rfftfreq(len(a), 1 / SR)
    det = np.fft.irfft(X * (f > 4000), len(a))
    hi = np.fft.irfft(X * (f > 1500), len(a)); lo = a - hi
    h = int(SR * .0005); n = len(a) // h
    env = np.sqrt((det[:n * h] ** 2).reshape(n, h).mean(1))
    base = np.median(np.lib.stride_tricks.sliding_window_view(np.pad(env, 50, mode='edge'), 101)[:n], 1)
    g = np.ones(len(a)); k = 10 ** (gain_db / 20); ramp = int(SR * .001)
    clicks, i = [], 0
    while i < n:
        if env[i] > ratio * base[i] and env[i] > .0015:
            j = i + int(np.argmax(env[i:i + 10]))
            dur = int((env[max(j - 4, 0):j + 30] > env[j] / 3).sum()) * h / SR
            if dur <= maxdur:
                s = max(j * h - int(.002 * SR), 0); e = min(j * h + int(.010 * SR), len(a))
                seg = np.full(e - s, k); seg[:ramp] = np.linspace(1, k, ramp); seg[-ramp:] = np.linspace(k, 1, ramp)
                g[s:e] = np.minimum(g[s:e], seg); clicks.append(round(j * h / SR, 3))
            i = j + 20
        i += 1
    return lo + hi * g, clicks

VSRC = SRC
if P.get('DECLICK'):
    raw = os.path.join(OUT, 'raw.wav')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-ac', '1', '-ar', str(SR), raw], check=True)
    x = read_wav(raw); n_cl = 0
    for _ in range(3):
        x, cl = declick(x, SR); n_cl += len(cl)
    print(f'去掉 {n_cl} 個點擊聲')
    with wave.open(raw, 'w') as w_:
        w_.setnchannels(1); w_.setsampwidth(2); w_.setframerate(SR); w_.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())
    VSRC = raw
af = 'anull'
if P.get('DENOISE'):   # 人聲降噪：RNNoise 語音模型 + FFT 降噪，去掉底噪和嘶嘶聲
    md = os.path.join(os.path.dirname(__file__), 'out', '_models'); os.makedirs(md, exist_ok=True)
    m = os.path.join(md, 'sh.rnnn')
    if not os.path.exists(m):
        urllib.request.urlretrieve('https://cdn.jsdelivr.net/gh/GregorR/rnnoise-models@master/somnolent-hogwash-2018-09-01/sh.rnnn', m)
    af = f'highpass=f=80,arnndn=m={m}:mix=0.9,afftdn=nf=-50:tn=1'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', VSRC, '-af', af, '-ac', '1', '-ar', str(SR), wav], check=True)
VOICE = read_wav(wav)
if P.get('DECLICK'):   # 降噪後背景變乾淨，原本被底噪蓋住的小點擊會浮出來，再清一次
    n_cl = 0
    for _ in range(2):
        VOICE, cl = declick(VOICE, SR); n_cl += len(cl)
    print(f'降噪後再去掉 {n_cl} 個點擊聲')
hop = SR // 100
rms = np.sqrt(np.convolve(VOICE ** 2, np.ones(hop) / hop, 'same'))[::hop]
def snap(t, win=.12):
    i0, i1 = int((t - win) * 100), int((t + win) * 100)
    return (i0 + int(np.argmin(rms[max(i0, 0):i1]))) / 100

THR = np.percentile(rms, 30) * 1.5   # 低於這個音量算靜音
clips = []
t_out = 0.0
for c in P['CLIPS']:
    s, e = snap(c['s']), snap(c['e'])
    if P.get('TIGHT'):   # 把段落頭尾的靜音修掉，句子之間不留停頓
        v = np.where(rms[int(s * 100):int(e * 100)] > THR)[0]
        if len(v): s, e = s + max(v[0] / 100 - .06, 0), min(s + v[-1] / 100 + .12, e)
    nv = round((e - s) * FPS)
    n = nv + round(P.get('GAP', 0) * FPS)
    clips.append(dict(c, s=s, e=e, n=n, nv=nv, t0=t_out))
    t_out += n / FPS
END = P.get('END_CARD', {}).get('dur', 0)
TOTAL = t_out + END
print(f'{len(clips)} 段，正片 {t_out:.1f}s + 片尾 {END}s，加速 {SPEED}x 後約 {TOTAL / SPEED:.1f}s')

# ---------- 字幕：[關鍵字] 會變色放大 ----------
def runs(text):
    out, kw = [], False
    for part in text.replace(']', '[').split('['):
        if part: out.append((part, kw))
        kw = not kw
    return out
def text_img(text, size, color, kwcolor, stroke=10, maxw=1000):
    while True:
        f, fk = font(size), font(int(size * 1.12))
        rs = []
        for t, k in runs(text):
            ff = fk if k else f
            for chh in t:
                use = ff if has(ff, chh) else fallback(ff.size)
                if rs and rs[-1][2] is use: rs[-1][0] += chh
                else: rs.append([chh, k, use])
        ws = [u.getlength(t) for t, k, u in rs]
        if sum(ws) <= maxw or size < 40: break
        size -= 4
    tw, th = int(sum(ws)) + stroke * 2 + 20, int(size * 1.6) + stroke * 2
    im = Image.new('RGBA', (tw, th)); d = ImageDraw.Draw(im)
    x, base = stroke + 10, th // 2 + int(size * .38)
    for (t, k, u), w in zip(rs, ws):
        d.text((x, base), t, font=u, fill=kwcolor if k else color, stroke_width=stroke, stroke_fill=(0, 0, 0), anchor='ls')
        x += w
    sh = im.split()[3].filter(ImageFilter.GaussianBlur(10)).point(lambda v: v * .6)
    out = Image.new('RGBA', im.size); out.paste((0, 0, 0, 255), (0, 6), sh); out.alpha_composite(im)
    return out

PLAIN = P.get('CAPTION_STYLE') == 'plain'   # plain：普通白字，不變色、不跳動
caps = []  # (開始, 結束, 圖)
for c in clips:
    cs = c.get('caps', [])
    for i, (t, txt) in enumerate(cs):
        a = c['t0'] + max(t - c['s'], 0)
        b = c['t0'] + ((cs[i + 1][0] - c['s']) if i + 1 < len(cs) else c['n'] / FPS)
        if PLAIN: caps.append((a, b, text_img(txt.replace('[', '').replace(']', ''), 62 if LAND else 80, C['text'], C['text'], stroke=5 if LAND else 6, maxw=W - 160)))
        else: caps.append((a, b, text_img(txt, 100, C['text'], C['accent'])))

# ---------- 背景、外框 ----------
def background():
    y = np.linspace(0, 1, H)[:, None, None]
    g = np.array(C['bg1']) * (1 - y) + np.array(C['bg2']) * y
    im = Image.fromarray(np.repeat(g, W, 1).astype(np.uint8))
    glow = Image.new('L', (W, H)); ImageDraw.Draw(glow).ellipse((-200, 380, W + 200, 1400), fill=70)
    im = Image.composite(Image.new('RGB', (W, H), C['panel']), im, glow.filter(ImageFilter.GaussianBlur(160)))
    return im.convert('RGBA')
BG = background()
CY, CH = 540, 676          # 圖表放的位置和高度
CX0, CW = 0, W
cx, cy, cw, ch = P['CROP']   # 原片裡圖表的區域；zoom 的中心點是以 CROP 為準的比例
if LAND:
    lx, ly, lw, lh = P['CROP_LANDSCAPE']
    assert abs(lw / lh - W / H) < .02, 'CROP_LANDSCAPE 長寬比要接近 16:9'
    for c in clips:
        z0, z1, fx, fy = c.get('zoom', (1, 1.05, .5, .5))
        c['zoom'] = (z0, z1, (cx + fx * cw - lx) / lw, (cy + fy * ch - ly) / lh)
    cx, cy, cw, ch = lx, ly, lw, lh
else:
    assert abs(cw / ch - (CW - 36) / CH) < .05, 'CROP 長寬比要接近 1044:676'
# 橫式：下方加一層漸層，白字幕比較清楚
SHADE = Image.new('RGBA', (W, H))
if LAND:
    g = np.zeros((H, W, 4), np.uint8); a_ = np.clip((np.arange(H) - (H - 300)) / 300, 0, 1) * 170
    g[..., 3] = a_[:, None].astype(np.uint8); SHADE = Image.fromarray(g, 'RGBA')

def ease(x): x = min(max(x, 0), 1); return 1 - (1 - x) ** 3

# ---------- 標題：每段的章節 ----------
title_cache = {}
def title_imgs(ch_):
    if ch_ not in title_cache:
        tag, ttl = P['CHAPTERS'][ch_]
        ph = 54 if LAND else 70
        tg = text_img(tag, 30 if LAND else 40, (20, 20, 20), (20, 20, 20), stroke=0)
        pill = Image.new('RGBA', (tg.width + 30, ph)); ImageDraw.Draw(pill).rounded_rectangle((0, 0, pill.width - 1, ph - 1), ph // 2, fill=C['accent'] + (255,))
        pill.alpha_composite(tg, (15, (ph - tg.height) // 2))
        if LAND: size = 88 if ch_ == 'hook' else 50
        else: size = 104 if ch_ == 'hook' else 84
        title_cache[ch_] = (pill, text_img(ttl, size, C['text'], C['hot'], stroke=7))
    return title_cache[ch_]

# ---------- 畫每一格 ----------
booms = [c['t0'] + (b - c['s']) for c in clips for b in c.get('boom', [])]
flashes = [c['t0'] for i, c in enumerate(clips) if i == 0 or c['chapter'] != clips[i - 1]['chapter']]
rnd = random.Random(3)
SHAKE, FLASH = P.get('SHAKE', 6), P.get('FLASH', 70)   # 晃動幅度（像素）、白閃強度（0–255）

FOOT = text_img(P['FOOTER'], 26 if LAND else 30, (200, 205, 215) if LAND else C['dim'], C['dim'], stroke=3 if LAND else 0) if P.get('FOOTER') else None

def compose_land(chart, t, ch_, ch_start):
    dx = dy = 0
    for b in booms:
        if 0 <= t - b < .35:
            k = (1 - (t - b) / .35) * SHAKE; dx, dy = rnd.uniform(-k, k), rnd.uniform(-k, k)
    im = Image.new('RGBA', (W, H))
    im.paste(chart.resize((W + 32, H + 18), Image.BILINEAR), (int(-16 + dx), int(-9 + dy)))
    im.alpha_composite(SHADE)
    # 左上角：章節標籤＋標題（開頭鉤子放大在畫面上方中間）
    pill, ttl = title_imgs(ch_)
    a = ease((t - ch_start) / .3)
    if ch_ == 'hook': spots = ((pill, (W - pill.width) // 2, 70), (ttl, (W - ttl.width) // 2, 140))
    else: spots = ((pill, 50, 44), (ttl, 50 + pill.width + 8, 44 + (pill.height - ttl.height) // 2))
    for img, x, y in spots:
        lay = img.copy(); lay.putalpha(lay.split()[3].point(lambda v: int(v * a)))
        im.alpha_composite(lay, (int(x - (1 - a) * 30), y))
    for s, e, img in caps:
        if s <= t < e: im.alpha_composite(img, ((W - img.width) // 2, H - 95 - img.height // 2))
    if FOOT: im.alpha_composite(FOOT, (W - FOOT.width - 30, H - FOOT.height - 12))
    for fl in flashes + booms:
        if 0 <= t - fl < .18:
            im.alpha_composite(Image.new('RGBA', (W, H), (255, 255, 255, int(FLASH * (1 - (t - fl) / .18)))))
    return im.convert('RGB')

def compose(chart, t, ch_, ch_start):
    if LAND: return compose_land(chart, t, ch_, ch_start)
    im = BG.copy()
    # 衝擊時圖表抖一下
    dx = dy = 0
    for b in booms:
        if 0 <= t - b < .35:
            k = (1 - (t - b) / .35) * SHAKE; dx, dy = rnd.uniform(-k, k), rnd.uniform(-k, k)
    d = ImageDraw.Draw(im)
    d.rounded_rectangle((CX0 + 14, CY - 6, CX0 + CW - 14, CY + CH + 6), 22, outline=C['panel'] + (255,), width=4)
    mask = Image.new('L', (CW - 36, CH)); ImageDraw.Draw(mask).rounded_rectangle((0, 0, CW - 37, CH - 1), 18, fill=255)
    im.paste(chart.resize((CW - 36, CH), Image.BILINEAR), (int(CX0 + 18 + dx), int(CY + dy)), mask)
    # 標題（換章節時從下往上滑進來）
    pill, ttl = title_imgs(ch_)
    a = ease((t - ch_start) / .3)
    for img, y in ((pill, 190), (ttl, 280)):
        lay = img.copy(); lay.putalpha(lay.split()[3].point(lambda v: int(v * a)))
        im.alpha_composite(lay, ((W - img.width) // 2, int(y + (1 - a) * 40)))
    # 字幕：跳出來（放大再縮回）
    for s, e, img in caps:
        if s <= t < e:
            k = 1 if PLAIN else 1 + .28 * (1 - ease((t - s) / .14))
            ci = img.resize((int(img.width * k), int(img.height * k)), Image.BILINEAR) if k > 1.001 else img
            im.alpha_composite(ci, ((W - ci.width) // 2, 1380 - ci.height // 2))
    # 進度條
    d = ImageDraw.Draw(im)
    d.rectangle((40, CY + CH + 30, W - 40, CY + CH + 38), fill=(255, 255, 255, 40))
    d.rectangle((40, CY + CH + 30, 40 + (W - 80) * t / TOTAL, CY + CH + 38), fill=C['accent'] + (255,))
    if FOOT: im.alpha_composite(FOOT, ((W - FOOT.width) // 2, 1640 - FOOT.height // 2))
    # 白閃
    for fl in flashes + booms:
        if 0 <= t - fl < .18:
            im.alpha_composite(Image.new('RGBA', (W, H), (255, 255, 255, int(FLASH * (1 - (t - fl) / .18)))))
    return im.convert('RGB')

LUT = np.clip((np.arange(256) / 255) ** .85 * 255 * 1.12, 0, 255).astype(np.uint8)
def zoom_crop(fr, z, fx, fy):
    h, w = fr.shape[:2]
    zw, zh = w / z, h / z
    x0 = min(max(fx * w - zw / 2, 0), w - zw); y0 = min(max(fy * h - zh / 2, 0), h - zh)
    return Image.fromarray(LUT[fr]).crop((int(x0), int(y0), int(x0 + zw), int(y0 + zh)))

enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                        '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', os.path.join(OUT, 'video.mp4')], stdin=subprocess.PIPE)
ch_start, prev = 0, None
last = None
for c in clips:
    if c['chapter'] != prev: ch_start, prev = c['t0'], c['chapter']
    dec = subprocess.Popen(['ffmpeg', '-v', 'error', '-ss', f"{c['s']:.3f}", '-i', SRC, '-t', f"{c['n'] / FPS:.3f}", '-r', str(FPS), '-frames:v', str(c['n']),
                            '-vf', f'crop={cw}:{ch}:{cx}:{cy}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
    z0, z1, fx, fy = c.get('zoom', (1, 1.05, .5, .5))
    fr = None
    for i in range(c['n']):
        buf = dec.stdout.read(cw * ch * 3)
        if len(buf) == cw * ch * 3: fr = np.frombuffer(buf, np.uint8).reshape(ch, cw, 3)
        p = i / max(c['n'] - 1, 1)
        z = z0 + (z1 - z0) * (ease(p * 3) if c.get('punch') else p)
        t = c['t0'] + i / FPS
        last = zoom_crop(fr, z, fx, fy)
        enc.stdin.write(compose(last, t, c['chapter'], ch_start).tobytes())
    dec.stdout.close(); dec.wait()
    print(f"  {c['t0']:5.1f}s  {c.get('caps', [[0, '']])[0][1]}")

# ---------- 片尾卡 ----------
if END:
    ec = P['END_CARD']
    base = compose(last, t_out, clips[-1]['chapter'], -9).filter(ImageFilter.GaussianBlur(18))
    lines = [text_img(l, sz, C['text'], tuple(ec.get('kwcolor', C['accent'])), stroke=8) for l, sz in ec['lines']]
    # 每行間隔 step 秒慢慢浮現；最後 out 秒整個畫面淡到全黑
    step, fin, fout = ec.get('step', .25), ec.get('fade', .3), ec.get('out', 0)
    gap_ = 40
    y0 = (H - sum(l.height for l in lines) - gap_ * (len(lines) - 1)) // 2 if LAND else 560
    black = Image.new('RGB', (W, H), (0, 0, 0))
    for i in range(round(END * FPS)):
        t = i / FPS
        dark = .4 + .45 * ease(t / max(END - fout, .1)) if fout else .55
        im = Image.blend(base, black, dark).convert('RGBA'); y = y0
        for j, l in enumerate(lines):
            a = min(max((t - .4 - j * step) / fin, 0), 1) if fout else ease((t - j * step) / fin)
            lay = l.copy(); lay.putalpha(lay.split()[3].point(lambda v: int(v * a)))
            im.alpha_composite(lay, ((W - l.width) // 2, int(y + (1 - a) * (12 if fout else 50)))); y += l.height + gap_
        im = im.convert('RGB')
        if fout: im = Image.blend(im, black, min(max((t - (END - fout)) / (fout - .6), 0), 1))
        enc.stdin.write(im.tobytes())
enc.stdin.close(); enc.wait()

# ---------- 聲音：人聲 + 背景音樂（人聲出現時自動壓低）+ 音效 ----------
N = int(TOTAL * SR)
voice = np.zeros(N, np.float32)
for c in clips:
    seg = VOICE[int(c['s'] * SR): int(c['s'] * SR) + int(c['nv'] / FPS * SR)].copy()
    f = min(len(seg) // 2, int(.012 * SR)); seg[:f] *= np.linspace(0, 1, f); seg[-f:] *= np.linspace(1, 0, f)
    a = int(c['t0'] * SR); voice[a:a + len(seg)] = seg
voice *= .2 / (np.sqrt(np.mean(voice[np.abs(voice) > .01] ** 2)) + 1e-9)

t = np.arange(N) / SR
bpm = P.get('BPM', 88); beat = 60 / bpm
def note(m): return 440 * 2 ** ((m - 69) / 12)
prog = P.get('CHORDS', [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]])  # Am F C G
music = np.zeros(N, np.float32)
bar = beat * 4
ci = (t // (bar * 2)).astype(int) % len(prog)
for k in range(3):
    fr = np.array([note(ch_[k]) for ch_ in prog])[ci]
    ph = np.cumsum(2 * np.pi * fr / SR)
    music += (.5 * np.sin(ph) + .2 * np.sin(2 * ph) + .1 * np.sin(3 * ph)) * .06
bassf = np.array([note(ch_[0] - 24) for ch_ in prog])[ci]
pulse = np.exp(-((t % beat) / beat) * 4) * np.minimum(1, (t % beat) / .015)   # 15ms 起音，不然每拍都會爆一下
music += np.sin(np.cumsum(2 * np.pi * bassf / SR)) * .22 * pulse
# 鼓：越後面越緊湊
intense = np.interp(t, [0, t_out * .5, t_out], [.4, .7, 1])
body = np.clip((t_out + .8 - t) / .8, 0, 1)   # 片尾只留和弦，鼓停掉
kt = t % beat; music += body * np.sin(2 * np.pi * (50 + 90 * np.exp(-kt * 30)) * kt) * np.exp(-kt * 9) * .45 * intense
ht = (t + beat / 2) % beat; noise = np.random.default_rng(1).standard_normal(N).astype(np.float32)
hp = noise - np.concatenate([[0], noise[:-1]])
music += body * hp * np.exp(-ht * 60) * .05 * (intense > .55) * P.get('HATS', 1)
tail = np.clip((TOTAL - .6 - t) / max(TOTAL - .6 - t_out, .1), 0, 1) if END else 1
music *= np.minimum(1, t / 1.5) * np.minimum(1, (TOTAL - t) / 1.2) * np.where(t > t_out, tail ** 1.5, 1)
# 人聲閃避
env = np.convolve(np.abs(voice), np.ones(SR // 20) / (SR // 20), 'same')
duck = np.convolve((env > .01).astype(np.float32), np.ones(SR // 5) / (SR // 5), 'same')
music *= 1 - .72 * np.clip(duck, 0, 1)

sfx = np.zeros(N, np.float32)
def add(arr, at):
    a = int(at * SR); b = min(N, a + len(arr)); sfx[a:b] += arr[:b - a]
bt = np.arange(int(1.4 * SR)) / SR
boom = np.sin(2 * np.pi * np.cumsum(30 + 60 * np.exp(-bt * 6)) / SR) * np.exp(-bt * 3) * .9
boom[:int(.08 * SR)] += noise[:int(.08 * SR)] * np.exp(-bt[:int(.08 * SR)] * 40) * .5
wt = np.arange(int(.5 * SR)) / SR
lp, y_, out = np.exp(-2 * np.pi * (300 + 6000 * (wt / .5) ** 2) / SR), 0.0, np.zeros(len(wt), np.float32)
for i in range(len(wt)): y_ = lp[i] * y_ + (1 - lp[i]) * noise[i]; out[i] = y_
whoosh = out * np.sin(np.pi * wt / .5) ** 2 * 1.2
for b in booms: add(boom * P.get('BOOM_VOL', .5), b - .02)
if P.get('WHOOSH_VOL', 0): 
    for fl in flashes[1:]: add(whoosh * P['WHOOSH_VOL'], fl - .35)
if END and P['END_CARD'].get('boom', True): add(boom * P.get('BOOM_VOL', .5), t_out)

mix = voice + music * P.get('MUSIC_VOL', .5) + sfx * .5
mix = np.tanh(mix * 1.1) * .9
st = np.stack([mix, mix], 1)
with wave.open(os.path.join(OUT, 'audio.wav'), 'w') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype(np.int16).tobytes())

subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', os.path.join(OUT, 'video.mp4'), '-i', os.path.join(OUT, 'audio.wav'),
                '-filter_complex', f'[0:v]setpts=PTS/{SPEED}[v];[1:a]atempo={SPEED},loudnorm=I=-14:TP=-1.5[a]',
                '-map', '[v]', '-map', '[a]', '-r', str(FPS), '-c:v', 'libx264', '-crf', '20', '-preset', 'medium', '-pix_fmt', 'yuv420p',
                '-c:a', 'aac', '-b:a', '192k', '-movflags', '+faststart', os.path.join(OUT, 'final.mp4')], check=True)

# 封面：第一個有 hook 的畫面
cv = P.get('COVER_AT', .6)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(cv), '-i', os.path.join(OUT, 'final.mp4'), '-frames:v', '1', os.path.join(OUT, 'cover.png')], check=True)
open(os.path.join(OUT, 'caption.txt'), 'w').write(P.get('CAPTION', '').strip() + '\n')
for f in ('video.mp4', 'audio.wav', 'src.wav', 'clean.mp4', 'raw.wav'):
    if os.path.exists(os.path.join(OUT, f)): os.remove(os.path.join(OUT, f))
print('完成 →', os.path.join(OUT, 'final.mp4'))
