#!/usr/bin/env bash
# 安裝離線中文語音（zhtts：FastSpeech2 + MB-MelGAN，模型包在 PyPI 套件裡，不用連外部模型網站）。
# 需要 python3.11（TensorFlow 2.15 的 tflite 才有 Flex op）。裝在 ~/.cache/explainer-tts，大約 1 分鐘。
set -e
V=${EXPLAINER_TTS_VENV:-$HOME/.cache/explainer-tts}
if [ -x "$V/bin/python" ] && "$V/bin/python" -c "import zhtts" 2>/dev/null; then echo "已安裝：$V"; exit 0; fi
uv venv -q -p /usr/bin/python3.11 "$V"
VIRTUAL_ENV="$V" uv pip install -q "tensorflow-cpu==2.15.1" "numpy<2" scipy pypinyin
VIRTUAL_ENV="$V" uv pip install -q --no-deps zhtts==0.0.1
echo "完成：$V"
