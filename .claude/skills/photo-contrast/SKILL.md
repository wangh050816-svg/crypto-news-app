---
name: photo-contrast
description: 製作 IG 實拍照片上下對比輪播貼文（Unsplash 照片＋英文大字＋中文副標，1080×1350）。使用者說「做一組對比照片貼文」「像有錢人跟普通人那種」「Unsplash 貼文」或輸入 /photo-contrast 時使用。
---

# IG 實拍照片上下對比貼文

程式在 `photo-cards/`：
- `render.js`：`node photo-cards/render.js photo-cards/posts/<名稱>.js`，輸出 `photo-cards/out/<名稱>/` 的 1.png–N.png、總覽 `sheet.png`、`caption.txt`（貼文文案）、`credits.txt`（攝影師名單；Unsplash 授權不強制標示，使用者想標再貼）。
- `posts/*.js`：一則貼文，格式照 `posts/rich-vs-most.js`。
- `posts/<名稱>.photos.json`：render 自動寫入選中的照片，要一起 commit，下次重跑不用再搜尋。

## 貼文格式
- 每張分上下兩格照片，上格是「A 這樣做」，下格是反差「但大多數人那樣做」。也可以是「真相 vs 迷思」（例如 `The average millionaire is 57.` / `Not 27.`）。
- 英文是主角：短、有節奏、句點結尾，上格約 3–6 個字，下格越短越好。中文副標是自然的繁體中文意譯，不是逐字翻譯，用台灣用語。
- 上格照片偏「理想、沉穩、亮」，下格偏「日常、疲累、暗」，對比要一眼看懂。
- 每格的 `q` 用英文寫具體畫面（人＋動作＋場景），例如 `man reading book by window`。照片不對就調 `pick`（0 起算的第幾張）或換 `q`。
- 最後一張可以用 `{text:{en,zh}}` 純黑底文字收尾，或 `{full:{q,en,zh}}` 整張照片。
- 有引用數據就必須是真的、可查證的，在 post 檔註解寫清楚來源。不推薦特定幣種，也不保證報酬。
- `author` 是右下角署名，使用者沒說就留空。
- 發 Threads（脆）時：語氣自然、不說教，常用「You think… / 其實…」這種溫和的反轉，不要有錢人對比，範例見 `posts/you-think.js`。貼文文案要有自己的思維，不是把圖上的字再說一次：用第一人稱寫一段約 100 字的想法，結構是「我以前以為… → 後來發現… → 把幾張圖串成一個觀點 → 現在我怎麼想」，短句分行、有具體的感受，避免雞湯口號和說教。不加 hashtag、不加 emoji，不用硬加結尾問句。
- 主題不限有錢人：自律 vs 拖延、長期 vs 短期、真相 vs 迷思、成功的樣子 vs 實際的樣子都可以。

## 額度
- 需要環境變數 `UNSPLASH_ACCESS_KEY`。Demo 金鑰每小時 50 次；每張新照片要 2 次（搜尋＋規定的 download 追蹤），所以一小時大約 20–24 格照片。
- 搜尋結果快取在 `out/<名稱>/search-cache.json`，同一個 q 換 pick 只花 1 次。
- 額度用完時，已選好的照片會先存進 `.photos.json`，下一小時再跑會接著抓。

## 流程
1. 使用者給主題（或沒給就自己挑一個），直接寫好整組文案（預設 6 張：5 組對比＋1 張收尾），不用先確認，除非使用者要求。
2. 新增 `posts/<英文名>.js`，執行 render.js，用 Read 看 `sheet.png`，再抽 1–2 張原圖看細節。檢查：照片內容有沒有符合字幕、字有沒有壓到臉、上下格氣氛有沒有對比。不對就調 `pick`、`q`、`bright`（預設 0.92）或 `crop`（imgix 參數，預設 `faces,entropy`），再輸出。
3. 用 SendUserFile 傳 1.png–N.png，並把 `caption.txt` 的內容直接貼在回覆裡。貼文文案：短句分行、有一個轉折、最後一個問題引導留言、5 個 hashtag。
4. 把 post 檔和 `.photos.json` commit 並 push。out/ 已經被 gitignore。
