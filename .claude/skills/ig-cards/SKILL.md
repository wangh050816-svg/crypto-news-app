---
name: ig-cards
description: 製作 IG 雙格對比卡通圖文（一組 6 張、1080×1350 PNG）。使用者說「做一組 ___ 的圖」「IG 製圖」「再做一組」或輸入 /ig-cards 時使用。
---

# IG 雙格對比卡通圖文

程式都在 `ig-cards/`：
- `engine.js`：共用畫圖工具。`char()` 畫人物（表情：happy、smile、worried、sad、tired、sleep、determined、pout、neutral；姿勢：down、chin、wave、hold、cross、umbrella、scratch、desk、write、chinboth；選項：look、sweat、dark、shirt、legs、headAfter），另外還有 `bubble()`、`win()`、`monitor()`、`desk()`、`mug()`、`coin()`、`rain()`、`zzz()`、`clip()`。
- `scenes/*.js`：場景庫。每個場景是 `S.<key>Top` 和 `S.<key>Bot` 兩個函式，畫布是 960×470。
- `sets/*.js`：一組圖的標題和 6 張文案。
- `render.js`：用 `node ig-cards/render.js ig-cards/sets/<名稱>.js` 輸出到 `ig-cards/out/<名稱>/`，包含 1.png–6.png 和總覽圖 sheet.png。

## 格式規則
- 一組 6 張，黑底，最上方是大標題，每張分上下兩格插畫。
- 上格字幕寫一個糾結或處境，用「……時」結尾；下格寫翻轉後的建議，用「那就……」開頭。
- 每句中文下面配簡短的英文翻譯，顏色是淺藍色 #8fd0ff（template-head.html 已經設定好），不要用黃色。
- 一組裡「做」和「不做」的建議要交錯出現。
- 用繁體中文和台灣用語。文案要有內涵、不說教。不推薦特定幣種，也不保證報酬。
- 上格的場景偏暗、偏冷，下格偏亮、偏暖。

## 流程
1. 先列出 6 組文案（上下格的中英文，加一句場景描述），請使用者確認。使用者說「直接做」就跳過確認。
2. 能沿用的場景就直接用。需要新場景時，寫進對應主題的 `scenes/<主題>.js`，沒有適合的檔案就開一個新的。場景 key 不能和現有的重複，`clip()` 的 id 也必須全域唯一。
3. 新增 `sets/<主題英文名>.js`，格式照 `sets/crypto-survival.js`。
4. 執行 render.js，用 Read 看 `sheet.png`。檢查有沒有東西擋到臉、文字和圖案重疊、人物被桌子或畫框切掉。有問題就修好，再輸出一次。
5. 用 SendUserFile 把 1.png–6.png 傳給使用者，再附一段 IG 貼文文案：3–4 行，最後用一個問題引導留言，加 5 個 hashtag。
6. 新的 scenes 和 sets commit 起來並 push，這樣下次的 session 也能用。out/ 已經被 gitignore，不會 commit 圖片。
