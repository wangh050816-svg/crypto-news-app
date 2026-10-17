"""把 Logo 原圖拆成五層（天光、公牛、Logo、光線、底部光暈），每層都是「原圖 × 遮罩」畫在黑底上。
動畫裡五層用加法（lighter）疊回去，全部亮滿時剛好等於原圖。輸出 1080×1920。"""
from PIL import Image
import numpy as np
W, H = 1080, 1920
im = Image.open('logo_source.png').convert('RGB').resize((W, H), Image.LANCZOS)
a = np.asarray(im).astype(np.float32); lum = a.max(axis=2)
ys, xs = np.mgrid[0:H, 0:W].astype(np.float32)
S = W / 941                                                        # 原圖座標 → 1080 寬
def box(x0, y0, x1, y1, f=12):                                     # 軟邊矩形
    x0, y0, x1, y1 = [v * S for v in (x0, y0, x1, y1)]
    return np.clip(np.minimum.reduce([xs - x0, x1 - xs, ys - y0, y1 - ys]) / f, 0, 1)
key = lambda lo, hi: np.clip((lum - lo) / (hi - lo), 0, 1)
logo = box(290, 660, 670, 1110) * key(28, 70)                      # B 和它的星芒：只取亮的部分
line = box(40, 1150, 900, 1215) * key(20, 60) * (1 - logo)
beam = np.clip((560 * S - ys) / (80 * S), 0, 1) * np.clip((640 * S - xs) / (60 * S), 0, 1) * (1 - logo)   # 上方天光
bottom = np.clip((ys - 1215 * S) / (20 * S), 0, 1) * (1 - line) * (1 - logo)
bull = np.clip(1 - logo - line - beam - bottom, 0, 1)             # 剩下的全部歸公牛
for name, m in [('logo', logo), ('line', line), ('beam', beam), ('bottom', bottom), ('bull', bull)]:
    Image.fromarray(np.clip(a * m[..., None], 0, 255).astype(np.uint8)).save(f'assets/{name}.png')
im.save('assets/full.png'); im.save('logo_endframe.png')
print('ok', float(np.abs((logo + line + beam + bottom + bull) - 1).max()))
