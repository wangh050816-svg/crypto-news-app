import sys
from PIL import Image, ImageDraw
im = Image.open('poster.jpg').convert('RGB')
x0, y0, x1, y1, sc = [int(v) for v in sys.argv[1:6]]
c = im.crop((x0, y0, x1, y1)).resize(((x1 - x0) * sc, (y1 - y0) * sc), Image.LANCZOS); d = ImageDraw.Draw(c)
for x in range((x0 // 10) * 10, x1, 10):
    if x < x0: continue
    X = (x - x0) * sc; d.line((X, 0, X, c.height), fill=(0, 255, 255) if x % 50 == 0 else (0, 90, 90), width=1)
    if x % 50 == 0: d.text((X + 2, 2), str(x), fill=(255, 255, 0))
for y in range((y0 // 10) * 10, y1, 10):
    if y < y0: continue
    Y = (y - y0) * sc; d.line((0, Y, c.width, Y), fill=(0, 255, 255) if y % 50 == 0 else (0, 90, 90), width=1)
    if y % 50 == 0: d.text((2, Y + 2), str(y), fill=(255, 255, 0))
c.save(sys.argv[6])
