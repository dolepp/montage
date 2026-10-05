import { Reveal } from "./Reveal"
import { SectionHead } from "./Section"

const steps = [
  ["Бриф", "Вы присылаете материалы, ТЗ и референс. Уточняю детали и фиксирую стиль, хронометраж и срок."],
  ["Монтаж", "Собираю черновик: ритм, переходы, графика, субтитры, цвет и звук."],
  ["Правки", "Вношу правки по согласованному ТЗ. Фиксируем их списком, чтобы ничего не потерялось."],
  ["Сдача", "Отдаю готовый файл MP4 в нужном разрешении ссылкой на диск."],
]

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl scroll-mt-20 px-6 pb-24 md:px-8 md:pb-32">
      <SectionHead eyebrow="Процесс" title="Четыре шага до готового файла" />
      <ol className="relative grid gap-5 md:grid-cols-4">
        <div className="absolute left-[12%] right-[12%] top-6 hidden h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent md:block" aria-hidden="true" />
        {steps.map(([t, d], i) => (
          <Reveal key={t} delay={i * 100} className="h-full">
            <li className="relative h-full rounded-2xl border border-zinc-200 bg-white p-6">
              <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-zinc-200 bg-white font-geist text-lg font-semibold shadow-sm">{i + 1}</span>
              <h3 className="mt-5 font-geist text-2xl font-semibold tracking-tighter">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{d}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
