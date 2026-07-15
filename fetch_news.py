import feedparser
import json
import os
import re

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

def main():
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

    with open("crypto_news.json", "w", encoding="utf-8") as f:
        json.dump(all_articles, f, ensure_ascii=False, indent=2)
    print("新聞資料擷取與分類完成！")

if __name__ == "__main__":
    main()
