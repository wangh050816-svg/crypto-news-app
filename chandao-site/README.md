# 纏道漫長 情報台

Artifact 網址：https://claude.ai/artifact/VCicWmhZryPqVLA136S8aN

- `index.html`：網站原始檔。資料存在 Artifact 的資料庫（posts / events / briefs），同時把最新一份快照嵌在頁面裡，讓沒登入 Claude 的人也看得到。
- `build_snapshot.py`：把 ArtifactData `list`（out_dir）匯出的 JSON 寫進頁面的快照區塊。

更新流程：寫入資料庫 → 用 ArtifactData list 匯出 posts、events、briefs 到新的資料夾 → `python3 chandao-site/build_snapshot.py <資料夾> chandao-site/index.html` → 用 Artifact 工具以同一網址重新發布。
