---
name: ig-scenery
description: 製作 IG 寫實風景版雙格圖文（一組 6 張、1080×1350 PNG，不畫人物），主題偏心理、情緒、人際、交易心態這類讓人有共鳴的內容。使用者輸入 /ig-scenery、說「做一組風景版的圖」「像情緒崩潰前那種圖」「寫實風景那種」時使用。
---

# IG 寫實風景版雙格圖文

和 `/ig-cards` 用同一套程式（`ig-cards/render.js`、`template-head.html`），差別是**不畫小人**，上下格都用寫實風景或室內場景來比喻。成品範例：`sets/mood-check.js`、`sets/toxic-relationship.js`、`sets/life-lost.js`、`sets/trading-path.js`。

## 畫面規則
- 一組 6 張，黑底，最上方大標題（最多 11 個字，否則會超出寬度），每張上下兩格，畫布 960×470。
- **不畫人物**。用場景比喻情緒：上格偏暗、偏冷（夜晚、霧、雨、暴風），下格偏亮、偏暖（清晨、陽光、晴空、熱食）。
- 每句中文下面配英文，顏色已在 template 設定為淺藍色 #8fd0ff。
- 中文和英文都要排得進一行。下格中文最多約 18 字，英文最多約 60 個字元。

## 文案規則（從使用者回饋整理）
- 用繁體中文和台灣用語，語氣溫柔、不說教。目標是讓讀者覺得「這就是在說我」。
- 一組只講**一個主題**，6 張是同一主題下的不同生活情境（例如「其實沒人在盯著你」：6 個社交尷尬情境都在講聚光燈效應）。不要把 6 個不同概念混成一組，使用者會覺得很亂。
- 上格寫處境，用「……時」結尾。
- 下格有兩種寫法，依主題擇一，整組統一：
  1. **翻轉建議**：「那就……」開頭，「做」和「不做」交錯。建議要帶理由或比喻才有說服力，例如「那就別比，每朵花開的季節本來就不一樣」比「那就不比」好。
  2. **揭曉答案**：「可能只是……」開頭，用一點幽默把真相說出來，例如「覺得人生沒有意義時 → 可能只是昨晚沒睡飽」。不要寫成「那就先檢查：……嗎？」這種指令加問句的混合句。
- 上下格要有清楚的因果，不能跳一步。例如「想把人生想清楚」不能接「不用急著看到終點」。
- 主題不要預設是情侶。講人際關係時用「對方」，不要用「他」。
- 交易類：不推薦特定幣種，不保證報酬，IG 文案加一行「以上為交易心態分享，不構成任何投資建議」。
- 會碰到自我傷害、暴力的主題（人生沒意義、有毒關係），IG 文案最後要附求助資訊：1925 安心專線（24 小時）、113 保護專線。

## 英文翻譯檢查（每次都要做）
逐句對照中文，確認：
- 沒有漏掉中文的關鍵詞，例如「總是」「早就」「先」「昨晚」「比你」。
- 用道地說法，不要直譯。例如「手很癢」→ itching to trade；「別動」→ sit tight；「跟市場爭」→ fight the market。
- 避免讀者看不懂的術語或俚語（P&L 改 account balance，loser 改 losing trade）。
- 下格是「那就……」時，英文盡量用 Then 開頭或祈使句，和中文對齊。
- 有適合的英文慣用語可以用，例如 "history rhymes"、"2 a.m. talking"。
提案時先把英文校對好；使用者問「翻譯對嗎」時，用表格列出原文、修改、原因。

## 場景工具
`scenes/photo.js` 提供寫實風景用的共用工具（其他場景檔可以直接呼叫，因為所有 scenes 會串在同一個 script 裡）：
- `phSky(id, stops)` 漸層天空、`phGlow(id,x,y,r,color,op)` 光暈、`phClouds(id,rgb,op,freq,seed,y,h)` 雲霧（有指定 y/h 時上下自動淡出）
- `phRidge(seed,base,amp,rough)` 山稜線 path、`phCity(...)` 城市剪影和窗燈、`phTree(seed,x,y,scale,color)` 樹
- `phRain`、`phBlur(id,sd)`、`phGrain(id)` 顆粒感（每格最後都加）
其他可重用的：`loWaves`（海浪）、`loRoad`（有透視的 S 形公路）、`loRainbow`（lost.js）；`txBranch`/`txTips`（樹枝）、`txTracks`（鐵軌）、`txVase`（toxic.js）；`tpLighthouse`、`tpBuoy`、`tpFurrows`、`tpSprouts`、`tpIceLake`（tradepath.js）；`ckWin`（會自動裁切窗外內容）、`ckBed`、`ckTable`、`ckCup`、`ckFloor`、`ckChair`（check.js）。

注意：
- 每個場景檔用自己的 2 字母前綴命名 helper、場景 key、`clip()` id 和所有 filter/gradient id，確保全域唯一（已用：ph、lo、tx、tp、ck、sc、nv、tm）。
- 窗外的城市、樹一定要放在 `ckWin` 裡，不然會畫到窗框外面。
- `phCity` 的大樓會往下延伸，畫在水面或地面上方時要用 clipPath 裁到地平線。
- 裂痕、浪花這類細節要注意透視（例如冰面裂痕要壓扁、限制在冰面範圍內），不然會像樹或浮在空中。

## 流程
1. 先提案：表格列出標題和 6 組文案（上下格中文、已校對的英文、一句場景描述），請使用者確認。使用者說「直接做」就跳過確認。
2. 新場景寫進 `ig-cards/scenes/<主題>.js`，文案寫進 `ig-cards/sets/<主題英文名>.js`，格式照 `sets/mood-check.js`。
3. 執行 `node ig-cards/render.js ig-cards/sets/<名稱>.js`，用 Read 看 `ig-cards/out/<名稱>/sheet.png`。檢查：文字是否超出一行、物件是否跑出框（窗外、地平線）、透視是否怪、上下格冷暖是否分明。有問題就修好再輸出一次。
4. 用 SendUserFile 傳 1.png–6.png，附一段 IG 貼文文案：3–4 段短句，像在跟讀者說話，最後用一個問題引導留言，加 5 個 hashtag（需要時加免責聲明或求助資訊）。
5. commit 新的 scenes 和 sets 並 push。out/ 已 gitignore。
