import { Reveal } from "./Reveal"

const facts = [
  ["20–60 сек", "рилс из длинного интервью или подкаста"],
  ["1–2 дня", "срок на рилс при готовой записи"],
  ["9:16", "Reels, Shorts, TikTok: текст не уходит под интерфейс"],
]

export function Facts() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-8 md:py-24">
      <Reveal>
        <dl className="grid divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
          {facts.map(([n, t]) => (
            <div key={n} className="px-8 py-8">
              <dt className="font-geist text-4xl font-semibold tracking-tighter md:text-5xl">{n}</dt>
              <dd className="mt-2 text-gray-600">{t}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  )
}
