"""Posters (clean, no watermark) for the new works: tools/posters_clean/<id>.jpg, 960x640.
den, sip: package.cover (title band + frame); neck: vertical-video poster with three phone cards, like f01."""
import subprocess, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

sys.path.insert(0, str(Path.home() / "Монтаж/vidai"))
from vidai.package import cover  # noqa: E402

APP = Path(__file__).resolve().parent.parent
CLEAN = APP / "tools/posters_clean"; TMP = APP / "tools/_tmp"; TMP.mkdir(exist_ok=True)
M = Path.home() / "Монтаж"
FONT = M / "clients/@moroz475/podcast_narezki/fonts/Montserrat-ExtraBold.ttf"
SRC = {
    "den": M / "clients/@DenisAgencyC/готово/тест_мошенники_и_паузы_v2_без_запинки.mp4",
    "sip": M / "clients/noname_sipinska/Sipinska_1min.mp4",
    "neck": M / "clients/@moroz475/готово/тренировка_шеи_вариант2_текст_сверху.mp4",
}


def frame(vid, t):
    out = TMP / f"{vid}_{t}.png"
    subprocess.run(["ffmpeg", "-nostdin", "-v", "error", "-y", "-ss", str(t), "-i", str(SRC[vid]), "-frames:v", "1", str(out)], check=True)
    return Image.open(out).convert("RGB")


def save(im, pid):
    im.resize((960, 640), Image.LANCZOS).save(CLEAN / f"{pid}.jpg", quality=92)


# horizontal works
save(cover(frame("den", 43.3), "Паузы убеждают", "Моушн-графика · субтитры · монтаж", 59), "den")
save(cover(frame("sip", 25), "Истории о звёздах", "Фото · эффекты · субтитры", 65), "sip")

# vertical work: three tilted phone cards on a dark red glow
W, H = 1920, 1280
bg = frame("neck", 24).resize((W, int(W * 1920 / 1080))).crop((0, 500, W, 500 + H)).filter(ImageFilter.GaussianBlur(40))
bg = Image.eval(bg, lambda v: int(v * 0.35))
c = bg.copy()


def card(t, h, angle, dim):
    f = frame("neck", t)
    w = round(h * 1080 / 1920)
    f = f.resize((w, h), Image.LANCZOS)
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w - 1, h - 1), radius=round(w * 0.08), fill=255)
    f = Image.eval(f, lambda v: int(v * dim))
    rgba = f.convert("RGBA"); rgba.putalpha(mask)
    ring = Image.new("RGBA", (w + 16, h + 16), (0, 0, 0, 0))
    ImageDraw.Draw(ring).rounded_rectangle((0, 0, w + 15, h + 15), radius=round(w * 0.09), fill=(15, 15, 18, 255))
    ring.alpha_composite(rgba, (8, 8))
    return ring.rotate(angle, expand=True, resample=Image.BICUBIC)


for t, h, ang, dim, pos in ((34, 960, -6, 0.5, (1500, 230)), (24, 1130, 0, 1.0, (1110, 80))):
    cd = card(t, h, ang, dim)
    c.paste(cd, pos, cd)
d = ImageDraw.Draw(c)
ft = ImageFont.truetype(str(FONT), 128)
y = 380
for line, col in (("ТРЕНИРОВКА", (255, 255, 255)), ("ШЕИ", (255, 217, 61)), ("ЗА 40 СЕК", (255, 255, 255))):
    d.text((80, y), line, font=ft, fill=col)
    y += 150
save(c, "neck")
print("posters ok")
