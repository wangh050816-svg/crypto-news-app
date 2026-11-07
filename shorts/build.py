# 用法：python3 shorts/build.py shorts/projects/<名稱>.py
# 把一支橫式教學錄影剪成 1080×1920 直式短片：大字跳出字幕、關鍵字變色、推鏡、衝擊音效、背景音樂自動避讓人聲。
# 輸出：shorts/out/<名稱>/final.mp4、cover.png、caption.txt
import sys, os, re, math, subprocess, wave, random, urllib.request
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
def declick(a, SR, ratio=4.0, floor=.0008, maxdur=.006, cut=2000, gain_db=-35, pre=.004, post=.007, skip_voiced=False):
    # 滑鼠點擊：6–12kHz 突然暴增（>4 倍、±30ms 中位數），6ms 內結束。
    # 間隔 <15ms 連續出現的是人聲的聲帶脈衝（例如 7.5ms＝133Hz），不是滑鼠，跳過。
    # 只壓 2kHz 以上，2kHz 以下的人聲完全不動。
    X = np.fft.rfft(a); f = np.fft.rfftfreq(len(a), 1 / SR)
    b = np.fft.irfft(X * ((f > 6000) & (f < 13000)), len(a))
    hi = np.fft.irfft(X * (f > cut), len(a)); lo = a - hi
    h = int(SR * .0005); n = len(a) // h
    env = np.sqrt((b[:n * h] ** 2).reshape(n, h).mean(1))
    base = np.median(np.lib.stride_tricks.sliding_window_view(np.pad(env, 60, mode='edge'), 121)[:n], 1)
    pk = []; j = 10
    while j < n - 40:
        v = env[j]
        if v > ratio * base[j] and v > floor and v == env[j - 6:j + 7].max() and (env[j - 10:j + 30] > v / 3).sum() * h / SR <= maxdur:
            pk.append(j * h); j += 12; continue
        j += 1
    pk = np.array(pk)
    keep = []
    if skip_voiced:   # 講話很大聲（低頻遠大於那一下高頻）時跳過：多半是聲帶脈衝，就算是點擊也被人聲蓋住
        lo_ = np.fft.irfft(X * (f < 1500), len(a))
    for i, p in enumerate(pk):
        near = np.abs(pk - p)
        if ((near > 0) & (near < .015 * SR)).sum() >= 2: continue   # 規律的脈衝串＝人聲
        if skip_voiced:
            w_ = slice(max(p - int(.015 * SR), 0), p + int(.015 * SR))
            if np.sqrt((lo_[w_] ** 2).mean()) > 4 * np.abs(b[w_]).max(): continue
        keep.append(p)
    g = np.ones(len(a)); k = 10 ** (gain_db / 20); r = int(SR * .001)
    for p in keep:
        s = max(p - int(pre * SR), 0); e = min(p + int(post * SR), len(a))
        seg = np.full(e - s, k); seg[:r] = np.linspace(1, k, r); seg[-r:] = np.linspace(k, 1, r)
        g[s:e] = np.minimum(g[s:e], seg)
    return lo + hi * g, [round(p / SR, 3) for p in keep]

VSRC = SRC
if P.get('DECLICK'):
    raw = os.path.join(OUT, 'raw.wav')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', SRC, '-ac', '1', '-ar', str(SR), raw], check=True)
    x = read_wav(raw); n_cl = 0
    for _ in range(3):
        x, cl = declick(x, SR, skip_voiced=P.get('SMOOTH_CUTS', False)); n_cl += len(cl)
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
        VOICE, cl = declick(VOICE, SR, skip_voiced=P.get('SMOOTH_CUTS', False)); n_cl += len(cl)
    print(f'降噪後再去掉 {n_cl} 個點擊聲')
hop = SR // 100
rms = np.sqrt(np.convolve(VOICE ** 2, np.ones(hop) / hop, 'same'))[::hop]
def snap(t, win=.12):
    i0, i1 = int((t - win) * 100), int((t + win) * 100)
    return (i0 + int(np.argmin(rms[max(i0, 0):i1]))) / 100
SMOOTH = P.get('SMOOTH_CUTS')   # 切點找真正的字間空隙、頭尾多留一點、接縫淡入淡出拉長，講話才不會卡卡的
rms30 = np.convolve(rms, np.ones(3) / 3, 'same')
def snap_in(t, a, b):   # 在 [t-a, t+b] 找最安靜的點
    i0, i1 = max(int((t - a) * 100), 0), int((t + b) * 100)
    return (i0 + int(np.argmin(rms30[i0:i1]))) / 100

THR = np.percentile(rms, 30) * 1.5   # 低於這個音量算靜音
clips = []
t_out = 0.0
for c in P['CLIPS']:
    s, e = (snap_in(c['s'], .2, .06), snap_in(c['e'], .06, .2)) if SMOOTH else (snap(c['s']), snap(c['e']))
    if P.get('TIGHT'):   # 把段落頭尾的靜音修掉，句子之間不留停頓
        pa, pb = (.1, .18) if SMOOTH else (.06, .12)
        v = np.where(rms[int(s * 100):int(e * 100)] > THR)[0]
        if len(v): s, e = s + max(v[0] / 100 - pa, 0), min(s + v[-1] / 100 + pb, e)
    segs = [(s, e)]
    sq = c.get('squeeze', P.get('SQUEEZE'))
    if sq:   # 把句中停頓拿掉（超過門檻秒數的停頓留頭尾各 60ms）；free_video 的畫面照原片繼續播，其他段畫面跟著聲音剪
        mn = round((.15 if sq is True else sq) * 100)
        segs, cur, i = [], s, int(s * 100)
        while i < int(e * 100):
            if rms30[i] < THR:
                j = i
                while j + 1 < int(e * 100) and rms30[j + 1] < THR: j += 1
                if (j - i + 1) >= mn:
                    segs.append((cur, i / 100 + .06)); cur = (j + 1) / 100 - .06
                i = j + 1
            else: i += 1
        segs.append((cur, e)); segs = [(a_, b_) for a_, b_ in segs if b_ - a_ > .03]
    segs = [(a_, a_ + max(round((b_ - a_) * FPS), 1) / FPS) for a_, b_ in segs]   # 每小段剛好整數幀，聲音和畫面才會對齊
    nv = round(sum(b_ - a_ for a_, b_ in segs) * FPS)
    n = nv + round(P.get('GAP', 0) * FPS)
    clips.append(dict(c, s=s, e=e, n=n, nv=nv, t0=t_out, segs=segs))
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
def src2out(c, t):   # 原片時間 → 這段輸出裡的秒數（squeeze 過的段落要扣掉拿掉的停頓）
    o = 0
    for a_, b_ in c['segs']:
        if t < a_: return o
        if t <= b_: return o + t - a_
        o += b_ - a_
    return o
caps = []  # (開始, 結束, 圖)
for c in clips:
    cs = c.get('caps', [])
    for i, (t, txt) in enumerate(cs):
        a = c['t0'] + src2out(c, t)
        b = c['t0'] + (src2out(c, cs[i + 1][0]) if i + 1 < len(cs) else c['n'] / FPS)
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
booms = [c['t0'] + src2out(c, b) for c in clips for b in c.get('boom', [])]
flashes = [c['t0'] for i, c in enumerate(clips) if i == 0 or c['chapter'] != clips[i - 1]['chapter']]
rnd = random.Random(3)
SHAKE, FLASH = P.get('SHAKE', 6), P.get('FLASH', 70)   # 晃動幅度（像素）、白閃強度（0–255）

FOOT = text_img(P['FOOTER'], 26 if LAND else 30, (200, 205, 215) if LAND else C['dim'], C['dim'], stroke=3 if LAND else 0) if P.get('FOOTER') else None

# 講師徽章：開頭鉤子不出現，之後固定在右上角
BD = P.get('BADGE')
if BD:
    BADGE = Image.open(BD['path']).convert('RGBA')
    bw = BD.get('width', 170)
    BADGE_S = BADGE.resize((bw, round(BADGE.height * bw / BADGE.width)), Image.LANCZOS)
    BADGE_S.putalpha(BADGE_S.split()[3].point(lambda v: int(v * BD.get('opacity', .92))))
    BADGE_T0 = next((c['t0'] for c in clips if c['chapter'] not in BD.get('skip', [])), 0)

# ---------- 圖上標註（MARKS）、重點卡（KEYS）：時間用原片秒數，座標用 CROP 裡的像素 ----------
CUR = {}
GOLD = (232, 186, 110)
def src2screen(x, y):
    z, fx, fy = CUR['z'], CUR['fx'], CUR['fy']
    zw, zh = cw / z, ch / z
    x0 = min(max(fx * cw - zw / 2, 0), cw - zw); y0 = min(max(fy * ch - zh / 2, 0), ch - zh)
    return (x - x0) * (W + 32) / zw - 16, (y - y0) * (H + 18) / zh - 9
MARKS = P.get('MARKS', [])
for m in MARKS: m['img'] = text_img(m['label'], 40, GOLD, GOLD, stroke=6) if m.get('label') else None
def draw_marks(im):
    if 'src' not in CUR: return
    st = CUR['src']; lay = Image.new('RGBA', (W, H)); d = ImageDraw.Draw(lay)
    for m in MARKS:
        if not (m['t0'] <= st <= m['t1'] + .25): continue
        a = min((st - m['t0']) / .35, 1) * min((m['t1'] + .25 - st) / .25, 1)
        al = int(255 * max(a, 0))
        if m['kind'] == 'hline':   # 金色虛線，從左往右畫出來
            x1, y = src2screen(m['x0'], m['y']); x2, _ = src2screen(m['x1'], m['y'])
            xe = x1 + (x2 - x1) * min((st - m['t0']) / .5, 1); xx = x1
            while xx < xe:
                d.line((xx, y, min(xx + 18, xe), y), fill=GOLD + (al,), width=4); xx += 30
            lx, ly = min(x2, W - 30) - m['img'].width, y - m['img'].height + 4   # 標籤放在線右端上方，不超出畫面
        else:                      # 金色圈圈標在轉折點
            x, y = src2screen(*m['at']); r = 26 + 10 * (1 - min((st - m['t0']) / .3, 1))
            d.ellipse((x - r, y - r, x + r, y + r), outline=GOLD + (al,), width=5)
            dx_, dy_ = m.get('off', (34, -70))
            lx, ly = x + dx_, y + dy_
        if m['img']:
            li = m['img'].copy(); li.putalpha(li.split()[3].point(lambda v: int(v * max(a, 0))))
            lay.alpha_composite(li, (int(lx), int(ly)))
    im.alpha_composite(lay)
KEYS = P.get('KEYS', [])
for k in KEYS: k['imgs'] = [(t_, text_img(tx, 44, (245, 245, 245), GOLD, stroke=0)) for t_, tx in k['lines']]
def draw_keys(im):
    if 'src' not in CUR: return
    st = CUR['src']
    for k in KEYS:
        if not (k['t0'] <= st <= k['t1'] + .3): continue
        a = min((st - k['t0']) / .35, 1) * min((k['t1'] + .3 - st) / .3, 1)
        shown = [img for t_, img in k['imgs'] if st >= t_]
        if not shown: continue
        wd = max(i.width for i in shown) + 60; ht = sum(i.height for i in shown) + 50
        card = Image.new('RGBA', (wd, ht)); dc = ImageDraw.Draw(card)
        dc.rounded_rectangle((0, 0, wd - 1, ht - 1), 18, fill=(12, 14, 20, 200))
        dc.rectangle((0, 18, 6, ht - 18), fill=GOLD + (255,))
        yy = 25
        for img in shown: card.alpha_composite(img, (34, yy)); yy += img.height
        card.putalpha(card.split()[3].point(lambda v: int(v * max(a, 0))))
        im.alpha_composite(card, (W - wd - 40 + int((1 - max(a, 0)) * 30), 250))

def compose_land(chart, t, ch_, ch_start):
    dx = dy = 0
    for b in booms:
        if 0 <= t - b < .35:
            k = (1 - (t - b) / .35) * SHAKE; dx, dy = rnd.uniform(-k, k), rnd.uniform(-k, k)
    im = Image.new('RGBA', (W, H))
    im.paste(chart.resize((W + 32, H + 18), Image.BILINEAR), (int(-16 + dx), int(-9 + dy)))
    im.alpha_composite(SHADE)
    draw_marks(im); draw_keys(im)
    # 左上角：章節標籤＋標題（開頭鉤子放大在畫面上方中間）
    pill, ttl = title_imgs(ch_)
    INTRO = P.get('CHAPTER_INTRO') and ch_ not in ('hook',) and t >= 0
    if INTRO and t - ch_start < 1.1:   # 章節開場：標題先在中間浮現，再交給左上角
        k_ = t - ch_start; a = min(k_ / .25, 1) * min((1.1 - k_) / .3, 1)
        big = title_cache.setdefault(('big', ch_), (text_img(P['CHAPTERS'][ch_][0], 46, GOLD, GOLD, stroke=6), text_img(P['CHAPTERS'][ch_][1], 96, C['text'], C['hot'], stroke=8)))
        y_ = 300
        for img in big:
            lay = img.copy(); lay.putalpha(lay.split()[3].point(lambda v: int(v * max(a, 0))))
            im.alpha_composite(lay, ((W - img.width) // 2, int(y_ + (1 - min(k_ / .25, 1)) * 20))); y_ += img.height + 10
    a = ease((t - ch_start - (.9 if INTRO else 0)) / .3)
    if ch_ == 'hook': spots = ((pill, (W - pill.width) // 2, 70), (ttl, (W - ttl.width) // 2, 140))
    else: spots = ((pill, 50, 44), (ttl, 50 + pill.width + 8, 44 + (pill.height - ttl.height) // 2))
    for img, x, y in spots:
        lay = img.copy(); lay.putalpha(lay.split()[3].point(lambda v: int(v * max(a, 0))))
        im.alpha_composite(lay, (int(x - (1 - max(a, 0)) * 30), y))
    for s, e, img in caps:
        if s <= t < e: im.alpha_composite(img, ((W - img.width) // 2, H - 95 - img.height // 2))
    if FOOT: im.alpha_composite(FOOT, (W - FOOT.width - 30, H - FOOT.height - 12))
    if BD and t >= BADGE_T0 and ch_ not in BD.get('skip', []):
        a = ease((t - BADGE_T0) / .6); b = BADGE_S.copy(); b.putalpha(b.split()[3].point(lambda v: int(v * a)))
        im.alpha_composite(b, (W - b.width - 36, 28))
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
    plan = [(c['s'], c['n'])] if (c.get('free_video') or len(c['segs']) == 1) else \
           [(a_, round((b_ - a_) * FPS)) for a_, b_ in c['segs']] + ([(c['segs'][-1][1], c['n'] - c['nv'])] if c['n'] > c['nv'] else [])
    def frames():
        for a_, m_ in plan:
            d_ = subprocess.Popen(['ffmpeg', '-v', 'error', '-ss', f"{a_:.3f}", '-i', SRC, '-t', f"{m_ / FPS + .2:.3f}", '-r', str(FPS), '-frames:v', str(m_),
                                   '-vf', f'crop={cw}:{ch}:{cx}:{cy}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
            for k_ in range(m_): yield d_.stdout.read(cw * ch * 3), a_ + k_ / FPS
            d_.stdout.close(); d_.wait()
    z0, z1, fx, fy = c.get('zoom', (1, 1.05, .5, .5))
    fr = None
    for i, (buf, src_t) in enumerate(frames()):
        if len(buf) == cw * ch * 3: fr = np.frombuffer(buf, np.uint8).reshape(ch, cw, 3)
        p = i / max(c['n'] - 1, 1)
        z = z0 + (z1 - z0) * (ease(p * 3) if c.get('punch') else p)
        t = c['t0'] + i / FPS
        last = zoom_crop(fr, z, fx, fy)
        CUR.update(src=src_t, z=z, fx=fx, fy=fy)
        enc.stdin.write(compose(last, t, c['chapter'], ch_start).tobytes())
    print(f"  {c['t0']:5.1f}s  {c.get('caps', [[0, '']])[0][1]}")

# ---------- 片尾卡 ----------
if END:
    ec = P['END_CARD']
    base = compose(last, t_out, clips[-1]['chapter'], -9).filter(ImageFilter.GaussianBlur(18))
    # 文字裡的 {名稱} 換成 ICONS 的圖示（例如 {discord}）
    def line_img(l, sz):
        parts, out = re.split(r'\{(\w+)\}', l), []
        for k, part in enumerate(parts):
            if k % 2:
                ic = Image.open(P['ICONS'][part]).convert('RGBA'); ih = int(sz * 1.25)
                out.append(ic.resize((round(ic.width * ih / ic.height), ih), Image.LANCZOS))
            elif part.strip():
                out.append(text_img(part, sz, C['text'], tuple(ec.get('kwcolor', C['accent'])), stroke=8))
        if len(out) == 1: return out[0]
        hh = max(o.height for o in out); im_ = Image.new('RGBA', (sum(o.width for o in out) + 6 * len(out), hh))
        x_ = 0
        for o in out: im_.alpha_composite(o, (x_, (hh - o.height) // 2)); x_ += o.width + 6
        return im_
    lines = [line_img(l, sz) for l, sz in ec['lines']]
    if BD and ec.get('badge'):   # 片尾最後放大徽章
        bh = ec['badge']; lines.append(BADGE.resize((round(BADGE.width * bh / BADGE.height), bh), Image.LANCZOS))
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
    parts = []
    for a_, b_ in c['segs']:
        pp = VOICE[int(a_ * SR):int(b_ * SR)].copy()
        if len(c['segs']) > 1:   # squeeze 的接縫：各 10ms 淡入淡出
            k_ = min(len(pp) // 2, int(.01 * SR)); pp[:k_] *= np.linspace(0, 1, k_); pp[-k_:] *= np.linspace(1, 0, k_)
        parts.append(pp)
    seg = np.concatenate(parts)[:int(c['nv'] / FPS * SR)]
    f = min(len(seg) // 2, int((.035 if SMOOTH else .012) * SR)); seg[:f] *= np.linspace(0, 1, f); seg[-f:] *= np.linspace(1, 0, f)
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
