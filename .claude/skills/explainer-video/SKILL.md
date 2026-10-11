---
name: explainer-video
description: 製作黑底極簡知識動畫短影片（1920×1080 mp4，大數字、點陣、曲線、線條小角色「小幣」、逐字中英字幕）。使用者說「做一支 ___ 的影片」「知識動畫」「像那種 vibe 知識影片」或輸入 /explainer-video 時使用。
---

# 知識動畫短影片

程式在 `explainer/`，範例：`videos/discipline.js`（有配音、音效、音樂，新影片照這支寫）、`videos/compound.js`（舊版無聲）。先讀 engine.js、README 和 discipline.js 再動手。

聲音：先跑 `explainer/audio/setup-voice.sh`（離線中文語音，線上 TTS 被網路政策擋）。旁白寫在場景的 `caps`，數字要在 `say` 裡寫成中文念法（百分之五十），否則可能念錯。

## 風格規則
- 黑底 #0d0c0e，線條白，重點黃 #f5b83d、負面紅 #e8423f，英文灰。
- 一個概念用一個大視覺講：刻度環、點陣（一格＝一次/一天）、跳動的大數字、畫出來的曲線。
- 字幕在底部，中文逐字打出，英文一行小字。每句只講一件事。繁體中文、台灣用語。
- 結構：鉤子（反直覺的數字）→ 角色登場 → 過程（數字跑起來）→ 對比/反轉 → 片尾大標題＋英文副標。總長 25–40 秒，每場景 4–7 秒。
- 不推薦特定幣種，不保證報酬。數字要算對（在程式裡用 Math 算，不要手寫）。

## 流程
1. 先列出場景表（每場景：秒數、畫面、中英字幕）給使用者確認；說「直接做」就跳過。
2. 新增 `explainer/videos/<英文名>.js`，可以共用 engine.js 的工具；需要的新工具加進 engine.js。
3. `node explainer/render.js explainer/videos/<名>.js --preview`，用 Read 看 `explainer/out/<名>-sheet.png`，檢查重疊、出界、字幕被擋。修好再跑完整版。
4. 用 SendUserFile 傳 mp4，附上抖音/IG 文案（3 行＋5 個 hashtag）。
5. out/ 已 gitignore；新的影片腳本 commit 起來。
