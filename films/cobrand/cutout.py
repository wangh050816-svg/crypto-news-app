"""從活動海報精準摳出每個元素（透明背景 PNG，放大 2 倍）。每個元素用最適合它的方法：
顏色分離（文字）、外形補洞（標語帶、撕紙、卡片）、多邊形描邊（卡包、木牌）、AI 去背（徽章、南瓜），最後都做碎片清理和邊緣柔化。"""
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
from scipy import ndimage as nd
im = Image.open('poster.jpg').convert('RGB'); A = np.asarray(im).astype(np.float32)
R, G, B = A[..., 0], A[..., 1], A[..., 2]; MX, MN = A.max(2), A.min(2); SAT = MX - MN
H, W = MX.shape; SC = 2
def clip(v): return np.clip(v, 0, 1)
def keep_big(m, min_area):                                       # 清掉小碎片
    lab, n = nd.label(m > .5); sizes = nd.sum(np.ones_like(m), lab, range(1, n + 1))
    keep = np.isin(lab, np.where(sizes >= min_area)[0] + 1); return m * keep
def fill_small_holes(m, max_area):                               # 只補小洞（筆畫裡的雜點），不補字的中空
    holes = ~(m > .5); lab, n = nd.label(holes); sizes = nd.sum(np.ones_like(m), lab, range(1, n + 1))
    small = np.isin(lab, np.where(sizes <= max_area)[0] + 1); out = m.copy(); out[small] = 1; return out
def fill_all_holes(m): return np.maximum(m, nd.binary_fill_holes(m > .5).astype(np.float32))
def poly(pts, feather=1.2):
    mk = Image.new('L', (W, H), 0); ImageDraw.Draw(mk).polygon(pts, fill=255)
    return np.asarray(mk.filter(ImageFilter.GaussianBlur(feather))).astype(np.float32) / 255
def boxmask(x0, y0, x1, y1): m = np.zeros((H, W), np.float32); m[y0:y1, x0:x1] = 1; return m
def save(name, m, bbox, pad=6):
    x0, y0, x1, y1 = bbox; x0, y0 = max(0, x0 - pad), max(0, y0 - pad); x1, y1 = min(W, x1 + pad), min(H, y1 + pad)
    rgba = np.dstack([A, clip(m)[..., None] * 255]).astype(np.uint8)[y0:y1, x0:x1]
    out = Image.fromarray(rgba, 'RGBA').resize(((x1 - x0) * SC, (y1 - y0) * SC), Image.LANCZOS)
    out.save(f'assets/{name}.png'); return out
def soft(m, r=.8): return np.asarray(Image.fromarray((clip(m) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r))).astype(np.float32) / 255

white = clip((MN - 150) / 50) * clip((60 - SAT) / 40)
green = clip((G - R - 35) / 40) * clip((G - 110) / 40)
orange = clip((R - B - 70) / 50) * clip((R - 150) / 40) * clip((G - 40) / 40)

# 1. OURBIT Logo：白字 + 綠色圖示
m = (np.maximum(white, green)) * boxmask(48, 40, 368, 110); m = fill_small_holes(keep_big(m, 30), 25); save('logo', soft(m, .6) * np.maximum(np.maximum(white, green), m * .0 + (m > .5)), (48, 40, 368, 110))

# 2. 標題：白字「萬聖節」、綠字「狂歡夜」、橘色 Halloween、幽靈、南瓜；排除右邊的卡包和蜘蛛網、下面的標語帶
region = boxmask(25, 130, 700, 445) * (1 - poly([(540, 360), (700, 360), (700, 445), (540, 445)], 0)) * (1 - poly([(630, 250), (700, 250), (700, 380), (630, 380)], 0))
ribbon_poly = poly([(36, 456), (424, 398), (432, 450), (44, 520)], 0)
key = np.maximum(np.maximum(white, green), orange) * region * (1 - ribbon_poly)
m = keep_big(key, 60); m = fill_small_holes(m, 70)
pumpkin = fill_all_holes(keep_big(orange * boxmask(420, 360, 500, 430), 40)); m = np.maximum(m, pumpkin)
ghost = fill_all_holes(keep_big(white * boxmask(40, 350, 110, 440), 40)); m = np.maximum(m, ghost)
m = m * (1 - boxmask(110, 428, 700, 445)); m = keep_big(m, 60)                                     # 去掉標題下方標語帶的碎片
save('title', soft(m, .5), (25, 130, 700, 445))

# 3. 綠色標語帶：抓綠色外形，補滿裡面的黑字
m = green * boxmask(30, 395, 440, 525) * poly([(30, 452), (428, 392), (440, 455), (40, 528)], 0)
lab, n = nd.label(m > .5); big = np.argmax(nd.sum(np.ones_like(m), lab, range(1, n + 1))) + 1; m = m * (lab == big)    # 只留最大的那條綠帶
m = fill_all_holes(m); save('ribbon', soft(m, .6), (30, 395, 440, 525))

# 4. 木牌：多邊形 + 角落的蜘蛛網（只留和木牌相連的亮細線）
board = poly([(702, 234), (945, 256), (928, 395), (690, 372)])
web = white * 0 + clip((MN - 110) / 50) * clip((70 - SAT) / 40) * boxmask(640, 205, 988, 415)
near = nd.binary_dilation(board > .5, iterations=40); web = keep_big(web * near, 25)
save('sign', soft(np.maximum(board, web), .5), (640, 205, 988, 415))

# 5. 卡包：多邊形描邊（下緣被撕紙壓住，沿撕紙上緣切齊）
pack = poly([(564, 366), (845, 405), (832, 422), (815, 436), (767, 760), (750, 850), (492, 815)], 1.0)
paper_key = clip((MN - 160) / 40) * clip((50 - SAT) / 30)
pack = pack * (1 - fill_all_holes(keep_big(paper_key * boxmask(80, 770, 720, 1100), 3000)))
save('pack', pack, (480, 355, 850, 870))

# 6. 撕紙「最高 30% 儲值返利」：抓淺色紙張外形，補滿裡面的字
paper = fill_all_holes(keep_big(paper_key * boxmask(80, 770, 720, 1100), 3000))
paper = np.maximum(paper, fill_all_holes(nd.binary_closing(paper > .5, iterations=6).astype(np.float32)))
save('paper', soft(paper, .7), (80, 770, 720, 1100))

# 7. 徽章 + USDT 幣：AI 去背
from rembg import new_session, remove
sess = new_session('isnet-general-use')
def ai(name, bbox):
    c = im.crop(bbox); o = remove(c, session=sess, post_process_mask=True)
    a = np.asarray(o)[..., 3].astype(np.float32) / 255; a = keep_big(a, 200); a = fill_all_holes(a) * .0 + np.maximum(a, nd.binary_fill_holes(a > .5)) 
    full = np.zeros((H, W), np.float32); full[bbox[1]:bbox[3], bbox[0]:bbox[2]] = a; return full
badge = ai('badge', (680, 830, 960, 1090)); save('badge', soft(badge, .6), (680, 830, 960, 1090))
pk = None
if False:
  pk = ai('pumpkin', (775, 540, 988, 860))
  warm = clip((R - B - 40) / 40) * clip((R - 70) / 40) * boxmask(775, 540, 988, 860)                   # 南瓜本體是暖橘色：只留和它相連的部分
  body = nd.binary_fill_holes(nd.binary_closing(keep_big(warm, 3000) > .5, iterations=5))
  stem = nd.binary_dilation(body, iterations=14)                                                       # 蒂頭偏暗，留一點寬度
  pk = pk * stem; pk = keep_big(pk, 2000); save('pumpkin', soft(pk, .6), (775, 540, 988, 860))   # 南瓜在原圖被右邊緣切掉，不使用

# 8. 四張福利卡：亮色圓角卡片，補滿裡面
for i, bb in enumerate([(22, 1120, 252, 1480), (252, 1120, 484, 1480), (480, 1115, 742, 1485), (740, 1120, 975, 1480)]):
    k = clip((MN - 175) / 30) * clip((40 - SAT) / 30) if i != 2 else np.maximum(clip((MN - 175) / 30) * clip((40 - SAT) / 30), green)
    m = fill_all_holes(keep_big(k * boxmask(*bb), 5000)); ys_, xs_ = np.where(m > .5)
    x0, x1, y0, y1 = xs_.min(), xs_.max(), ys_.min(), ys_.max()                                       # 用乾淨的圓角矩形取代描出來的邊
    rr = Image.new('L', (W, H), 0); ImageDraw.Draw(rr).rounded_rectangle((x0, y0, x1, y1), 14, fill=255)
    m = np.asarray(rr.filter(ImageFilter.GaussianBlur(.7))).astype(np.float32) / 255
    save(f'card{i + 1}', m, bb)
print('ok')
