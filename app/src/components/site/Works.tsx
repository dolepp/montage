import { useEffect, useRef, useState } from "react"
import { Play, X, ArrowUpRight, HardDrive } from "lucide-react"
import * as Tabs from "@radix-ui/react-tabs"
import { Button } from "@/components/ui/button"
import { DRIVE_URL, TG_URL, works, type Category, type Work } from "@/data/works"
import { asset } from "@/lib/asset"
import { cn } from "@/lib/utils"
import { SectionHead } from "./Section"

const tabs: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "int", label: "Интервью" },
  { id: "en", label: "English" },
  { id: "short", label: "Shorts" },
]

function WorkCard({ w, onOpen }: { w: Work; onOpen: (w: Work) => void }) {
  const video = useRef<HTMLVideoElement>(null)
  const [live, setLive] = useState(false)
  const loaded = useRef(false)
  const fine = typeof matchMedia !== "undefined" && matchMedia("(hover: hover) and (pointer: fine)").matches

  const enter = () => {
    const v = video.current
    if (!v || !fine) return
    if (!loaded.current) {
      v.src = asset(`assets/v/${w.id}.mp4`)
      loaded.current = true
    }
    v.play().then(() => setLive(true)).catch(() => {})
  }
  const leave = () => {
    setLive(false)
    setTimeout(() => video.current?.pause(), 250)
  }

  return (
    <li>
      <button
        onClick={() => onOpen(w)}
        onMouseEnter={enter}
        onMouseLeave={leave}
        className="group block w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900 text-left transition-colors hover:border-white/30"
        aria-label={`Смотреть: ${w.title}, ${w.meta}`}
      >
        <span className="relative block aspect-[3/2] overflow-hidden bg-black">
          <img src={asset(`assets/img/${w.id}.jpg`)} width={960} height={640} loading="lazy" alt={w.alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <video ref={video} muted loop playsInline preload="none" className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-300", live ? "opacity-100" : "opacity-0")} />
          <span className="absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-full bg-[#FFD93D] text-zinc-950 shadow-lg transition-transform group-hover:scale-110">
            <Play className="h-4 w-4 fill-current" />
          </span>
        </span>
        <span className="block p-5">
          <span className="flex items-baseline justify-between gap-3">
            <b className="font-geist text-lg font-semibold tracking-tight text-white">{w.title}</b>
            <em className="flex-none font-mono text-xs not-italic text-zinc-400">{w.meta}</em>
          </span>
          <span className="mt-1.5 block text-sm text-zinc-400">{w.desc}</span>
        </span>
      </button>
    </li>
  )
}

function Modal({ w, onClose }: { w: Work; onClose: () => void }) {
  const video = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    video.current?.play().catch(() => {})
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    addEventListener("keydown", key)
    return () => {
      document.documentElement.style.overflow = prev
      removeEventListener("keydown", key)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={w.modalTitle}>
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />
      <div className={cn("relative flex max-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black", w.vertical ? "max-w-md" : "max-w-5xl")}>
        <button onClick={onClose} aria-label="Закрыть" className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/70 text-white hover:bg-white hover:text-black">
          <X className="h-5 w-5" />
        </button>
        <video ref={video} src={asset(`assets/v/${w.id}.mp4`)} poster={asset(`assets/img/${w.id}.jpg`)} controls playsInline className="max-h-[calc(100dvh-8rem)] w-full bg-black object-contain" />
        <div className="flex items-center justify-between gap-3 bg-zinc-950 px-4 py-3 text-sm font-medium text-white">
          <b className="font-geist tracking-tight">{w.modalTitle}</b>
          <Button asChild size="sm" variant="accent" className="flex-none">
            <a href={TG_URL} target="_blank" rel="noopener noreferrer">Заказать похожее</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export function Works() {
  const [filter, setFilter] = useState<"all" | Category>("all")
  const [open, setOpen] = useState<Work | null>(null)
  const list = works.filter((w) => filter === "all" || w.cat === filter)
  const count = (id: "all" | Category) => (id === "all" ? works.length : works.filter((w) => w.cat === id).length)

  return (
    <section id="works" className="scroll-mt-0 bg-zinc-950 px-6 py-24 text-white md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead dark eyebrow="Работы" title="Выберите кадр" sub="Нажмите на работу, чтобы посмотреть её целиком. Это демонстрационные нарезки: показываю свой монтаж и графику." />
        <Tabs.Root value={filter} onValueChange={(v) => setFilter(v as "all" | Category)}>
          <Tabs.List className="mb-10 flex flex-wrap justify-center gap-2" aria-label="Фильтр работ">
            {tabs.map((t) => (
              <Tabs.Trigger
                key={t.id}
                value={t.id}
                className="rounded-full border border-white/15 px-5 py-2 font-geist text-sm tracking-tight text-zinc-300 transition-colors hover:border-white/40 data-[state=active]:border-[#FFD93D] data-[state=active]:bg-[#FFD93D] data-[state=active]:text-zinc-950"
              >
                {t.label} <sup className="ml-0.5 font-mono text-[10px] opacity-70">{count(t.id)}</sup>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((w) => (
            <WorkCard key={w.id} w={w} onOpen={setOpen} />
          ))}
        </ul>
        <div className="mt-14 flex justify-center">
          <Button asChild variant="outline" size="lg" className="h-12 border-white/20 bg-transparent font-geist text-base tracking-tight text-white hover:bg-white hover:text-black">
            <a href={DRIVE_URL} target="_blank" rel="noopener noreferrer">
              <HardDrive className="mr-2 h-4 w-4" />
              Полное портфолио: 30 работ на Google Диске
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
      {open && <Modal w={open} onClose={() => setOpen(null)} />}
    </section>
  )
}
