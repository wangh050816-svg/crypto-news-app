import feedparser
import json
import os
import re
import requests

crypto_rss_urls = {
    "動區動趨 BlockTempo": "https://www.blocktempo.com/feed/",
    "鏈新聞 ABMedia": "https://www.abmedia.io/feed",
    "CoinDesk": "https://www.coindesk.com/arc/outboundfeeds/rss/",
    "CoinTelegraph": "https://cointelegraph.com/rss"
}

# 純英文/數字關鍵字用完整單字邊界比對，避免 "ai" 誤中 chain/remain/gain 之類的字
CATEGORY_KEYWORDS = {
    "Bitcoin": ["bitcoin", "btc", "比特幣"],
    "Ethereum": ["ethereum", "eth", "以太坊"],
    "DeFi": ["defi", "去中心化金融", "uniswap"],
    "AI": ["ai", "人工智慧", "海力士", "nvidia", "輝達", "晶片"],
}

TELEGRAM_MAX_LEN = 4000  # Telegram 單則訊息上限 4096，留一點緩衝


def _keyword_matches(keyword, text_lower):
    if re.fullmatch(r"[a-z0-9]+", keyword):
        return re.search(r"\b" + re.escape(keyword) + r"\b", text_lower) is not None
    return keyword in text_lower


def classify_text(title, summary):
    text = (title + " " + summary).lower()
    for category, keywords in CATEGORY_KEYWORDS.items():
        if any(_keyword_matches(k, text) for k in keywords):
            return category
    return "非加密貨幣"


def fetch_articles():
    all_articles = []
    for source, url in crypto_rss_urls.items():
        feed = feedparser.parse(url)
        for entry in feed.entries[:5]:
            summary = getattr(entry, "summary", "")
            category = classify_text(entry.title, summary)
            all_articles.append({
                "source": source,
                "title": entry.title,
                "link": entry.link,
                "published": getattr(entry, "published", "最新發布"),
                "summary": summary[:120] + "...",
                "category": category
            })
    return all_articles


def _chunk_message_lines(lines, max_len=TELEGRAM_MAX_LEN):
    chunks = []
    current = ""
    for line in lines:
        piece = line + "\n\n"
        if len(current) + len(piece) > max_len and current:
            chunks.append(current)
            current = piece
        else:
            current += piece
    if current:
        chunks.append(current)
    return chunks


def send_telegram_message(news_list):
    bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")

    if not bot_token or not chat_id:
        print("未偵測到 Telegram 設定，跳過發送通知。")
        return

    if not news_list:
        print("新聞列表為空，不發送通知。")
        return

    lines = [f"<b>📢 今日加密貨幣焦點新聞（共 {len(news_list)} 篇）</b>"]
    for item in news_list:
        title = item.get("title", "無標題")
        link = item.get("link", "#")
        category = item.get("category", "")
        lines.append(f"[{category}] <a href='{link}'>{title}</a>")

    telegram_url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    for chunk in _chunk_message_lines(lines):
        payload = {
            "chat_id": chat_id,
            "text": chunk,
            "parse_mode": "HTML",
            "disable_web_page_preview": False
        }
        response = requests.post(telegram_url, json=payload)
        if response.status_code == 200:
            print("Telegram 訊息發送成功！")
        else:
            print(f"Telegram 發送失敗，狀態碼: {response.status_code}, 錯誤訊息: {response.text}")


def main():
    all_articles = fetch_articles()

    with open("crypto_news.json", "w", encoding="utf-8") as f:
        json.dump(all_articles, f, ensure_ascii=False, indent=2)
    print("新聞資料擷取與分類完成！")

    send_telegram_message(all_articles)


if __name__ == "__main__":
    main()
