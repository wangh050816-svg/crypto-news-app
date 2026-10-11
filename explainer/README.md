# 知識動畫短影片

黑底、線條小角色、大數字、逐字字幕（中文＋一行英文）的知識類短影片，全部用程式產生。

```
node explainer/render.js explainer/videos/compound.js            # 輸出 out/compound.mp4 + 總覽圖
node explainer/render.js explainer/videos/compound.js --preview  # 只出總覽圖，快速檢查版面
```

- `engine.js`：時間軸、字幕 `cap()`、文字 `txt()`、角色 `coin()`、緩動 `ease`、進度 `prog()`。
- `videos/*.js`：一支影片 = `VIDEO({scenes:[{dur, draw(lt){...}}]})`，`lt` 是該場景內的秒數。
- 聲音：場景寫 `caps:[{zh,en,say?}]`，會自動配上中文旁白（離線語音 zhtts），字幕跟著旁白逐字出現，場景長度依旁白自動拉長；`sfx(cue)` 回傳 `[[秒,'tick'|'pop'|'ding'|'down'|'thud'|'error'|'rise'|'whoosh',音量]]`；背景音樂由 `audio/mix.py` 合成，`VIDEO({music:{chords,bpm}})` 可調。第一次用先跑 `explainer/audio/setup-voice.sh`，不要聲音加 `--mute`。
- 字幕標記：`{y:黃字}`、`{r:紅字}`。
