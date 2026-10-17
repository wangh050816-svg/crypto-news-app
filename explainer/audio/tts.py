# 用 ~/.cache/explainer-tts 的 python 執行（先跑 setup-voice.sh）。
# 用法：python tts.py <lines.json> <輸出資料夾>
# lines.json = [{"id": "...", "text": "..."}]；輸出 <id>.wav（24kHz 單聲道 16-bit），stdout 印出 {"id": 秒數}
import json, sys, os, re, hashlib, contextlib, io
os.environ.setdefault("TF_CPP_MIN_LOG_LEVEL", "3")
import numpy as np
from scipy.io import wavfile

SPEED = 0.88  # FastSpeech2 的 duration 倍率，越小越快
SR = 24000

def load():
    with contextlib.redirect_stdout(io.StringIO()):
        import zhtts
        return zhtts.TTS()

def synth(tts, text):
    out = []
    for part in [p for p in re.split(r"(?<=[，。！？、；：])", text) if p.strip()]:
        ids = tts.processor.text_to_sequence(part, inference=True)
        a = tts.acoustic; det = a.get_input_details()
        a.resize_tensor_input(det[0]["index"], [1, len(ids)]); a.allocate_tensors()
        feed = (np.array([ids], np.int32), np.array([0], np.int32), np.array([SPEED], np.float32),
                np.array([1.0], np.float32), np.array([1.0], np.float32))
        for i, d in enumerate(det): a.set_tensor(d["index"], feed[i])
        a.invoke()
        mel = a.get_tensor(a.get_output_details()[1]["index"])
        wav = tts.mel2audio(mel)
        out.append(wav)
        pause = .28 if part[-1] in "。！？" else .16
        out.append(np.zeros(int(pause * SR), np.float32))
    wav = np.concatenate(out[:-1]) if len(out) > 1 else out[0]
    nz = np.where(np.abs(wav) > 0.01)[0]  # 修掉頭尾靜音
    if len(nz): wav = wav[max(0, nz[0] - 600): nz[-1] + 1200]
    return wav / (np.abs(wav).max() + 1e-6) * 0.9

def main():
    lines = json.load(open(sys.argv[1])); outdir = sys.argv[2]; os.makedirs(outdir, exist_ok=True)
    tts, res = None, {}
    for ln in lines:
        key = hashlib.md5(f"{SPEED}|{ln['text']}".encode()).hexdigest()[:10]
        path = os.path.join(outdir, f"{key}.wav")
        if not os.path.exists(path):
            tts = tts or load()
            with contextlib.redirect_stdout(io.StringIO()):
                wav = synth(tts, ln["text"])
            wavfile.write(path, SR, (wav * 32767).astype(np.int16))
        sr, w = wavfile.read(path)
        res[ln["id"]] = {"file": path, "dur": len(w) / sr}
    print(json.dumps(res))

if __name__ == "__main__":
    main()
