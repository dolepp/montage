import { ArrowUpRight, Check } from "lucide-react"
import { Reveal } from "./Reveal"
import { SectionHead } from "./Section"
import { asset } from "@/lib/asset"

const services = [
  {
    n: "V1",
    title: "Длинные ролики для YouTube",
    text: "Вы присылаете озвучку и материалы. Если нужно, подберу фото и футажи по смыслу. Собираю ролик на 25–30 минут.",
    list: ["Подбор фото и футажей", "Цвет, переходы, музыка, титры", "Субтитры, если нужны"],
    meta: "Ролик на 28 минут сдавал за 2 дня",
    type: "Длинный ролик (YouTube)",
    img: "06",
  },
  {
    n: "V2",
    title: "Нарезка интервью и подкастов",
    text: "Из длинной записи делаю короткие ролики на 20–40 секунд. Вырезаю паузы и оговорки, на ключевых словах включаю графику.",
    list: ["Счётчики, графики, таймлайны, вырезки", "Субтитры по словам, RU или EN", "Звук и цвет по стандарту"],
    meta: "Примеры в работах ниже",
    type: "Нарезка интервью/подкаста",
    img: "f02",
  },
  {
    n: "V3",
    title: "Shorts, Reels, TikTok",
    text: "Перегоняю горизонтальную запись в вертикаль 9:16. Лицо в центре, хук в первые секунды, текст не уходит под интерфейс.",
    list: ["Кадр 9:16 с трекингом лица", "Хук и звуковые акценты", "Серии из одного подкаста"],
    meta: "Вертикаль без потери смысла",
    type: "Shorts / Reels / TikTok",
    img: "17",
  },
]

export function Services({ onPick }: { onPick: (type: string) => void }) {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-24 md:px-8 md:pb-32">
      <SectionHead eyebrow="Услуги" title="Что я делаю" sub="Три формата. В каждом цель одна: чтобы ролик досматривали." />
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
