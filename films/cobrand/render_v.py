"""直式 1080×1920 算圖：用 Playwright 逐幀呼叫 draw(t)、截圖，交給 ffmpeg 壓成影片。
用法：
  python render_v.py                 # 全片 → renders/raw.mp4（無聲）
  python render_v.py --sheet 1 3 5   # 指定時刻拼一張 → review/sheet.jpg
需要環境變數 VK_CHROME 指向 Chromium（沒設就用本機 Chrome）。
"""
import functools, http.server, io, os, subprocess, sys, threading
from pathlib import Path
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent                       # repo 根目錄：字型在 .claude/skills/... 底下
FPS = 30

def serve():
    h = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(ROOT))
    h.log_message = lambda *a, **k: None
    srv = http.server.ThreadingHTTPServer(("127.0.0.1", 0), h)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv, f"http://127.0.0.1:{srv.server_address[1]}/{HERE.relative_to(ROOT)}/index.html"

def main():
    args = sys.argv[1:]
    srv, url = serve()
    exe = os.environ.get("VK_CHROME")
    with sync_playwright() as p:
        b = p.chromium.launch(**({"executable_path": exe} if exe else {"channel": "chrome"}), args=["--disable-lcd-text", "--force-color-profile=srgb"])
        pg = b.new_page(viewport={"width": 1080, "height": 1920}, device_scale_factor=1)
        pg.on("pageerror", lambda e: print("[pageerror]", e))
        pg.goto(url); pg.wait_for_function("window.READY === true", timeout=60000)
        dur = pg.evaluate("window.DUR")
        shot = lambda t: (pg.evaluate(f"draw({t})"), pg.screenshot(type="jpeg", quality=95, clip={"x": 0, "y": 0, "width": 1080, "height": 1920}))[1]
        if args and args[0] == "--sheet":
            from PIL import Image
            ts = [float(v) for v in args[1:]]; cols = min(4, len(ts)); rows = (len(ts) + cols - 1) // cols; tw, th = 360, 640
            sheet = Image.new("RGB", (tw * cols, th * rows))
            for i, t in enumerate(ts):
                im = Image.open(io.BytesIO(shot(t))).resize((tw, th)); sheet.paste(im, ((i % cols) * tw, (i // cols) * th))
            (HERE / "review").mkdir(exist_ok=True); sheet.save(HERE / "review" / "sheet.jpg", quality=88); print("sheet:", len(ts))
        else:
            (HERE / "renders").mkdir(exist_ok=True); out = HERE / "renders" / "raw.mp4"; n = int(round(dur * FPS))
            ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-",
                                   "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", str(out)], stdin=subprocess.PIPE)
            for f in range(n):
                ff.stdin.write(shot(f / FPS))
                if f % 60 == 0: print(f"  {f}/{n}", flush=True)
            ff.stdin.close(); ff.wait(); print("done", out)
        b.close()
    srv.shutdown()

if __name__ == "__main__":
    main()
