import { Reveal } from "./Reveal"

const facts = [
  ["0 съёмок", "сцены генерирует нейросеть по вашему фото или идее"],
  ["1–3 дня", "от брифа до готового ролика"],
  ["4 формата", "9:16, 4:5, 1:1 и 16:9: Reels, лента, таргет, сайт"],
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
