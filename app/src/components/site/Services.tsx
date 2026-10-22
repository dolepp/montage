import { ArrowUpRight, Check } from "lucide-react"
import { Reveal } from "./Reveal"
import { SectionHead } from "./Section"
import { asset } from "@/lib/asset"

const services = [
  {
    n: "R1",
    title: "Рилсы из интервью и подкастов",
    text: "Из длинной записи выбираю сильные моменты и собираю ролики на 20–60 секунд. Вырезаю паузы и оговорки, на ключевых словах включаю графику.",
    list: ["Хук в первые секунды", "Субтитры по словам, RU или EN", "Счётчики, переписки, карточки, штампы"],
    meta: "Срок монтажа — 1–2 дня",
    type: "Нарезка интервью/подкаста",
    img: "f02",
  },
  {
    n: "R2",
    title: "Reels, Shorts, TikTok",
    text: "Перегоняю горизонтальную запись в вертикаль 9:16. Лицо в центре, текст не уходит под интерфейс. Могу сделать серию роликов и обложки к ним.",
    list: ["Кадр 9:16 с трекингом лица", "Звуковые акценты и музыка", "Обложки к рилсам"],
    meta: "Серии на месяц — по договорённости",
    type: "Shorts / Reels / TikTok",
    img: "17",
  },
  {
    n: "+",
    title: "Длинные ролики для YouTube",
    text: "Вы присылаете озвучку и материалы. Если нужно, подберу фото и футажи по смыслу. Собираю ролик на 25–30 минут.",
    list: ["Подбор фото и футажей", "Цвет, переходы, музыка, титры", "Субтитры, если нужны"],
    meta: "Срок монтажа — 2–5 дней",
    type: "Длинный ролик (YouTube)",
    img: "15",
  },
]

export function Services({ onPick }: { onPick: (type: string) => void }) {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-24 md:px-8 md:pb-32">
      <SectionHead eyebrow="Услуги" title="Что я делаю" sub="Главное направление — рилсы. Длинные ролики тоже беру." />
      <div className="grid gap-5 md:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={i * 90}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-shadow hover:shadow-xl hover:shadow-zinc-200/60">
              <img src={asset(`assets/img/${s.img}.jpg`)} width={960} height={640} loading="lazy" alt="" className="aspect-[3/2] w-full object-cover" />
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-xs text-gray-500">{s.n}</span>
                <h3 className="mt-2 font-geist text-2xl font-semibold leading-tight tracking-tighter">{s.title}</h3>
                <p className="mt-3 text-gray-600">{s.text}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {s.list.map((l) => (
                    <li key={l} className="flex gap-2.5 text-[15px]">
                      <Check className="mt-0.5 h-4 w-4 flex-none text-zinc-950" />
                      {l}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-zinc-200 pt-4 text-sm text-gray-500">{s.meta}</p>
                <a
                  href="#order"
                  onClick={() => onPick(s.type)}
                  className="mt-4 inline-flex items-center gap-1 font-geist font-medium tracking-tight underline-offset-4 hover:underline"
                >
                  Обсудить <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
