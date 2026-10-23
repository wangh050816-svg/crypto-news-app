# IG 實拍照片上下對比貼文

在 Claude Code 輸入 `/photo-contrast 主題`，例如 `/photo-contrast 自律跟拖延的差別`，就會照 `.claude/skills/photo-contrast/SKILL.md` 的流程用 Unsplash 照片做出一組 1080×1350 的輪播圖和貼文文案。

手動輸出（需要 `UNSPLASH_ACCESS_KEY`）：`node photo-cards/render.js photo-cards/posts/rich-vs-most.js`
