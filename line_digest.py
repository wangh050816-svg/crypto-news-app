"""產生可以直接貼到 LINE 社群（OpenChat）的每日幣圈早報。

LINE 社群沒有開放機器人發文 API，所以這支程式只負責「整理好文字」：
- 寫進 line/latest.txt 和 line/YYYY-MM-DD.txt
- 由 fetch_news.py 一併推到 Telegram，手機上長按複製、貼進 LINE 社群即可

單獨執行：python line_digest.py（讀現有的 crypto_news.json）
"""
import html
import json
import os
import re
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime

import requests

TW = timezone(timedelta(hours=8))
WEEKDAYS = "一二三四五六日"

COINS = [  # (CoinGecko id, 顯示代號)
    ("bitcoin", "BTC"),
    ("ethereum", "ETH"),
    ("solana", "SOL"),
    ("binancecoin", "BNB"),
    ("ripple", "XRP"),
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

MAX_NEWS = 8          # 一則 LINE 訊息不要太長，8 則剛好一個手機畫面多一點
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


def _is_chinese(s):
    return re.search(r"[一-鿿]", s) is not None


def _parse_time(s):
    try:
        dt = parsedate_to_datetime(s)
        return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)
    except (TypeError, ValueError):
        return None


def pick_news(articles, now):
    """挑出要放進早報的新聞：只要加密相關、近期、去重，中文來源優先。"""
    candidates = []
    for a in articles:
        if a.get("category") == "非加密貨幣":
            continue
        t = _parse_time(a.get("published", ""))
        if t and now - t > timedelta(hours=MAX_AGE_HOURS):
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
        if len(picked) >= MAX_NEWS:
            break
    return picked


def build_digest(articles, now=None, prices=None, fng=None):
    now = now or datetime.now(TW)
    prices = fetch_prices() if prices is None else prices
    fng = fetch_fear_greed() if fng is None else fng

    lines = [f"📊 幣圈早報｜{now:%m/%d}（{WEEKDAYS[now.weekday()]}）", ""]

    if prices:
        lines.append("💰 主流幣行情（24h）")
        for sym, p, chg in prices:
            arrow = "🟢▲" if chg >= 0 else "🔴▼"
            lines.append(f"{sym}  {_fmt_price(p)}  {arrow}{abs(chg):.2f}%")
        lines.append("")

    if fng:
        value, cls, prev = fng
        emoji, zh = FNG_ZH.get(cls, ("📉", cls))
        diff = value - prev
        trend = f"（昨日 {prev}，{'+' if diff >= 0 else ''}{diff}）"
        lines += [f"{emoji} 恐懼貪婪指數：{value}｜{zh}{trend}", ""]

    news = pick_news(articles, now)
    if news:
        lines.append("📰 今日重點新聞")
        for i, a in enumerate(news):
            label = CATEGORY_LABEL.get(a.get("category"), "📌 其他")
            tag = "" if _is_chinese(a["title"]) else "（英文）"
            lines.append("")
            lines.append(f"{NUM_EMOJI[i]} 【{label}】{a['title']}{tag}")
            summary = clean_summary(a.get("summary", ""))
            if summary and _is_chinese(summary):
                lines.append(f"　└ {summary}")
            lines.append(f"🔗 {a['link']}")
        lines.append("")

    lines += [
        "━━━━━━━━━━",
        "💬 今天你怎麼看？歡迎留言討論",
        "⚠️ 以上資訊整理自公開新聞，僅供參考，不構成投資建議，請自行評估風險。",
    ]
    return "\n".join(lines)


def save_digest(text, now=None, folder="line"):
    now = now or datetime.now(TW)
    os.makedirs(folder, exist_ok=True)
    for name in ("latest.txt", f"{now:%Y-%m-%d}.txt"):
        with open(os.path.join(folder, name), "w", encoding="utf-8") as f:
            f.write(text + "\n")


def main():
    with open("crypto_news.json", encoding="utf-8") as f:
        articles = json.load(f)
    text = build_digest(articles)
    save_digest(text)
    print(text)


if __name__ == "__main__":
    main()
