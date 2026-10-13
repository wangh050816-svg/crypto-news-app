"""產生「納瓦爾的智慧 × 交易」直式短片 (1080x1920, 30fps)。

用法: python3 video/naval_trading.py [輸出路徑]
需要: Pillow、ffmpeg、文泉驛正黑字型 (fonts-wqy-zenhei)
"""
import random
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1080, 1920
FPS = 30
FADE = 0.5  # 每段淡入淡出秒數

CJK_FONT = "/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc"
SERIF_FONT = "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf"

BG_TOP = (10, 14, 28)
BG_BOTTOM = (18, 28, 52)
GOLD = (242, 190, 84)
WHITE = (240, 242, 248)
MUTED = (150, 160, 185)
GREEN = (46, 204, 133)
RED = (235, 87, 87)

PRINCIPLES = [
    {
        "quote": "Play long-term games with long-term people.",
        "zh": "跟長期的人，玩長期的遊戲。",
        "apply": [
            "目標是活得久，不是賺得快",
            "單筆風險控制在本金 1–2%",
            "不爆倉，才有機會享受複利",
        ],
    },
    {
        "quote": "All the returns in life come from compound interest.",
        "zh": "人生所有的回報，都來自複利。",
        "apply": [
            "小而穩定的優勢 × 時間 = 財富",
            "虧損 50%，要賺 100% 才能回本",
            "一次大虧，就打斷整條複利曲線",
        ],
    },
    {
        "quote": "Specific knowledge cannot be trained for.",
        "zh": "專屬知識，是別人教不會的。",
        "apply": [
            "找出屬於你自己的交易優勢 (edge)",
            "只交易你真正理解的市場",
            "跟單抄得到進場點，抄不到判斷",
        ],
    },
    {
        "quote": "Fortunes require leverage.",
        "zh": "創造財富，需要槓桿。",
        "apply": [
            "槓桿放大的是判斷，對錯都放大",
            "先證明策略有正期望值，再加槓桿",
            "判斷不清時，槓桿就是毒藥",
        ],
    },
    {
        "quote": "Impatience with actions, patience with results.",
        "zh": "對行動要急，對結果要有耐心。",
        "apply": [
            "觸及停損，就果斷執行不拖延",
            "計畫內的獲利單，讓它奔跑",
            "不要每五分鐘看一次損益",
        ],
    },
    {
        "quote": "Desire is a contract you make with yourself to be unhappy.",
        "zh": "慾望，是你和自己簽下的\n「不快樂契約」。",
        "apply": [
            "FOMO 是交易裡最貴的情緒",
            "錯過的行情，不算你的虧損",
            "追高之前，先問自己在怕什麼",
        ],
    },
    {
        "quote": "If you can't decide, the answer is no.",
        "zh": "如果你無法決定，答案就是「不」。",
        "apply": [
            "沒把握，就不進場",
            "只做符合計畫的 A+ 機會",
            "空手觀望，也是一種部位",
        ],
    },
]

TITLE_DUR = 4.5
SCENE_DUR = 7.5
OUTRO_DUR = 6.5


def font(path, size):
    return ImageFont.truetype(path, size)


def wrap(draw, text, fnt, max_w):
    """依像素寬度換行；英文以單字為單位，中文以字元為單位。"""
    tokens = text.split(" ") if " " in text else list(text)
    sep = " " if " " in text else ""
    lines, cur = [], ""
    for tok in tokens:
        trial = f"{cur}{sep}{tok}" if cur else tok
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = tok
    if cur:
        lines.append(cur)
    return lines


def make_background():
    bg = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(bg)
    for y in range(H):
        t = y / H
        d.line(
            [(0, y), (W, y)],
            fill=tuple(int(a + (b - a) * t) for a, b in zip(BG_TOP, BG_BOTTOM)),
        )
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    for x in range(0, W, 90):
        gd.line([(x, 0), (x, H)], fill=(255, 255, 255, 10))
    for y in range(0, H, 90):
        gd.line([(0, y), (W, y)], fill=(255, 255, 255, 10))
    bg = Image.alpha_composite(bg.convert("RGBA"), grid)
    return bg


def make_candle_strip(width):
    """產生一條很寬的 K 線圖，影片中緩慢橫向捲動。"""
    rng = random.Random(42)
    strip_h = 520
    img = Image.new("RGBA", (width, strip_h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    price = 0.0
    prices = []
    for _ in range(width // 36 + 1):
        o = price
        c = o + rng.gauss(0.15, 1.0)
        hi = max(o, c) + abs(rng.gauss(0, 0.5))
        lo = min(o, c) - abs(rng.gauss(0, 0.5))
        prices.append((o, hi, lo, c))
        price = c
    vals = [v for p in prices for v in p]
    vmin, vmax = min(vals), max(vals)

    def y(v):
        return strip_h - 30 - (v - vmin) / (vmax - vmin) * (strip_h - 60)

    for i, (o, hi, lo, c) in enumerate(prices):
        x = i * 36 + 18
        col = GREEN if c >= o else RED
        a = 55
        d.line([(x, y(hi)), (x, y(lo))], fill=col + (a,), width=3)
        top, bot = sorted([y(o), y(c)])
        d.rectangle([x - 11, top, x + 11, max(bot, top + 3)], fill=col + (a,))
    return img


def layer():
    return Image.new("RGBA", (W, H), (0, 0, 0, 0))


def text_center(d, y, text, fnt, fill):
    w = d.textlength(text, font=fnt)
    d.text(((W - w) / 2, y), text, font=fnt, fill=fill)


def glow_text_layer(draw_fn):
    """先畫一層模糊光暈再疊上清晰文字。"""
    base = layer()
    draw_fn(ImageDraw.Draw(base))
    glow = base.filter(ImageFilter.GaussianBlur(14))
    return Image.alpha_composite(glow, base)


# ---------- 各段落的元素 (每個元素: 圖層, 出現時間) ----------


def title_elements():
    els = []
    tag = layer()
    text_center(ImageDraw.Draw(tag), 610, "NAVAL RAVIKANT", font(SERIF_FONT, 44), MUTED)
    els.append((tag, 0.2))

    def big(d):
        text_center(d, 700, "納瓦爾的智慧", font(CJK_FONT, 120), GOLD)

    els.append((glow_text_layer(big), 0.5))

    x_l = layer()
    d = ImageDraw.Draw(x_l)
    text_center(d, 860, "×", font(CJK_FONT, 90), WHITE)
    text_center(d, 980, "套用在交易上", font(CJK_FONT, 110), WHITE)
    els.append((x_l, 1.0))

    sub = layer()
    d = ImageDraw.Draw(sub)
    d.rounded_rectangle([250, 1190, 830, 1270], radius=40, outline=GOLD, width=3)
    text_center(d, 1205, "7 個改變交易思維的觀念", font(CJK_FONT, 44), GOLD)
    els.append((sub, 1.6))
    return els


def principle_elements(idx, p):
    els = []
    num = layer()
    d = ImageDraw.Draw(num)
    d.text((90, 230), f"{idx:02d}", font=font(SERIF_FONT, 150), fill=GOLD + (230,))
    d.text((90, 420), f"觀念 {idx} / {len(PRINCIPLES)}", font=font(CJK_FONT, 40), fill=MUTED)
    els.append((num, 0.1))

    q = layer()
    d = ImageDraw.Draw(q)
    qf = font(SERIF_FONT, 50)
    y = 540
    lines = wrap(d, f"“{p['quote']}”", qf, W - 200)
    d.rectangle([90, y, 97, y + len(lines) * 66 - 6], fill=GOLD)
    for line in lines:
        d.text((125, y), line, font=qf, fill=WHITE)
        y += 66
    els.append((q, 0.5))

    zh = layer()
    d = ImageDraw.Draw(zh)
    zf = font(CJK_FONT, 64)
    y += 40
    for line in (l for part in p["zh"].split("\n") for l in wrap(d, part, zf, W - 180)):
        d.text((90, y), line, font=zf, fill=GOLD)
        y += 86
    els.append((zh, 1.1))

    head = layer()
    d = ImageDraw.Draw(head)
    y += 60
    d.line([(90, y), (W - 90, y)], fill=(255, 255, 255, 60), width=2)
    y += 50
    d.rounded_rectangle([90, y, 420, y + 76], radius=38, fill=GOLD)
    d.text((122, y + 12), "套用在交易", font=font(CJK_FONT, 48), fill=BG_TOP)
    els.append((head, 1.9))

    y += 130
    af = font(CJK_FONT, 52)
    for i, item in enumerate(p["apply"]):
        it = layer()
        d = ImageDraw.Draw(it)
        d.ellipse([95, y + 18, 119, y + 42], fill=GREEN)
        ly = y
        for line in wrap(d, item, af, W - 260):
            d.text((150, ly), line, font=af, fill=WHITE)
            ly += 70
        els.append((it, 2.5 + i * 0.7))
        y = ly + 40
    return els


def outro_elements():
    els = []

    def big(d):
        text_center(d, 560, "用頭腦賺錢", font(CJK_FONT, 110), GOLD)
        text_center(d, 700, "而不是用時間", font(CJK_FONT, 110), GOLD)

    els.append((glow_text_layer(big), 0.2))

    q = layer()
    text_center(
        ImageDraw.Draw(q), 870, "“Earn with your mind, not your time.”", font(SERIF_FONT, 42), MUTED
    )
    els.append((q, 0.8))

    summary = layer()
    d = ImageDraw.Draw(summary)
    items = ["活得久", "守複利", "找優勢", "慎槓桿", "等機會"]
    sf = font(CJK_FONT, 50)
    y = 1040
    for i, s in enumerate(items):
        text_center(d, y + i * 80, s, sf, WHITE)
    els.append((summary, 1.5))

    disc = layer()
    text_center(
        ImageDraw.Draw(disc), 1620, "本影片僅供教育參考，不構成任何投資建議", font(CJK_FONT, 36), MUTED
    )
    els.append((disc, 2.4))
    return els


def build_timeline():
    scenes = [(TITLE_DUR, title_elements())]
    for i, p in enumerate(PRINCIPLES, 1):
        scenes.append((SCENE_DUR, principle_elements(i, p)))
    scenes.append((OUTRO_DUR, outro_elements()))
    return scenes


def ease_out(t):
    return 1 - (1 - t) ** 3


def render(out_path):
    scenes = build_timeline()
    total = sum(d for d, _ in scenes)
    bg = make_background()
    strip = make_candle_strip(W * 4)
    strip_y = H - 560

    cmd = [
        "ffmpeg", "-y", "-loglevel", "error",
        "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
        "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
        "-shortest", "-c:v", "libx264", "-preset", "medium", "-crf", "22",
        "-pix_fmt", "yuv420p", "-c:a", "aac", "-movflags", "+faststart",
        str(out_path),
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)

    n_frames = int(total * FPS)
    scene_start = 0.0
    scene_iter = iter(scenes)
    dur, els = next(scene_iter)
    for f in range(n_frames):
        t = f / FPS
        while t >= scene_start + dur:
            scene_start += dur
            dur, els = next(scene_iter)
        lt = t - scene_start

        frame = bg.copy()
        off = int(t * 40) % (strip.width - W)
        frame.alpha_composite(strip.crop((off, 0, off + W, strip.height)), (0, strip_y))

        content = layer()
        for img, appear in els:
            if lt < appear:
                continue
            k = ease_out(min(1.0, (lt - appear) / 0.6))
            dy = int((1 - k) * 40)
            faded = img.copy()
            if k < 1:
                a = faded.getchannel("A").point(lambda v, k=k: int(v * k))
                faded.putalpha(a)
            content.alpha_composite(faded, (0, dy) if dy else (0, 0))

        # 段落淡入淡出
        scene_alpha = min(1.0, lt / FADE, (dur - lt) / FADE)
        if scene_alpha < 1:
            a = content.getchannel("A").point(lambda v, s=scene_alpha: int(v * s))
            content.putalpha(a)
        frame.alpha_composite(content)

        # 底部進度條
        d = ImageDraw.Draw(frame)
        d.rectangle([0, H - 10, int(W * t / total), H], fill=GOLD)

        proc.stdin.write(frame.convert("RGB").tobytes())

    proc.stdin.close()
    proc.wait()
    print(f"完成: {out_path} ({total:.1f} 秒, {n_frames} 幀)")


if __name__ == "__main__":
    out = Path(sys.argv[1]) if len(sys.argv) > 1 else Path(__file__).parent / "naval_trading.mp4"
    render(out)
