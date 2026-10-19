# B × OURBIT 萬聖節狂歡夜（Cinetic 版）

`ourbit_halloween_cinetic_9x16.mp4`：1080×1920、60 fps、23 秒，有配樂和音效，畫面加了動態模糊。

- **3D：** 卡包、卡牌、比特幣金幣、金條、禮盒都是 Three.js 做的 3D 物件（`src/three/Stage3D.tsx`），在黑色攝影棚環境裡打光；卡包落地後撕開，卡牌繞著它轉，福利排成 3D 旋轉木馬繞著南瓜燈的光。
- **概念：** 南瓜燈的光。「不給糖？」→「註冊　就送」這行標題長成 OURBIT 的註冊列 → 按下註冊，寶可夢卡包從南瓜燈的光裡升起 → 四個加碼福利像滾輪一樣轉進同一道光裡 → B × OURBIT 收尾，接「立即註冊　10/16 – 10/31」。
- **貫穿裝置：** 南瓜燈（實拍）一直在畫面下方，跨過每個剪接點都不會中斷。
- **節奏：** 120 BPM，一小節 2 秒。時間只寫在 `src/timeline.ts` 一個地方，畫面和音效都從這裡讀。
- **分鏡與設定：** 見 `BRIEF.md`、`TREATMENT.md`。
- **素材出處：** 見 `../ad-remotion/sources/CREDITS.md`。
- **字體：** Noto Sans TC（OFL）。

## 重新產生
```bash
npm install
export EARSHOT_PYTHON=<earshot venv python>
npx tsx scripts/export-cues.ts && python3 scripts/audio/kit.py render
python3 scripts/audio/score.py --cues out/cues.json --score audio/score.json --out public/audio/soundtrack.wav --stems out/stems
bash scripts/render.sh Film out/film.mp4 --blur --budget 6 --accept-fast 117-122 --audio public/audio/soundtrack.wav
```
第 117–122 格的速度檢查是刻意放行的：那是開場進註冊畫面的硬切（南瓜燈換構圖），不是移動。

## 最終檢查結果
- 規格：probe PASS
- 音畫同步：0 個樣本偏移，PASS
- 畫面：forensics 0 個錯誤
- 音效對位：20/20 個音效落在畫面動作 ±2 格內
- 響度：-14 LUFS，真峰值 -2.2 dBTP
