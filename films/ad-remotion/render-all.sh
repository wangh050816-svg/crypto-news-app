#!/usr/bin/env bash
# 一個範本 × CSV = 3 支變體 × 3 種比例（ad-creative-video skill 的批次流程）
set -euo pipefail
HS=${REMOTION_BROWSER:-/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell}
python3 make_sfx.py audio/sfx.wav
npx remotion bundle src/index.ts --out-dir=build --log=error
for ar in 9x16 1x1 16x9; do
  node csv-to-props.js variants.csv "props/$ar" "$ar"
  for f in props/$ar/*.json; do
    id=$(basename "$f" .json)
    npx remotion render build AdTemplate "out/${id}_${ar}_raw.mp4" --props="$f" --muted --concurrency=4 --browser-executable="$HS" --log=error
    ffmpeg -v error -y -i "out/${id}_${ar}_raw.mp4" -i audio/sfx.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart "out/${id}_${ar}.mp4"
    ffmpeg -v error -y -i "out/${id}_${ar}_raw.mp4" -c:v copy -an -movflags +faststart "out/${id}_${ar}_silent.mp4"
    rm "out/${id}_${ar}_raw.mp4"; echo "✓ ${id}_${ar}"
  done
done
