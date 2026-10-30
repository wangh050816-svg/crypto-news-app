---
name: video-cut
description: 把一支教學錄影（例如 TradingView 畫圖講解）剪成精華毛片：自動挑段、白色字幕、推鏡、音效和背景音樂。使用者說「剪成毛片」「剪精華」「做成短影音」「給你一支影片」或輸入 /video-cut 時使用。
---

# 教學錄影 → 精華毛片

程式在 `shorts/`：
- `build.py`：`python3 shorts/build.py shorts/projects/<名稱>.py`，輸出 `shorts/out/<名稱>/final.mp4`、`cover.png`、`caption.txt`。
- `projects/*.py`：一支片的設定，格式照 `projects/chan-buy1.py`。
- 原片放在 `shorts/src/`（已 gitignore，不 commit 影片）。

## 流程
1. 拿到影片：檔案超過 30MB 不能直接附加，請使用者給 Google Drive 分享連結。用
   `curl -L -o shorts/src/<名稱>.mp4 "https://drive.usercontent.google.com/download?id=<檔案ID>&export=download&confirm=t"` 下載。
2. 轉逐字稿：`pip install faster-whisper`，用 `medium` 模型、`language="zh"`、`word_timestamps=True`。
   faster-whisper 的 `av` 版本可能不相容，要先用 ffmpeg 轉成 16k 的 wav，再把 numpy 陣列傳進去，不要直接傳檔名。
3. 抽幾格畫面（ffmpeg `tile`）看圖表區在哪裡，決定 `CROP` / `CROP_LANDSCAPE`，寬高都要是偶數。
4. 挑段落寫進 `CLIPS`：先放一句鉤子（最痛的那句話），再照章節排。每段寫 `s`、`e`（原片秒數，程式會自動對齊到最安靜的地方）、`chapter`、`caps`（字幕時間＋文字）、`zoom`（起始倍率、結束倍率、中心點 x、y 比例），以及可選的 `boom`（衝擊音效＋白閃）和 `punch`（快速推鏡）。
5. 字幕要人工校正 Whisper 的錯字，例如「低類→第一類」「長頓→纏論」「半山藥→半山腰」「超率→抄底」「MSE→MACD」。
6. 執行 build.py，抽格檢查字幕有沒有缺字、有沒有擋到重點，然後用 SendUserFile 傳 final.mp4。
7. 新的 project 檔 commit 並 push。

## 預設
- `LAYOUT = 'landscape'`：1920×1080，給 YouTube 用。不設就是直式 1080×1920（Shorts / Reels）。
- `CAPTION_STYLE = 'plain'`：普通白色字幕（使用者偏好）。不設就是大字跳動、關鍵字變黃。
- `SPEED = 1.0`：使用者要原速，不要加速。
- `GAP = 0.45`：每段講完留空檔，節奏不要太趕。
- 鏡頭要穩（使用者偏好）：同一個場景的段落用同一個 zoom（起始倍率＝結束倍率），整支只留 1–2 個慢推鏡和 `boom`，不要用 `punch`。
- `WHOOSH_VOL = 0`（換章節不要翻頁音效），`SHAKE, FLASH = 6, 60`，`BOOM_VOL = .45`。
- 片尾加 `FOOTER = '教學分享・非投資建議'`。不推薦特定幣種，也不保證報酬。
