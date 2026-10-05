# Сайт видеомонтажёра (@dolepp)

Статический сайт без сборки: `index.html`, `assets/styles.css`, `assets/app.js`, видео и обложки в `assets/`.

## Публикация на GitHub Pages
1. Репозиторий → Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)` → Save.
2. Сайт откроется на `https://<логин>.github.io/<репозиторий>/`.

## Свой домен (.ru / .com)
1. Settings → Pages → Custom domain → ввести домен → Save (в репозитории появится файл `CNAME`).
2. У регистратора домена добавить DNS-записи:
   - apex-домен (`example.ru`): четыре записи `A` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `www`: запись `CNAME` → `<логин>.github.io`
3. Когда DNS обновится (до нескольких часов), включить *Enforce HTTPS*.

## Что править
- Контакты: `index.html` (ссылки `t.me/dolepp`, `mailto:`) и константы `TG`, `MAIL` в `assets/app.js`.
- Работы: карточки `<li class="work">` в `index.html`; видео — `assets/v/`, обложки — `assets/img/` (960×640).
- Цены и политика правок: блок FAQ в `index.html`.
