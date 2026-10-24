# 動畫

- `btc-black-swan/`：2025.10.10 黑天鵝（川普宣布對中國加徵 100% 關稅）BTC 大陰線砸穿 $110,000 鐵底，24 秒直式 1080×1920。直接用瀏覽器打開 `index.html` 就能播放（可暫停、拖時間軸、開音效）。

匯出含音效的 MP4：`node animations/render.js btc-black-swan` → `animations/out/btc-black-swan.mp4`
只截幾格檢查：`node animations/render.js btc-black-swan --frames 9.8,10.5,14`
