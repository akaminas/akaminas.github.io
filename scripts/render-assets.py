"""Render the icons and the social image with a headless Edge or Chrome.

    python scripts/render-assets.py

- favicon.ico, apple-touch-icon.png, icon-192.png and icon-512.png from public/favicon.svg
  (the app icons are full-bleed squares; the platform applies its own mask).
- public/og.png from scripts/og.html at 1200 x 630.
"""
import pathlib, subprocess, tempfile, struct

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
BROWSERS = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    "/usr/bin/google-chrome", "/usr/bin/chromium", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
]
BROWSER = next((b for b in BROWSERS if pathlib.Path(b).exists()), None)
if not BROWSER:
    raise SystemExit("No Edge or Chrome found; edit BROWSERS in this script.")


def shot(url: str, out: pathlib.Path, w: int, h: int) -> None:
    subprocess.run(
        [BROWSER, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
         f"--window-size={w},{h}", f"--screenshot={out}", "--virtual-time-budget=2000", url],
        check=True, capture_output=True,
    )
    print("wrote", out.name)


svg = (PUB / "favicon.svg").read_text(encoding="utf-8").replace('rx="7"', 'rx="0"')
with tempfile.TemporaryDirectory() as tmp:
    page = pathlib.Path(tmp) / "icon.html"
    page.write_text(f'<!doctype html><html><body style="margin:0;background:#FAF6EE">{svg}<style>svg{{display:block;width:100vw;height:100vh}}</style></body></html>', encoding="utf-8")
    url = page.as_uri()
    for name, size in (("icon-512.png", 512), ("icon-192.png", 192), ("apple-touch-icon.png", 180)):
        shot(url, PUB / name, size, size)
    png32 = pathlib.Path(tmp) / "f32.png"
    shot(url, png32, 32, 32)
    data = png32.read_bytes()
    header = struct.pack("<HHH", 0, 1, 1) + struct.pack("<BBBBHHII", 32, 32, 0, 0, 1, 32, len(data), 22)
    (PUB / "favicon.ico").write_bytes(header + data)
    print("wrote public/favicon.ico")

shot((ROOT / "scripts" / "og.html").as_uri(), PUB / "og.png", 1200, 630)
