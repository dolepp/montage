import { asset } from "@/lib/asset"
import { works } from "@/data/works"
import { Reveal } from "./Reveal"
import { SectionHead } from "./Section"

const covers = works.filter((w) => w.id.startsWith("reel21-"))
// Fan layout on desktop: outer covers tilt and drop, the centre one stays upright.
const fan = ["md:-rotate-6 md:translate-y-8", "md:-rotate-3 md:translate-y-2", "md:z-10 md:scale-105", "md:rotate-3 md:translate-y-2", "md:rotate-6 md:translate-y-8"]

/** Fresh interview reels shown by their covers; each links to the catalogue below. */
export function Covers() {
  return (
    <section id="covers" className="overflow-hidden px-6 pb-24 pt-8 md:px-8 md:pb-32">
      <SectionHead eyebrow="Новое · рилсы из интервью" title="Рилс и обложка под ключ" sub="Нарезаю интервью и подкасты в вертикальные ролики и делаю к ним обложки, на которые хочется нажать." />
      <Reveal>
        <ul className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-6 md:mx-auto md:max-w-6xl md:justify-center md:gap-5 md:overflow-visible md:px-0 md:pb-10">
          {covers.map((w, i) => (
            <li key={w.id} className={`w-[62%] flex-none snap-center sm:w-[38%] md:w-[18%] md:transition-transform md:duration-500 md:hover:z-20 md:hover:rotate-0 md:hover:-translate-y-3 md:hover:scale-110 ${fan[i]}`}>
              <a href="#works" className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]" aria-label={`${w.modalTitle} — смотреть в каталоге`}>
                <img src={asset(`assets/img/${w.id}.jpg`)} width={720} height={1280} loading="lazy" alt={`Обложка: ${w.alt}`} className="aspect-[9/16] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
