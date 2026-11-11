# 產生情報台「TG 新聞機器人題材」資料
# 用法：python3 make_feed.py <輸出 json> [posts 匯出資料夾]
# 來源：origin/main 的 crypto_news.json（TG 機器人）＋直接讀 RSS（動區、CoinDesk、CoinTelegraph）
import json, os, sys, glob, subprocess, datetime, email.utils, re, urllib.request
import xml.etree.ElementTree as ET

FEEDS = {
    "動區動趨 BlockTempo": "https://www.blocktempo.com/feed/",
    "CoinDesk": "https://www.coindesk.com/arc/outboundfeeds/rss/",
    "CoinTelegraph": "https://cointelegraph.com/rss",
}
PER_SOURCE = 20

def iso(pub):
    try:
        return email.utils.parsedate_to_datetime(pub).astimezone(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    except Exception:
        return None

def rss(source, url):
    req = urllib.request.Request(url, headers={"User-Agent": "chandao-feed/1.0"})
    root = ET.fromstring(urllib.request.urlopen(req, timeout=25).read())
    out = []
    for it in list(root.iter('item'))[:PER_SOURCE]:
        link = (it.findtext('link') or '').split('?utm_')[0]
        out.append({"source": source, "title": (it.findtext('title') or '').strip(), "link": link,
                    "published": it.findtext('pubDate') or '', "publishedAt": iso(it.findtext('pubDate') or '')})
    return out

items, missing = [], []
for src, url in FEEDS.items():
    try:
        items += rss(src, url)
    except Exception as e:
        missing.append(src)
try:
    bot = json.loads(subprocess.run(['git', 'show', 'origin/main:crypto_news.json'], capture_output=True, text=True, check=True).stdout)
    for x in bot:
        items.append({"source": x.get('source', ''), "title": x.get('title', ''), "link": (x.get('link') or '').split('?utm_')[0],
                      "published": x.get('published', ''), "publishedAt": iso(x.get('published', '')), "category": x.get('category', '')})
    if not any('鏈新聞' in x.get('source', '') for x in bot):
        missing.append('鏈新聞 ABMedia（機器人也抓不到）')
except Exception:
    missing.append('TG 機器人檔案')

# 同一連結只留一筆，保留分類
seen = {}
for x in items:
    k = x['link'] or x['title']
    if k in seen:
        if x.get('category') and not seen[k].get('category'):
            seen[k]['category'] = x['category']
        continue
    seen[k] = x
items = sorted(seen.values(), key=lambda x: x.get('publishedAt') or '', reverse=True)

# 標記已經寫成文章的題材（文章來源連結相同）
if len(sys.argv) > 2:
    used = set()
    for f in glob.glob(os.path.join(sys.argv[2], '*.json')):
        for s in json.load(open(f)).get('sources', []):
            used.add((s.get('url') or '').split('?utm_')[0])
    for x in items:
        if x['link'] in used:
            x['used'] = True

doc = {"updatedAt": datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'), "items": items[:60], "missing": missing}
json.dump(doc, open(sys.argv[1], 'w'), ensure_ascii=False)
print(len(doc['items']), 'items; missing:', missing)
