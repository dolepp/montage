import { useEffect, useRef, useState } from "react"
import { asset } from "@/lib/asset"

const pad = (n: number) => String(n).padStart(2, "0")
const tc = (s: number) => `00:${pad(Math.floor(s / 60))}:${pad(Math.floor(s % 60))}:${pad(Math.floor((s % 1) * 30))}`

/** Showreel in a monitor frame (live timecode) plus a vertical Shorts clip on the side. */
export function Showreel() {
  const reel = useRef<HTMLVideoElement>(null)
  const phone = useRef<HTMLVideoElement>(null)
  const [time, setTime] = useState("00:00:00:00")

  useEffect(() => {
    const vids = [reel.current, phone.current].filter(Boolean) as HTMLVideoElement[]
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          const v = e.target as HTMLVideoElement
          if (reduce) return
          if (e.isIntersecting) v.play().catch(() => {})
          else v.pause()
        }),
      { threshold: 0.2 },
    )
    vids.forEach((v) => io.observe(v))
    let raf = 0
    const loop = () => {
      if (reel.current) setTime(tc(reel.current.currentTime))
      raf = requestAnimationFrame(loop)
    }
    if (!reduce) raf = requestAnimationFrame(loop)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="relative mx-auto max-w-5xl pb-16 text-left">
      <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-950 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.45)] [transform:rotateX(8deg)] transition-transform duration-700 hover:[transform:rotateX(0deg)] motion-reduce:[transform:none]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-900 px-4 py-2.5 font-mono text-[11px] tracking-wide text-zinc-400">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          <span className="ml-3 hidden sm:inline">A001_C014 · REVIEW COPY</span>
          <span className="ml-auto">TC {time}</span>
        </div>
        <video
          ref={reel}
          src={asset("assets/v/hero.mp4")}
          poster={asset("assets/img/hero.jpg")}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Интервью «Из Ханоя в Москву»: календарь, полароиды и субтитры"
          className="aspect-video w-full object-cover"
        />
      </div>
      {/* iPhone 16 (71.6 × 147.6 mm): aluminium frame, thin bezel, Dynamic Island, Action/volume buttons left, power + Camera Control right */}
      <figure className="absolute -bottom-4 left-2 z-[60] w-[24%] max-w-[170px] [transform:rotate(-4deg)] sm:left-0 md:-left-8">
        <span aria-hidden className="absolute -left-[2px] top-[17%] h-[4%] w-[3px] rounded-l-sm bg-zinc-600" />
        <span aria-hidden className="absolute -left-[2px] top-[25%] h-[7.5%] w-[3px] rounded-l-sm bg-zinc-600" />
        <span aria-hidden className="absolute -left-[2px] top-[34.5%] h-[7.5%] w-[3px] rounded-l-sm bg-zinc-600" />
        <span aria-hidden className="absolute -right-[2px] top-[27%] h-[11%] w-[3px] rounded-r-sm bg-zinc-600" />
        <span aria-hidden className="absolute -right-[1px] top-[55%] h-[6.5%] w-[2px] rounded-r-sm bg-zinc-500" />
        <div className="relative aspect-[716/1476] w-full rounded-[15%/7.3%] bg-gradient-to-br from-zinc-500 via-zinc-800 to-zinc-600 p-[1.6%] shadow-2xl">
          <div className="relative h-full w-full overflow-hidden rounded-[13.5%/6.6%] bg-black p-[3.2%]">
            <div className="relative h-full w-full overflow-hidden rounded-[11.5%/5.4%] bg-zinc-950">
              <video
                ref={phone}
                src={asset("assets/v/phone.mp4")}
                poster={asset("assets/img/17.jpg")}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Пример вертикального Shorts на iPhone"
                className="h-full w-full object-cover"
              />
              <span aria-hidden className="absolute left-1/2 top-[1.6%] h-[4.2%] w-[33%] -translate-x-1/2 rounded-full bg-black" />
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </figure>
    </div>
  )
}
