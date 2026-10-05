# Сайт видеомонтажёра (DOLEPP, Telegram @dolepp)

Готовый сайт лежит прямо в корне репозитория (`index.html`, `assets/`), его раздаёт GitHub Pages.
Исходники: `app/` (React + TypeScript + Tailwind CSS 4, структура shadcn, hero-секция `hero-1` из 21st.dev).

## Публикация
Settings → Pages → Source: *Deploy from a branch* → ветка `main`, папка **`/ (root)`** → Save.

## Разработка
```bash
cd app
npm install
npm run dev      # локально на http://localhost:5173
npm run build    # пересобирает сайт в корень репозитория (старая сборка удаляется)
```
После `npm run build` коммитить изменения в корне вместе с `app/`.

## Свой домен (.ru / .com)
1. Записать домен одной строкой в `app/public/CNAME` (например `example.ru`) и выполнить `npm run build`.
2. У регистратора: четыре записи `A` на `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; для `www` запись `CNAME` на `<логин>.github.io`.
3. Когда DNS обновится, включить *Enforce HTTPS* в Settings → Pages.

## Что править
- Контакты, работы и FAQ: `app/src/data/works.ts`.
- Видео `app/public/assets/v/NN.mp4`, обложки `app/public/assets/img/NN.jpg` (960×640).
- Цвета и шрифты: `app/src/index.css`.
