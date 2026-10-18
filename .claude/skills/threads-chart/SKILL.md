---
name: threads-chart
description: 製作 Threads 風格的「一句洞見＋一張圖」貼文（數據圖或插畫，PNG＋短文案）。使用者說「做一則 Threads」「數據圖貼文」「像那種一句話配圖表的」或輸入 /threads-chart 時使用。
---

# Threads 一句洞見＋數據圖

程式在 `threads-cards/`：
- `render.js`：`node threads-cards/render.js threads-cards/posts/<名稱>.js`，輸出 `threads-cards/out/<名稱>/card.png` 和 `caption.txt`。
- `posts/*.js`：一則貼文的設定，格式照 `posts/btc-supply.js`。

## 貼文格式
- 文案只有 1–2 句，講一個反直覺的發現，句型像「人們會把 A 過度放大；也會把 B 過度低估。」不加 hashtag、不加 emoji、不問問題。
- 圖不一定是數據圖，也不要模仿別人的圖：可以是插畫、隱喻、對比圖。插畫用 `draw:T=>'<svg 內容>'`，可設 `width/height`，範例見 `posts/hold-on.js`（米色 `paper` 配色、手寫字 class 自己定義）。
- 用數據圖的時候：兩條線對比（「理想／直覺」vs「實際」），中間的落差用 `between` 上色。一條用 `color:'light', dashed:true`。
- 圖上用英文，標題 3–5 個字（像 `X vs. Y`），2 句短註解，關鍵數字用 `*星號*` 包起來會變成強調色。
- 左下是作者（預設 @zqqnc），右下寫資料來源。
- 配色：`wine`（預設，酒紅）、`navy`、`forest`、`ink`、`paper`（米色紙感，適合插畫）。
- 數據必須是真的、可查證的，在 post 檔註解寫清楚來源和算法。不推薦特定幣種，也不保證報酬。

## 流程
1. 提出 2–3 個題目（一句文案＋圖表要畫什麼＋資料來源），請使用者選。使用者說「直接做」就跳過。
2. 新增 `posts/<英文名>.js`，執行 render.js，用 Read 看 card.png。檢查字有沒有壓到線、標籤有沒有疊在一起，有就調 `at` 座標再輸出。
3. 用 SendUserFile 傳 card.png，並把文案直接貼在回覆裡方便複製。
4. 把新的 post 檔 commit 並 push。out/ 已經被 gitignore。
