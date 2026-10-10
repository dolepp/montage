"""Poster for the AI-generated product video (id ai01): two phone cards on a warm glow, like the asst poster."""
import subprocess
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont

APP = Path(__file__).resolve().parent.parent
CLEAN = APP / "tools/posters_clean"; TMP = APP / "tools/_tmp"; TMP.mkdir(exist_ok=True)
M = Path.home() / "Монтаж"
FONT = M / "clients/@moroz475/podcast_narezki/fonts/Montserrat-ExtraBold.ttf"
SRC = M / "clients/@tim_ostro/out/tim_test.mp4"


def frame(t):
    out = TMP / f"ai01_{t}.png"
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-ss", str(t), "-i", str(SRC), "-frames:v", "1", str(out)], check=True)
    return Image.open(out).convert("RGB")


def card(t, h, angle, dim):
    f = frame(t); w = round(h * 1080 / 1920); f = f.resize((w, h), Image.LANCZOS)
    mask = Image.new("L", (w, h), 0); ImageDraw.Draw(mask).rounded_rectangle((0, 0, w - 1, h - 1), radius=round(w * 0.08), fill=255)
    f = Image.eval(f, lambda v: int(v * dim)); rgba = f.convert("RGBA"); rgba.putalpha(mask)
    ring = Image.new("RGBA", (w + 16, h + 16), (0, 0, 0, 0))
    ImageDraw.Draw(ring).rounded_rectangle((0, 0, w + 15, h + 15), radius=round(w * 0.09), fill=(15, 15, 18, 255))
    ring.alpha_composite(rgba, (8, 8))
    return ring.rotate(angle, expand=True, resample=Image.BICUBIC)


W, H = 1920, 1280
bg = frame(3.5).resize((W, int(W * 1920 / 1080))).crop((0, 600, W, 600 + H)).filter(ImageFilter.GaussianBlur(40))
bg = Image.eval(bg, lambda v: int(v * 0.3)); warm = Image.new("RGB", (W, H), (120, 80, 20)); c = Image.blend(bg, warm, 0.4)
for t, h, ang, dim, pos in ((6.5, 960, -6, 0.55, (1500, 230)), (2.0, 1130, 0, 1.0, (1110, 80))):
    cd = card(t, h, ang, dim); c.paste(cd, pos, cd)
d = ImageDraw.Draw(c); ft = ImageFont.truetype(str(FONT), 92); y = 400
for line, col in (("ИИ-РОЛИК", (255, 255, 255)), ("ДЛЯ ТОВАРА", (255, 217, 61)), ("GOOGLE VEO", (255, 255, 255))):
    d.text((80, y), line, font=ft, fill=col); y += 118
c.resize((960, 640), Image.LANCZOS).save(CLEAN / "ai01.jpg", quality=92)
print("poster ai01 ok")
