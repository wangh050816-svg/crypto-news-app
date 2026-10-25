# 更新 index.html 裡的月線資料（到今天為止）
# 用法：python3 animations/btc-history/update_data.py
# 來源：2011.09 起用 Bitstamp 日線 OHLC，更早用 blockchain.com 每日均價
import json, re, time, datetime as D, urllib.request
from pathlib import Path

HTML = Path(__file__).with_name('index.html')
get = lambda u: json.load(urllib.request.urlopen(u, timeout=60))
M = {}

def add(d, o, h, l, c):
    k = (d.year, d.month)
    if k not in M: M[k] = [o, h, l, c]
    else: m = M[k]; m[1] = max(m[1], h); m[2] = min(m[2], l); m[3] = c

prev = None
for x in get('https://api.blockchain.info/charts/market-price?timespan=all&format=json&sampled=false')['values']:
    d = D.datetime.fromtimestamp(x['x'], D.UTC).date(); y = x['y']
    if y <= 0 or d >= D.date(2011, 9, 1): continue
    o = prev or y; add(d, o, max(o, y), min(o, y), y); prev = y

start = 1314835200  # 2011-09-01
while True:
    rows = get(f'https://www.bitstamp.net/api/v2/ohlc/btcusd/?step=86400&limit=1000&start={start}')['data']['ohlc']
    rows = [r for r in rows if int(r['timestamp']) >= start]
    if not rows: break
    for r in rows:
        add(D.datetime.fromtimestamp(int(r['timestamp']), D.UTC).date(), *[float(r[k]) for k in ('open', 'high', 'low', 'close')])
    start = int(rows[-1]['timestamp']) + 86400
    if len(rows) < 1000: break
    time.sleep(.5)

ks = sorted(M)
for a, b in zip(ks, ks[1:]): M[b][0] = M[a][3]          # 開盤接上個月收盤
M[(2011, 6)][1] = 31.91                                  # Mt.Gox 泡沫頂（均價資料抓不到盤中高點）
M[(2011, 11)][1] = max(M[(2011, 11)][0], M[(2011, 11)][3]) * 1.15  # Bitstamp 開站初期的異常高點

sig = lambda v: float(f'{v:.5g}')
data = json.dumps([[y, m] + [sig(v) for v in M[(y, m)]] for y, m in ks], separators=(',', ':'))
today = D.date.today().strftime('%Y.%m.%d')
s = HTML.read_text()
s = re.sub(r'/\*DATA\*/.*?/\*END\*/', lambda _: f'/*DATA*/{data}/*END*/', s, flags=re.S)
s = re.sub(r"const TODAY='[^']*'", f"const TODAY='{today}'", s)
HTML.write_text(s)
print(f'{len(ks)} 個月，{ks[0]} → {ks[-1]}，最新收盤 ${M[ks[-1]][3]:,.0f}')
