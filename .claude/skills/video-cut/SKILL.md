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
- `DECLICK = True`（最重要）：去掉滑鼠點擊、滾輪、打字聲。偵測用 6–12kHz：突然暴增超過 ±30ms 中位數 4 倍、6ms 內結束；間隔 <15ms 的規律脈衝串是人聲的聲帶脈衝，要跳過。只壓 2kHz 以上（-35dB，峰值前 4ms 到後 7ms），2kHz 以下不動，所以不傷人聲。降噪前清 3 次、降噪後再清 2 次。驗收：用同一個偵測器掃成品，剩下的峰值要跟人聲的高頻差不多。不要用 LPC 補洞（會吃掉人聲），也不要用 ffmpeg adeclick（對滑鼠聲沒用）。
- `MUSIC_VOL = 0`：使用者不要背景音樂。
- `DENOISE = True`、`HATS = 0`：人聲要降噪（RNNoise＋FFT 降噪，模型自動下載），背景音樂不要用白噪音做的鈸聲。
- `GAP = 0`、`TIGHT = True`：使用者不要講完話後停頓，句子要直接接下一句。TIGHT 會修掉每段頭尾的靜音；段落內部超過 0.5 秒的停頓也要切掉（用 RMS 掃描）。
- 原片裡跳出的廣告／通知（TradingView 左下角常有）要掃出來，用 `PATCHES` 拿彈出前的乾淨畫面蓋掉。偵測方式：抽那個角落的灰階畫面，和中位數相比差異很大的時間點就是。
- 每一章都要保留講者的「介紹／鋪陳」那幾句，不要從章節標題直接跳到結論。
- 使用者覺得真實紅綠 K 棒的片段多餘：只用手繪示意圖的段落。判斷方式：抽幾格算紅／綠像素比例，明顯高於示意圖段落的就是 K 棒畫面。
- 右鍵選單、彈窗也跟廣告一樣用 `PATCHES` 蓋掉。
- 結構：壓軸放「一買出現 → 市場可能迎來反彈」這類懸念句（使用者指定），慢推鏡＋一聲重音，直接接神秘片尾。壓軸的章節標籤不要寫「壓軸」兩個字。
- 合成音樂的每個音都要有起音（attack），不然會每拍爆一下；輸出後用二階差分掃一遍只有音樂的片段，確認沒有規律的爆音。
- 片尾：`END_CARD` 加上 `step`、`fade`、`out`、`boom=False`，文字一行一行慢慢浮現、保持神秘，最後淡到全黑，鼓停掉、音樂慢慢淡出。內容照週末直播預告：「纏道漫長 週末直播」、每週六、日 15:00-16:00、Discord、脆上分析師・小益 Yi，並預告下一集主題（第一類之後是第二類買賣點、再來第三類、區間套實戰案例）。關鍵字用金色 kwcolor=(232, 186, 110)。
- 鏡頭要穩（使用者偏好）：同一個場景的段落用同一個 zoom（起始倍率＝結束倍率），整支只留 1–2 個慢推鏡和 `boom`，不要用 `punch`。
- `WHOOSH_VOL = 0`（換章節不要翻頁音效），`SHAKE, FLASH = 6, 60`，`BOOM_VOL = .45`。
- 講師徽章 `BADGE`：`shorts/assets/xiaoyi-badge.png`（講師｜小益 Yi，已去背），寬 170、透明度 .92，固定右上角，開頭鉤子先不出現；片尾 `END_CARD` 加 `badge=270` 在最後放大浮現。
- 片尾文字可以用 `{discord}` 插入 `ICONS` 裡的圖示（`shorts/assets/discord.png`）。
- 片尾加 `FOOTER = '教學分享・非投資建議'`。不推薦特定幣種，也不保證報酬。
