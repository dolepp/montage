import { ArrowUpRight, Check, Clock3 } from "lucide-react"
import { Reveal } from "./Reveal"
import { SectionHead } from "./Section"
import { SHOW_REELS } from "@/data/works"

const reelsRates = [
  { label: "Монтаж", title: "Reels / Shorts / TikTok", price: "1 000", unit: "за ролик", duration: "1–2 дня", desc: "Рилсы из интервью и подкастов для экспертов, бизнеса и агентств.", type: "Shorts / Reels / TikTok", featured: false },
]
const aiRates = [
  { label: "Для бизнеса", title: "Рекламный ролик", price: "8 000", unit: "за ролик", duration: "2–3 дня", desc: "Товар, недвижимость, сервис: несколько сцен, подписи, музыка, финальная заставка, нужные форматы.", type: "Рекламный ролик для товара", featured: true },
  { label: "Для соцсетей", title: "Промо для Reels", price: "1 500", unit: "за ролик", duration: "1–2 дня", desc: "Атмосферный ролик для кофейни, салона или магазина. Фото товара не обязательно.", type: "Промо для соцсетей", featured: false },
  { label: "Быстро", title: "Оживление фото", price: "500", unit: "за фото", duration: "1 день", desc: "Старые снимки и портреты оживают: мимика, ветер, музыка. Подарок семье или контент для блога.", type: "Говорящий персонаж / оживление фото", featured: false },
]
const rates = [...aiRates, ...(SHOW_REELS ? reelsRates : [])]
export function Pricing({ onPick }: { onPick: (type: string) => void }) {
  return (
    <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-24 md:px-8 md:pb-32">
      <SectionHead eyebrow="Стоимость" title="Понятная цена. Готовый результат." sub="Начнём с одного ролика. Если подойдёт, согласуем серию на месяц и скидку на объём." />
      <div className="grid gap-5 md:grid-cols-3">
        {rates.map((rate, i) => (
          <Reveal key={rate.title} delay={i * 90}>
            <article className={`flex h-full flex-col rounded-3xl border p-7 md:p-9 ${rate.featured ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white"}`}>
              <span className={`w-fit rounded-full border px-3 py-1 text-xs uppercase tracking-wide ${rate.featured ? "border-white/20 text-zinc-300" : "border-zinc-200 text-zinc-500"}`}>{rate.label}</span>
              <h3 className="mt-5 font-geist text-2xl font-semibold tracking-tight">{rate.title}</h3>
              <p className="mt-6 flex flex-wrap items-baseline gap-x-2 font-geist">
                <span className={rate.featured ? "text-zinc-400" : "text-zinc-500"}>от</span>
                <span className="text-5xl font-semibold tracking-tighter md:text-6xl">{rate.price} ₽</span>
                <span className={`text-sm ${rate.featured ? "text-zinc-400" : "text-zinc-500"}`}>{rate.unit}</span>
              </p>
              <p className={`mt-5 flex-1 ${rate.featured ? "text-zinc-300" : "text-zinc-600"}`}>{rate.desc}</p>
              <p className={`mt-4 flex items-center gap-2 text-sm ${rate.featured ? "text-zinc-300" : "text-zinc-600"}`}><Clock3 className="h-4 w-4" aria-hidden="true" />Срок — {rate.duration}</p>
              <a href="#order" onClick={() => onPick(rate.type)} className={`mt-8 inline-flex w-fit items-center gap-2 rounded-xl px-5 py-3 font-medium transition-colors ${rate.featured ? "bg-[#FFD93D] text-zinc-950 hover:bg-yellow-300" : "bg-zinc-950 text-white hover:bg-zinc-800"}`}>
                Обсудить проект <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="mt-5 grid gap-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 md:grid-cols-2 md:p-8">
        <div className="flex gap-3"><Clock3 className="mt-1 h-5 w-5 flex-none" aria-hidden="true" /><div><h3 className="font-semibold">Сроки</h3><p className="mt-2 text-sm leading-relaxed text-zinc-600">Фото — 1 день, промо — 1–2 дня, рекламный ролик — 2–3 дня. Точный срок согласуем перед стартом.</p></div></div>
        <div className="flex gap-3"><Check className="mt-1 h-5 w-5 flex-none" aria-hidden="true" /><div><h3 className="font-semibold">Правки включены</h3><p className="mt-2 text-sm leading-relaxed text-zinc-600">В рамках согласованного ТЗ довожу ролик до утверждённого результата. Замечания собираем списком.</p></div></div>
      </div>
      <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-relaxed text-zinc-500">Итоговую стоимость фиксируем до начала работы. Несколько форматов из одного ролика (9:16, 4:5, 1:1, 16:9) обсуждаем отдельно.</p>
    </section>
  )
}
