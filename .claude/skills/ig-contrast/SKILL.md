---
name: ig-contrast
description: 製作 IG「對比型」寫實風景雙格圖文（一組 6 張、1080×1350 PNG，不畫人物），上格「普通人：……」對比下格「有錢人：……」這類兩種人／兩種習慣的差距。使用者輸入 /ig-contrast、說「有錢人和普通人那種圖」「做一組差距對比的圖」「高手和新手的差別」時使用。
---

# IG 對比型寫實風景雙格圖文

和 `/ig-scenery` 用同一套程式與場景工具（`ig-cards/render.js`、`scenes/photo.js` 等），差別在**文案是兩種人的對照**，不是「……時／那就……」。成品範例：`sets/rich-vs-ordinary.js`（場景在 `scenes/richpoor.js`）。

## 文案格式
- 標題：「A和B的6個差距」這類，盡量 ≤ 11 字（12 字還塞得下但會貼邊，超過就改短，例如「高手vs新手的差距」）。
- 上格：`<A>：<習慣>`，例如「普通人：花剩的錢才存」。
- 下格：`<B>：<習慣>`，例如「有錢人：存剩的錢才花」。
- 上下句盡量**同結構、可對照**（花剩才存 ↔ 存剩才花、看價格 ↔ 看價值），讓人一眼看出差別。
- 中文每句控制在約 16 字以內，英文約 60 字元以內，都要排得進一行。

常見組合（A ↔ B）：普通人 ↔ 有錢人、新手 ↔ 高手、窮忙的人 ↔ 有效率的人、一般交易者 ↔ 穩定獲利的交易者、焦慮的人 ↔ 從容的人。

## 寫法原則（從使用者回饋整理）
- 寫的是**習慣和做法**，不是人格；不要貶低 A，語氣是「這些習慣任何人都能開始」。
- 內容要讓人學得到東西、想收藏，不要悲觀或說教。
- 有名言出處（例如巴菲特「先存再花」）可以用，IG 文案裡提一下出處。
- 用繁體中文、台灣用語。
- 理財／交易類：不推薦特定標的、不保證報酬，IG 文案加「以上為理財觀念分享，不構成任何投資建議」。

## 英文翻譯（每次都要逐句校對）
- 主詞固定：A 用 "Most people"（比 "ordinary people" 自然），B 用 "The wealthy" / "Experts" / "Pros" 等對應詞。
- 不漏關鍵詞：例如「才開始」→ before starting、「願意等」→ are willing to wait、「回報」→ returns。
- 注意會誤讀的字：「留時間」用 set aside some time（save time 會被讀成節省時間）；「放空」用 zone out。
- 使用者問「翻譯對嗎」時，用表格列出：中文、原本、改成、原因。

## 場景
- 不畫人物；上格偏暗偏冷，下格偏亮偏暖，用同一個物件或地點的前後對比最好懂（空罐 → 長出小苗的硬幣罐、寒冬樹苗 → 大樹、停泊的船 → 揚帆）。
- 工具同 `/ig-scenery`（`phSky`、`phGlow`、`phClouds`、`phTree`、`ckWin`、`ckTable`、`ckCup`、`sdSapling`、`scHourglass` 等）。`scenes/richpoor.js` 另有 `rpJar`（玻璃罐）、`rpChair`（躺椅）、`rpBoat`（帆船，sail 傳 null 就是收帆）。
- 新場景檔用自己的 2 字母前綴（已用：ph、lo、tx、tp、ck、sc、nv、tm、sd、pm、rp），clip id 和 filter/gradient id 都要全域唯一。
- 大樹 `phTree` 的 scale 超過約 1.5 樹冠會被畫框切掉；窗外內容一律放在 `ckWin` 裡。

## 流程
1. 提案：表格列出標題和 6 組上下格（中文＋已校對英文＋一句場景描述），請使用者確認；說「直接做」就跳過。
2. 新場景寫進 `ig-cards/scenes/<主題>.js`，文案寫進 `ig-cards/sets/<主題英文名>.js`（格式照 `sets/rich-vs-ordinary.js`）。
3. `node ig-cards/render.js ig-cards/sets/<名稱>.js`，用 Read 看 `ig-cards/out/<名稱>/sheet.png`：檢查標題和字幕有沒有超出、物件有沒有被切掉或跑出框。有問題修好再輸出。
4. 用 SendUserFile（display: attach，方便存檔）傳 1.png–6.png，附 IG 文案：3–4 段短句，結尾用「我目前卡在第 X 個」這類第一人稱問句帶互動（不要用「留言告訴我 👇」這種罐頭句），加 5 個 hashtag；再建議一個 Threads 主題標籤。
5. commit 新的 scenes 和 sets 並 push。
