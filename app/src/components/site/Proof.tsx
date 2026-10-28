import { Quote } from "lucide-react"
import { Reveal } from "./Reveal"

const nums = [
  ["8 сек", "один сгенерированный кадр-сцена, из них собираю ролик на 15–30 секунд"],
  ["RU", "речь персонажа и озвучка на русском с синхронизацией губ"],
  ["4 формата", "9:16, 4:5, 1:1 и 16:9 из одного ролика"],
]

export function Proof() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <figure className="relative h-full overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-100 p-8 md:p-12">
            <Quote className="h-10 w-10 text-zinc-300" />
            <blockquote className="mt-6 text-balance font-geist text-3xl font-semibold leading-tight tracking-tighter md:text-4xl">
              Ролик для ЖК, товара или кофейни — <mark className="rounded-md bg-[#FFD93D] px-1.5 text-zinc-950">без студии, актёров и съёмочного дня</mark>.
            </blockquote>
            <figcaption className="mt-8 text-sm text-gray-600">
              <span className="font-medium text-zinc-950">Нейросеть делает кадры, я собираю из них рекламу</span>
              <br />
              Сценарий, подписи, музыка и форматы под вашу площадку
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
