# 知識動畫短影片

黑底、線條小角色、大數字、逐字字幕（中文＋一行英文）的知識類短影片，全部用程式產生。

```
node explainer/render.js explainer/videos/compound.js            # 輸出 out/compound.mp4 + 總覽圖
node explainer/render.js explainer/videos/compound.js --preview  # 只出總覽圖，快速檢查版面
```

- `engine.js`：時間軸、字幕 `cap()`、文字 `txt()`、角色 `coin()`、緩動 `ease`、進度 `prog()`。
- `videos/*.js`：一支影片 = `VIDEO({scenes:[{dur, draw(lt){...}}]})`，`lt` 是該場景內的秒數。
- 字幕標記：`{y:黃字}`、`{r:紅字}`。
