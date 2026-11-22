"""產生可以直接貼到 LINE 社群（OpenChat）的每日貼文，每天主題不同：

  週一｜上週行情回顧（漲跌排行、情緒變化）
  週二｜新手小教室
  週三｜不發（社群已有自己的籌碼快報）
  週四｜防詐小提醒＋本週資安事件
  週五｜新聞精選（行情＋重點新聞）
  週六｜冷知識＋投票
  週日｜一週新聞回顧

LINE 社群沒有開放機器人發文 API，所以這支程式只負責「整理好文字」：
- 寫進 line/latest.txt 和 line/YYYY-MM-DD.txt
- 由 fetch_news.py 一併推到 Telegram，手機上長按複製、貼進 LINE 社群即可

單獨執行：python line_digest.py           （今天的主題）
          python line_digest.py --day 1   （指定星期幾，1=週一…7=週日，方便預覽）
"""
import argparse
import glob
import html
import json
import os
import re
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime

import requests

from line_content import FUN_FACTS, LESSONS, POLLS, SCAM_TIPS

TW = timezone(timedelta(hours=8))
WEEKDAYS = "一二三四五六日"

COINS = [  # (CoinGecko id, 顯示代號)
    ("bitcoin", "BTC"),
    ("ethereum", "ETH"),
]

FNG_ZH = {
    "Extreme Fear": ("😱", "極度恐懼"),
    "Fear": ("😟", "恐懼"),
    "Neutral": ("😐", "中性"),
    "Greed": ("😀", "貪婪"),
    "Extreme Greed": ("🤑", "極度貪婪"),
}

CATEGORY_LABEL = {
    "Bitcoin": "₿ 比特幣",
    "Ethereum": "Ξ 以太坊",
    "監管政策": "⚖️ 監管政策",
    "資安事件": "🚨 資安事件",
    "DeFi": "🏦 DeFi",
    "山寨幣": "🪙 山寨幣",
    "AI": "🤖 AI／科技",
    "加密市場": "📈 市場動態",
}

MAX_NEWS = 3          # 一則 LINE 訊息保持精簡
MAX_AGE_HOURS = 36    # 只收最近一天半的新聞
MAX_AI = 2            # AI／科技新聞最多放幾則，避免蓋過幣圈新聞
GENERIC_WORDS = {
    "bitcoin", "ether", "ethereum", "crypto", "after", "first", "billion", "million",
    "below", "above", "falls", "price", "market", "token", "tokens", "exchange", "exchanges",
}
NUM_EMOJI = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]


def _get_json(url, retries=3):
    for _ in range(retries):
        try:
            r = requests.get(url, timeout=15, headers={"Accept": "application/json"})
            if r.status_code == 200:
                return r.json()
        except (requests.RequestException, ValueError):
            pass
    return None


def fetch_prices():
    ids = ",".join(c for c, _ in COINS)
    data = _get_json(
        "https://api.coingecko.com/api/v3/simple/price"
        f"?ids={ids}&vs_currencies=usd&include_24hr_change=true"
    )
    if not data:
        return []
    rows = []
    for cid, sym in COINS:
        d = data.get(cid)
        if d and d.get("usd") is not None:
            rows.append((sym, d["usd"], d.get("usd_24h_change") or 0.0))
    return rows


def fetch_fear_greed():
    data = _get_json("https://api.alternative.me/fng/?limit=2")
    try:
        today, yesterday = data["data"][0], data["data"][1]
        return int(today["value"]), today["value_classification"], int(yesterday["value"])
    except (TypeError, KeyError, IndexError, ValueError):
        return None


def _fmt_price(p):
    if p >= 1000:
        return f"${p:,.0f}"
    if p >= 1:
        return f"${p:,.2f}"
    return f"${p:.4f}"


def clean_summary(raw, limit=60):
    text = re.sub(r"<[^>]+>", "", raw or "")
    text = html.unescape(text)
    text = re.sub(r"\[…\]|\[\.\.\.\]|〈.*$|The post .*$", "", text, flags=re.S)
    text = re.sub(r"\s+", " ", text).strip(" .…")
    return text[:limit] + "…" if len(text) > limit else text


def clean_link(url):
    return re.sub(r"\?utm_[^#]*$", "", url)


def _is_chinese(s):
    return re.search(r"[一-鿿]", s) is not None


def _parse_time(s):
    try:
        dt = parsedate_to_datetime(s)
        return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)
    except (TypeError, ValueError):
        return None


def pick_news(articles, now, max_age_hours=MAX_AGE_HOURS, max_news=MAX_NEWS):
    """挑出要放進早報的新聞：只要加密相關、近期、去重，中文來源優先。"""
    candidates = []
    for a in articles:
        if a.get("category") == "非加密貨幣":
            continue
        t = _parse_time(a.get("published", ""))
        if t and now - t > timedelta(hours=max_age_hours):
            continue
        if a["title"].lower().startswith(("here’s what happened", "here's what happened")):
            continue
        candidates.append(a)
    # 加密新聞優先於 AI；中文在前、英文在後；同組維持原本（較新在前）的順序
    candidates.sort(key=lambda a: (a.get("category") == "AI", not _is_chinese(a["title"])))

    seen_names, picked, ai_count = set(), [], 0
    for a in candidates:
        # 用標題裡的專有名詞（如 Chainflip、Hyperliquid）判斷是不是同一則事件的不同報導
        names = {w.lower() for w in re.findall(r"[A-Za-z][A-Za-z0-9]{4,}", a["title"])} - GENERIC_WORDS
        if names & seen_names:
            continue
        if a.get("category") == "AI":
            if ai_count >= MAX_AI:
                continue
            ai_count += 1
        seen_names |= names
        picked.append(a)
        if len(picked) >= max_news:
            break
    return picked


def _header(emoji, title, now):
    return [f"{emoji} {title}｜{now:%m/%d}（{WEEKDAYS[now.weekday()]}）", ""]


def _rotate(items, now):
    """依 ISO 週數輪替題庫，同一週內固定、每週換一題。"""
    return items[now.isocalendar()[1] % len(items)]


DISCLAIMER = "⚠️ 僅供參考，非投資建議"


def _news_lines(news, with_summary=True):
    lines = []
    for i, a in enumerate(news):
        label = CATEGORY_LABEL.get(a.get("category"), "📌 其他")
        tag = "" if _is_chinese(a["title"]) else "（英文）"
        lines.append("")
        lines.append(f"{NUM_EMOJI[i]} 【{label}】{a['title']}{tag}")
        summary = clean_summary(a.get("summary", "")) if with_summary else ""
        if summary and _is_chinese(summary):
            lines.append(f"　└ {summary}")
        lines.append(f"🔗 {clean_link(a['link'])}")
    return lines


# ---------- 新聞存檔（週四、週日要用到一整週的新聞） ----------

ARCHIVE_DIR = "archive"


def archive_articles(articles, now=None):
    now = now or datetime.now(TW)
    os.makedirs(ARCHIVE_DIR, exist_ok=True)
    path = os.path.join(ARCHIVE_DIR, f"{now:%Y-%m-%d}.json")
    existing = []
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            existing = json.load(f)
    links = {a["link"] for a in existing}
    merged = existing + [a for a in articles if a["link"] not in links and a.get("category") != "非加密貨幣"]
    with open(path, "w", encoding="utf-8") as f:
        json.dump(merged, f, ensure_ascii=False, indent=2)
    # 只留最近 30 天
    for old in sorted(glob.glob(os.path.join(ARCHIVE_DIR, "*.json")))[:-30]:
        os.remove(old)


def load_week_articles(now, days=7):
    out = []
    for i in range(days):
        path = os.path.join(ARCHIVE_DIR, f"{now - timedelta(days=i):%Y-%m-%d}.json")
        if os.path.exists(path):
            with open(path, encoding="utf-8") as f:
                out += json.load(f)
    return out


# ---------- 週一：上週行情回顧 ----------

STABLECOINS = {"usdt", "usdc", "dai", "usde", "fdusd", "tusd", "pyusd", "usdd", "usds", "usd1",
               "usdtb", "rlusd", "busd", "frax", "gusd", "usdp", "eurc", "usdf", "usdg", "bfusd"}


def fetch_top_coins():
    data = _get_json(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        "&order=market_cap_desc&per_page=100&price_change_percentage=7d"
    ) or []
    return [c for c in data
            if c.get("symbol", "").lower() not in STABLECOINS
            and "usd" not in c.get("symbol", "").lower()
            and c.get("price_change_percentage_7d_in_currency") is not None]


def build_monday(articles, now):
    coins = fetch_top_coins()
    lines = _header("📅", "上週行情回顧", now)
    if coins:
        chg = {c["symbol"].upper(): c["price_change_percentage_7d_in_currency"] for c in coins}
        lines.append("💰 主流幣近 7 天")
        for sym in ("BTC", "ETH"):
            if sym in chg:
                arrow = "🟢▲" if chg[sym] >= 0 else "🔴▼"
                lines.append(f"{sym}  {arrow}{abs(chg[sym]):.1f}%")
        ranked = sorted(coins, key=lambda c: c["price_change_percentage_7d_in_currency"], reverse=True)
        top, bottom = ranked[0], ranked[-1]
        lines += [
            f"🚀 前 100 大漲最多：{top['symbol'].upper()} +{top['price_change_percentage_7d_in_currency']:.1f}%",
            f"🧊 前 100 大跌最多：{bottom['symbol'].upper()} {bottom['price_change_percentage_7d_in_currency']:.1f}%",
            "",
        ]

    fng = _get_json("https://api.alternative.me/fng/?limit=8")
    try:
        now_v, week_v = int(fng["data"][0]["value"]), int(fng["data"][7]["value"])
        emoji, zh = FNG_ZH.get(fng["data"][0]["value_classification"], ("📉", ""))
        lines += [f"{emoji} 市場情緒 {now_v}（{zh}），一週前 {week_v}", ""]
    except (TypeError, KeyError, IndexError, ValueError):
        pass

    lines += ["💬 上週你有操作嗎？", DISCLAIMER]
    return "\n".join(lines)


# ---------- 週二：新手小教室 ----------

def build_tuesday(articles, now):
    title, body, point = _rotate(LESSONS, now)
    lines = _header("📚", "新手小教室", now)
    lines += [f"❓ {title}", "", body, "", f"💡 {point}"]
    return "\n".join(lines)


# ---------- 週四：防詐小提醒 ----------

def build_thursday(articles, now):
    title, body = _rotate(SCAM_TIPS, now)
    lines = _header("🛡️", "防詐小提醒", now)
    lines += [f"⚠️ {title}", "", body]
    if "165" not in body:
        lines += ["", "📞 遇到詐騙請撥 165"]
    return "\n".join(lines)


# ---------- 週五：新聞精選（原本的早報格式） ----------

def build_friday(articles, now, prices=None, fng=None):
    prices = fetch_prices() if prices is None else prices
    fng = fetch_fear_greed() if fng is None else fng

    lines = _header("📊", "週五幣圈快訊", now)

    if prices:
        for sym, p, chg in prices:
            arrow = "🟢▲" if chg >= 0 else "🔴▼"
            lines.append(f"{sym}  {_fmt_price(p)}  {arrow}{abs(chg):.2f}%")
        lines.append("")

    if fng:
        value, cls, prev = fng
        emoji, zh = FNG_ZH.get(cls, ("📉", cls))
        lines += [f"{emoji} 恐懼貪婪指數 {value}（{zh}）", ""]

    news = pick_news(articles, now)
    if news:
        lines.append("📰 今日重點")
        for i, a in enumerate(news):
            tag = "" if _is_chinese(a["title"]) else "（英文）"
            lines += [f"{NUM_EMOJI[i]} {a['title']}{tag}", f"🔗 {clean_link(a['link'])}"]
        lines.append("")

    lines.append(DISCLAIMER)
    return "\n".join(lines)


# ---------- 週六：冷知識＋投票 ----------

def build_saturday(articles, now):
    title, body = _rotate(FUN_FACTS, now)
    question, options = _rotate(POLLS, now)
    lines = _header("🎲", "週末冷知識", now)
    lines += [f"🤓 {title}", body, "", f"🗳️ {question}（留言回數字）"]
    lines += [f"{NUM_EMOJI[i]} {o}" for i, o in enumerate(options)]
    return "\n".join(lines)


# ---------- 週日：一週新聞回顧 ----------

def build_sunday(articles, now):
    """本週 3 件事：每個分類最多一則，只放標題，不放連結。"""
    week = load_week_articles(now) or articles
    order = ["Bitcoin", "資安事件", "監管政策", "Ethereum", "DeFi", "山寨幣", "加密市場"]
    picked = []
    for cat in order:
        news = pick_news([a for a in week if a.get("category") == cat], now,
                         max_age_hours=24 * 7, max_news=1)
        picked += news
        if len(picked) >= 3:
            break
    lines = _header("🗞️", f"本週幣圈 {len(picked)} 件事", now)
    for i, a in enumerate(picked):
        tag = "" if _is_chinese(a["title"]) else "（英文）"
        lines.append(f"{NUM_EMOJI[i]} {a['title']}{tag}")
    lines += ["", "💬 這週你最關注哪一則？"]
    return "\n".join(lines)


BUILDERS = {0: build_monday, 1: build_tuesday, 2: None, 3: build_thursday,
            4: build_friday, 5: build_saturday, 6: build_sunday}


def build_digest(articles, now=None):
    """依星期幾產生當天的貼文；週三回傳 None（不發）。"""
    now = now or datetime.now(TW)
    builder = BUILDERS[now.weekday()]
    return builder(articles, now) if builder else None


def save_digest(text, now=None, folder="line"):
    now = now or datetime.now(TW)
    os.makedirs(folder, exist_ok=True)
    for name in ("latest.txt", f"{now:%Y-%m-%d}.txt"):
        with open(os.path.join(folder, name), "w", encoding="utf-8") as f:
            f.write(text + "\n")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--day", type=int, choices=range(1, 8), help="預覽星期幾的主題（1=週一…7=週日）")
    args = parser.parse_args()

    now = datetime.now(TW)
    if args.day:
        now += timedelta(days=(args.day - 1 - now.weekday()) % 7)

    with open("crypto_news.json", encoding="utf-8") as f:
        articles = json.load(f)
    text = build_digest(articles, now)
    if text is None:
        print("週三不發（社群已有籌碼快報）。")
        return
    if not args.day:
        save_digest(text, now)
    print(text)


if __name__ == "__main__":
    main()
