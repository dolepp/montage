import { Quote } from "lucide-react"
import { Reveal } from "./Reveal"

const nums = [
  ["28 мин", "самый длинный ролик: фото и футажи, цвет, переходы, титры, музыка"],
  ["2 дня", "на полноформатный ролик при готовых озвучке и материалах"],
  ["RU / EN", "монтирую и субтитрирую на русском и английском"],
]

export function Proof() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <figure className="relative h-full overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-100 p-8 md:p-12">
            <Quote className="h-10 w-10 text-zinc-300" />
            <blockquote className="mt-6 text-balance font-geist text-3xl font-semibold leading-tight tracking-tighter md:text-4xl">
              «Мне нравится. Получилось{" "}
              <mark className="rounded-md bg-[#FFD93D] px-1.5 text-zinc-950">разнообразно</mark>, не скучно и отличный баланс».
            </blockquote>
            <figcaption className="mt-8 text-sm text-gray-600">
              <span className="font-medium text-zinc-950">Заказчик, YouTube-канал в нише true crime</span>
              <br />
              После первой работы заказал следующую
            </figcaption>
          </figure>
        </Reveal>
        <div className="grid gap-4">
          {nums.map(([n, t], i) => (
            <Reveal key={n} delay={i * 90}>
              <div className="flex h-full items-center gap-6 rounded-2xl border border-zinc-200 bg-white p-6">
                <b className="w-32 flex-none font-geist text-4xl font-semibold tracking-tighter">{n}</b>
                <span className="text-sm leading-snug text-gray-600">{t}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
