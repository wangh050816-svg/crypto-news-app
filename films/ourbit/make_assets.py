"""從海報切出動畫要用的圖層：去背（亮度鍵）、羽化邊緣、圓角卡片。輸出 assets/*.png（放大 1.6 倍）。"""
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
im = Image.open('poster.png').convert('RGB'); S = 1.6
def up(c): return c.resize((round(c.width * S), round(c.height * S)), Image.LANCZOS)
def lumakey(c, lo, hi):
    a = np.asarray(c).astype(float); m = a.max(axis=2); al = np.clip((m - lo) / (hi - lo), 0, 1) * 255
    out = c.convert('RGBA'); out.putalpha(Image.fromarray(al.astype('uint8'))); return out
def feather(c, r, shape='rect', inset=0):
    m = Image.new('L', c.size, 0); d = ImageDraw.Draw(m); box = (r + inset, r + inset, c.width - r - inset, c.height - r - inset)
    (d.ellipse if shape == 'ellipse' else d.rectangle)(box, fill=255); m = m.filter(ImageFilter.GaussianBlur(r * .6))
    out = c.convert('RGBA'); out.putalpha(m); return out
def rounded(c, inset, rad):
    m = Image.new('L', c.size, 0); ImageDraw.Draw(m).rounded_rectangle((inset, inset, c.width - inset, c.height - inset), rad, fill=255)
    out = c.convert('RGBA'); out.putalpha(m); return out
crop = lambda b: up(im.crop(b))
lumakey(crop((62, 112, 372, 180)), 60, 120).save('assets/logo.png')
t = lumakey(crop((36, 205, 700, 497)), 95, 175); d = ImageDraw.Draw(t); d.rectangle(((600 - 36) * S, (318 - 205) * S, t.width, t.height), fill=(0, 0, 0, 0)); t.save('assets/title.png')   # 右下角是「註冊送」牌子，挖掉
feather(crop((66, 512, 478, 586)), 6).save('assets/ribbon.png')
feather(crop((605, 322, 925, 510)), 14).save('assets/sign.png')
feather(crop((462, 498, 802, 940)), 22).save('assets/pack.png')
feather(crop((95, 955, 705, 1245)), 16).save('assets/big30.png')
feather(crop((645, 1012, 905, 1232)), 14, 'ellipse', -10).save('assets/badge.png')
for i, b in enumerate([(28, 1270, 244, 1608), (244, 1270, 464, 1608), (462, 1266, 700, 1612), (698, 1270, 914, 1608)]):
    rounded(crop(b), 6 * S, 16 * S).save(f'assets/card{i + 1}.png')
im.filter(ImageFilter.GaussianBlur(26)).resize((1080, 1919)).save('assets/bg.jpg', quality=88)
print('ok')
