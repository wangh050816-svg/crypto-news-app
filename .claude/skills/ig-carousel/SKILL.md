---
name: ig-carousel
description: 把一則幣圈新聞做成 IG 輪播圖（封面＋重點頁＋總結頁，1080×1350 PNG）。使用者貼新聞稿、說「做成 IG 輪播」「新聞懶人包」或輸入 /ig-carousel 時使用。
---

# IG 新聞輪播圖

程式在 `ig-carousel/`：
- `template.html`：版面樣式（深色底、紅色 accent、金色重點字）。
- `render.js`：`node ig-carousel/render.js ig-carousel/sets/<名稱>.js` 輸出到 `ig-carousel/out/<名稱>/`，包含 1.png–N.png 和總覽圖 sheet.png，內容溢出時會印出警告。
- `sets/*.js`：每組輪播的內容，格式照 `sets/binance-hack.js`。

## slide 類型
- `cover`：kicker（紅底標籤）、big（大數字）、title、sub。
- `point`：num（01/02…）、title、viz（選填，HTML/SVG 小圖卡：數字卡、關係圖、比例條）、body（可用 `<b>` 強調）。
- `end`：title、points（3 點重點）、ask（引導留言的問題）、askSub、note（免責聲明）。

## 流程
1. 使用者給的每個段落做成一張 point，前面加 cover，最後加 end。一張 body 控制在約 90 字內。
2. 每張 point 盡量配一個 viz，把文中的關鍵數字視覺化。
3. 執行 render.js，用 Read 看 sheet.png。檢查有沒有孤字（最後一行只剩 1–2 個字）、文字溢出、換行斷在怪的地方，有就修文案再輸出。
4. 用 SendUserFile 傳 1.png–N.png，附一段 IG 貼文文案：3–4 行，最後用一個問題引導留言，加 5 個 hashtag。
5. 用繁體中文和台灣用語。不推薦幣種、不給投資建議，end 頁保留免責聲明。
6. 新的 set commit 並 push。out/ 已被 gitignore。
