# 把 sources/ 的實拍照片處理成 public/real/ 用的素材：調色、摳圖、轉檔
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance
from rembg import remove, new_session
from scipy import ndimage
import os
SRC, OUT = "sources", "public/real"
os.makedirs(OUT, exist_ok=True)
sess = new_session("isnet-general-use")

def grade(im, bright=1.0, sat=1.0, contrast=1.0, tint=None):
    im = ImageEnhance.Brightness(im).enhance(bright)
    im = ImageEnhance.Color(im).enhance(sat)
    im = ImageEnhance.Contrast(im).enhance(contrast)
    if tint:
        a = np.asarray(im).astype(np.float32); a *= np.array(tint, np.float32)
        im = Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))
    return im

def keep_big(alpha, thr=40):
    lab, n = ndimage.label(alpha > thr)
    if n <= 1: return alpha
    sizes = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
    keep = ndimage.binary_fill_holes(lab == (np.argmax(sizes) + 1))
    keep = ndimage.binary_dilation(keep, iterations=2)
    return np.where(keep, alpha, 0).astype(np.uint8)

def cut(name, out, maxw=1400, crop=None):
    im = Image.open(f"{SRC}/{name}").convert("RGB")
    if crop: im = im.crop(crop)
    im.thumbnail((maxw, maxw))
    rgba = remove(im, session=sess, post_process_mask=True).convert("RGBA")
    a = np.asarray(rgba).copy(); a[..., 3] = keep_big(a[..., 3])
    rgba = Image.fromarray(a); rgba = rgba.crop(rgba.getbbox())
    rgba.save(f"{OUT}/{out}"); print(out, rgba.size)

# 背景板：月夜雲層、霧中林道，壓暗偏冷
grade(Image.open(f"{SRC}/13592310.jpg").convert("RGB"), .85, .7, 1.1).save(f"{OUT}/sky.jpg", quality=90)
grade(Image.open(f"{SRC}/29547573.jpg").convert("RGB"), .62, .55, 1.15, (0.85, .95, 1.1)).save(f"{OUT}/forest.jpg", quality=90)
# 黑底素材（用 screen 疊加，不用摳）
def edge_fade(im, top=.1, bottom=.1, side=.1, black=12):
    """黑點壓到 0、四邊漸黑：screen 疊加時不會整片發灰、也看不到照片的方框邊"""
    a = np.asarray(im).astype(np.float32)
    a = np.clip((a - black) / (255 - black), 0, 1)
    h, w = a.shape[:2]; y = np.linspace(0, 1, h)[:, None]; x = np.linspace(0, 1, w)[None, :]
    s = lambda v: v * v * (3 - 2 * v)
    m = s(np.clip(y / top, 0, 1)) * s(np.clip((1 - y) / bottom, 0, 1)) * s(np.clip(x / side, 0, 1)) * s(np.clip((1 - x) / side, 0, 1))
    return Image.fromarray((a * m[..., None] * 255).astype(np.uint8))
# 地面霧只取碗下面那片霧床（照片下 1/3），避開中間的乾冰碗
im = Image.open(f"{SRC}/9694196.jpg").convert("RGB"); W0, H0 = im.size
im = grade(im.crop((0, int(H0 * .66), W0, H0)), 1, 0, 1.1); im.thumbnail((1920, 1920))
edge_fade(im, top=.55, bottom=.25, side=.2).save(f"{OUT}/fog_low.jpg", quality=88)
for n, o, fades in [("9694694.jpg", "fog_tall.jpg", (.45, .3, .25)), ("360976.jpg", "smoke.jpg", (.2, .2, .15)), ("10154563.jpg", "puff.jpg", (.15, .15, .15)), ("619420.jpg", "faces.jpg", (.2, .2, .1))]:
    im = Image.open(f"{SRC}/{n}").convert("RGB"); im.thumbnail((1920, 1920))
    if o != "faces.jpg": im = grade(im, 1, 0, 1.15)    # 煙霧去色
    edge_fade(im, *fades).save(f"{OUT}/{o}", quality=88)
for n, o in [("7267507.jpg", "btc.jpg"), ("8442352.jpg", "gold.jpg")]:
    im = Image.open(f"{SRC}/{n}").convert("RGB"); im.thumbnail((1400, 1400)); grade(im, 1, 1.05, 1.12).save(f"{OUT}/{o}", quality=90)
# 摳圖：南瓜燈、紅緞帶禮盒
cut("236277.jpg", "pumpkin_a.png")
cut("5624975.jpg", "gift.png", crop=(830, 520, 1510, 1140))
# 蝙蝠：白底剪影，直接用亮度當 alpha
im = Image.open(f"{SRC}/5243213.jpg").convert("L"); im.thumbnail((900, 900))
a = np.asarray(im).astype(np.float32); alpha = np.clip((200 - a) / 120, 0, 1) * 255
alpha = keep_big(alpha.astype(np.uint8))
bat = np.zeros((*alpha.shape, 4), np.uint8); bat[..., :3] = 8; bat[..., 3] = alpha
b = Image.fromarray(bat); b.crop(b.getbbox()).save(f"{OUT}/bat.png"); print("bat", b.getbbox())
# 寶可夢官方素材：卡包（官網透明 PNG）、三張卡
Image.open(f"{SRC}/m6a_pack.webp").convert("RGBA").save(f"{OUT}/pack.png")
for c in ["gengar", "pikachu", "arceus"]:
    im = Image.open(f"{SRC}/card_{c}.png").convert("RGBA"); im.thumbnail((640, 900)); im.save(f"{OUT}/card_{c}.png")
# 南瓜底部帶到稻草：底部 18% 漸隱，讓它沉進地面霧裡
pa = np.asarray(Image.open(f"{OUT}/pumpkin_a.png")).astype(np.float32); h = pa.shape[0]
fade = np.clip((h * .97 - np.arange(h)) / (h * .18), 0, 1)[:, None]
pa[..., 3] *= fade
Image.fromarray(pa.astype(np.uint8)).save(f"{OUT}/pumpkin_a.png")
