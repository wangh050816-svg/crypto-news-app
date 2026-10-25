# 動畫

- `btc-black-swan/`：2025.10.10 黑天鵝（川普宣布對中國加徵 100% 關稅）BTC 大陰線砸穿 $110,000 鐵底，24 秒直式 1080×1920。直接用瀏覽器打開 `index.html` 就能播放（可暫停、拖時間軸、開音效）。

匯出含音效的 MP4：`node animations/render.js btc-black-swan` → `animations/out/btc-black-swan.mp4`
只截幾格檢查：`node animations/render.js btc-black-swan --frames 9.8,10.5,14`

- `btc-history/`：BTC 全歷史大波動，從 2009 創世區塊、披薩節一路到今天。33 個大事件，每一次都是一根 K 棒砸穿地板或衝破天花板，結尾拉遠看完整 17 年。約 1 分 55 秒，配 128 BPM 合成電音，每次撞擊都落在拍點上。
  - 更新到最新資料：`python3 animations/btc-history/update_data.py`（Bitstamp 月線＋早期 blockchain.com 均價）
  - 匯出影片：`node animations/render.js btc-history`
