---
name: news-infographic
description: 幫 @zqqnc 的 Threads 文章做中文新聞資訊圖（16:9、黑橘配色、低透明度情境背景）。使用者貼上文章、說「作圖」「配一張圖」「做資訊圖」時使用。
---

# 新聞資訊圖（@zqqnc 定稿規格，2026/11/11 確認）

使用者貼上一篇 Threads 文章，你就做一張搭配的中文資訊圖。

## 固定規格
- 尺寸 1600×900（16:9），theme 用 `ink`（深色底＋橘色重點）。使用者已確認維持這個配色。
- 圖上文字全部用繁體中文。
- 左下、右下都不放字：footer 寫 `['','']`。圖上不放資料來源、不放帳號。
- 標題放大：`titleSize:58, titleY:100`。
- 字要大，因為脆的動態牆在手機上只顯示約 400px 寬，很多人不會點開：
  - 小字至少 29px，重點數字 60px，時間軸數值 44px，重點句 42px。
  - 做完用 PIL 把圖縮成 420px 寬自己看一次，重點要看得清楚。
- 重點字用橘色（`T.fg`）加粗，其他維持白色；不要整張都是橘色。
- 背景放一張和主題相關的情境照片，透明度 0.2（例：台灣法規用台北夜景 `threads-cards/assets/taipei-night.jpg`）。
  - 只用 Wikimedia Commons 或 Openverse 上 CC0、CC BY、CC BY-SA 的照片，下載存到 `threads-cards/assets/`。
  - 圖上不放授權字。交付時把「背景照片：作者 / 授權」這行字給使用者，請他貼在留言或內文最後。

## 內容規則
- 圖上的每個數字都要對得上使用者的文章，而且要上網查證：至少兩個獨立來源，或一份官方文件。查不到第二來源的數字不要放。
- 用詞要精確、不能讓人誤讀：
  - 法律用語照法條，例如「未經許可經營」「有期徒刑」「依金管會預告草案」。
  - 期限要寫起算點，例如「以下期限均自專法施行日起算」。
  - 用明確年份，例如「2027 Q1」，不要寫「明年」。
  - 避免有歧義的短語，例如「反洗錢之外」會被讀成「反洗錢除外」，要寫「不只反洗錢」。
- 重要的但書不能刪，例如「實際上路日期以行政院公告為準」。

## 怎麼做
1. 在 `threads-cards/posts/` 新增 `<英文名>.js`。可以參考：
   - 時間軸＋三格重點：`posts/tw-vasp-act-v2.js`
   - 長條圖＋三格重點：`posts/lib-barcard.js`（例 `posts/softbank-q2-1110.js`）
   - 折線圖：`posts/eth-vs-btc-1111.js`、`posts/btc-strategy-cost-zh.js`
   - 價格資料可以用 CoinGecko API。
2. 執行 `node threads-cards/render.js threads-cards/posts/<名稱>.js`，輸出到 `threads-cards/out/<名稱>/card.png`。
3. 用 Read 看圖，確認字沒有重疊、沒有超出邊框；再看一次縮小成 420px 的版本。
4. 用 SendUserFile 傳 card.png 給使用者，列出圖上每個數字的出處，以及背景照片的授權文字。
5. 使用者要改字、改大小、改顏色，直接改 post 檔重出，不用重做整張。
6. post 檔和新增的背景照片 commit 並 push 到目前的開發分支（`out/` 已 gitignore）。
