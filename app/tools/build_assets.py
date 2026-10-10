"""Builds the site's web videos and posters WITH the DOLEPP watermark.
usage: python tools/build_assets.py [ID ...]      (no IDs = everything)

- videos: public/assets/v/<id>.mp4 re-encoded from the original (720p / 720x1280, H.264 crf 22, faststart) with a top-left watermark (top-right is covered by the modal close button)
- posters: tools/posters_clean/<id>.jpg (no watermark) -> public/assets/img/<id>.jpg (with watermark); new works get a fresh poster
Run from site/app with the montage venv (needs ffmpeg, Pillow).
"""
import subprocess, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

APP = Path(__file__).resolve().parent.parent
V, IMG, CLEAN = APP / "public/assets/v", APP / "public/assets/img", APP / "tools/posters_clean"
TMP = APP / "tools/_tmp"; TMP.mkdir(exist_ok=True)
M = Path.home() / "Монтаж"
FONT = M / "clients/@moroz475/podcast_narezki/fonts/Montserrat-ExtraBold.ttf"
PORT = M / "portfolio_ролики"
RO = M / "clients/@moroz475/podcast_narezki/out"

# id: (source, out WxH, extra ffmpeg input args)
SRC = {
    "01": (PORT / "01_hanoi_moscow.mp4", (1280, 720), []),
    "03": (PORT / "03_go_history.mp4", (1280, 720), []),
    "06": (PORT / "06_go_stack.mp4", (1280, 720), []),
    "09": (PORT / "09_gpt_segment.mp4", (1280, 720), []),
    "28": (PORT / "28_en_forecast.mp4", (1280, 720), []),
    "30": (PORT / "30_en_heat.mp4", (1280, 720), []),
    "17": (PORT / "17_short_forbes.mp4", (720, 1280), []),
    "f01": (RO / "f01.mp4", (720, 1280), []),
    "f03": (RO / "f03.mp4", (720, 1280), []),
    "f04": (RO / "f04.mp4", (720, 1280), []),
    "f53": (RO / "f53.mp4", (720, 1280), []),
    "f02": (V / "f02_prev.mp4", (720, 1280), []),   # no original left: re-encoded from the previous web file (kept in tools/_tmp)
    "hero": (PORT / "01_hanoi_moscow.mp4", (960, 540), []),
    "phone": (PORT / "17_short_forbes.mp4", (360, 640), ["-t", "10"]),
    "den": (M / "clients/@DenisAgencyC/готово/тест_мошенники_и_паузы_v2_без_запинки.mp4", (1280, 720), []),
    "sip": (M / "clients/noname_sipinska/Sipinska_1min.mp4", (1280, 720), []),
    "neck": (M / "clients/@moroz475/готово/тренировка_шеи_вариант2_текст_сверху.mp4", (720, 1280), []),
    "asst": (M / "clients/@keevleva/готово/ассистент_10_специалистов.mp4", (720, 1280), []),
    "ai01": (M / "clients/@tim_ostro/out/tim_test.mp4", (720, 1280), []),
}


def watermark(width: int) -> Path:
    """DOLEPP wordmark, white 72 % with a soft shadow, `width` px wide."""
    out = TMP / f"wm_{width}.png"
    if out.exists():
        return out
    scale = 4
    fs = 100
    font = ImageFont.truetype(str(FONT), fs)
    text, track = "DOLEPP", 9
    w = sum(font.getlength(c) for c in text) + track * (len(text) - 1)
    pad = 40
    im = Image.new("RGBA", (int(w) + 2 * pad, fs + 2 * pad), (0, 0, 0, 0))
    sh = Image.new("RGBA", im.size, (0, 0, 0, 0))
    x = pad
    for c in text:
        ImageDraw.Draw(sh).text((x + 3, pad + 5), c, font=font, fill=(0, 0, 0, 170))
        ImageDraw.Draw(im).text((x, pad), c, font=font, fill=(255, 255, 255, 190))
        x += font.getlength(c) + track
    sh = sh.filter(ImageFilter.GaussianBlur(5))
    out_im = Image.alpha_composite(sh, im)
    out_im = out_im.crop(out_im.getbbox())
    h = round(out_im.height * width / out_im.width)
    out_im.resize((width, h), Image.LANCZOS).save(out)
    return out


def wm_width(w: int, h: int) -> int:
    return round(max(w, 0) * (0.15 if h > w else 0.105))


def encode(vid: str):
    src, (w, h), extra = SRC[vid]
    out = V / f"{vid}.mp4"
    if not src.exists() and out.exists() and vid != "f02":
        print(f"video {vid}: source archived, keeping the current web file")   # e.g. sip: project moved to Google Drive
        return
    if vid == "f02" and not src.exists():
        (TMP / "f02_prev.mp4").write_bytes(out.read_bytes()) if not (TMP / "f02_prev.mp4").exists() else None
        src = TMP / "f02_prev.mp4"
    wm = watermark(wm_width(w, h))
    margin = round(w * 0.035)
    fps = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v", "-show_entries", "stream=r_frame_rate", "-of", "csv=p=0", str(src)],
                         capture_output=True, text=True).stdout.strip().split("\n")[0].strip(",")
    num, den = (fps.split("/") + ["1"])[:2]
    rate = min(30, float(num) / float(den))
    fc = (f"[0:v]scale={w}:{h}:force_original_aspect_ratio=decrease:flags=lanczos,pad={w}:{h}:(ow-iw)/2:(oh-ih)/2:black,fps={rate},setsar=1[b];"
          f"[b][1:v]overlay=x={margin}:y={margin}:format=auto,format=yuv420p[v]")
    tmp = TMP / f"{vid}.mp4"
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", *extra, "-i", str(src), "-i", str(wm), "-filter_complex", fc,
                    "-map", "[v]", "-map", "0:a:0?", "-c:v", "libx264", "-preset", "slow", "-crf", "22", "-maxrate", "2800k", "-bufsize", "5600k",
                    "-profile:v", "high", "-c:a", "aac", "-b:a", "96k", "-ac", "2", "-movflags", "+faststart", str(tmp)], check=True)
    tmp.replace(out)
    print(f"video {vid}: {out.stat().st_size / 1e6:.1f} MB")


def stamp_poster(pid: str):
    src = CLEAN / f"{pid}.jpg"
    if not src.exists():
        return
    im = Image.open(src).convert("RGBA")
    wm = Image.open(watermark(round(im.width * 0.12)))
    m = round(im.width * 0.025)
    if pid in ("den", "sip"):   # package.cover posters already carry a tag (left) and a duration badge (right) at the top
        pos = (m, im.height - wm.height - m)
    else:
        pos = (im.width - wm.width - m, m)
    im.alpha_composite(wm, pos)
    im.convert("RGB").save(IMG / f"{pid}.jpg", quality=90)
    print("poster", pid)


if __name__ == "__main__":
    ids = sys.argv[1:] or list(SRC)
    for i in ids:
        encode(i)
    for p in [i for i in (sys.argv[1:] or list(SRC)) if i != "phone"]:
        stamp_poster(p)
