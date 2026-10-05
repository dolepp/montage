# Сайт видеомонтажёра (DOLEPP, Telegram @dolepp)

React + TypeScript + Tailwind CSS 4 + shadcn-структура (`src/components/ui`). Hero-секция: компонент `hero-1` из 21st.dev.

## Разработка
```bash
npm install
npm run dev      # локально на http://localhost:5173
npm run build    # сборка в docs/ (её и раздаёт GitHub Pages)
```

## Публикация на GitHub Pages
Settings → Pages → Source: *Deploy from a branch* → ветка `main`, папка **`/docs`** → Save.
Перед коммитом выполнить `npm run build`, чтобы `docs/` был свежим.

## Свой домен (.ru / .com)
1. В `public/CNAME` записать домен одной строкой (например `example.ru`) и сделать `npm run build`.
2. У регистратора: четыре записи `A` на `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; для `www` запись `CNAME` на `<логин>.github.io`.
3. Когда DNS обновится, включить *Enforce HTTPS* в Settings → Pages.

## Что править
- Контакты и FAQ: `src/data/works.ts`.
- Работы: массив `works` в том же файле; видео `public/assets/v/NN.mp4`, обложки `public/assets/img/NN.jpg` (960×640).
- Цвета и шрифты: `src/index.css` (токены shadcn, шрифт Geist + Golos Text для кириллицы).
