# 纏道漫長 情報台（V2.1）

Artifact：https://claude.ai/artifact/VCicWmhZryPqVLA136S8aN

- `index.html`：網站原始檔。資料存在 Artifact 資料庫，另外把最新快照嵌在頁面裡，讓沒登入 Claude 的人也看得到。
- `build_snapshot.py`：把 ArtifactData `list`（out_dir）匯出的每個集合寫進頁面快照（briefs 只取最新一份）。
- `test_page.js`：Playwright 測試，分別測公開模式與登入模式（用記憶體假資料庫）。

## 資料集合
| 集合 | 用途 |
|---|---|
| posts | 文章。status：待審／已審核／已發布／需要更新；verify.status：可發布／待確認／不可發布；published 保存發布當下的原文；perf、perfHistory 為手動輸入的 Threads 成效 |
| briefs | 每日新聞雷達，晨報 <日期>-am、晚報 <日期>-pm 分開存（items：level、verifyLevel、publishedAt、updatedAt、sources、storyId、score、isNew…） |
| stories | 重大事件追蹤紀錄 |
| events | 經濟與事件日曆（台灣時間 ISO、status、prior、consensus、actual、source、preheatReady） |
| favorites | 題材收藏庫 |
| runs | 排程執行紀錄（開始、完成、狀態、是否逾時、失敗原因） |
| plans | 週日規劃的下週候選題材 |

## 更新流程
寫入資料庫 → ArtifactData list 把 posts、events、briefs、stories、favorites、runs 匯出到新的空資料夾 → `python3 chandao-site/build_snapshot.py <資料夾> chandao-site/index.html` → 以同一網址重新發布。
