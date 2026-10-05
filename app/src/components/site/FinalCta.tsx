import { useState } from "react"
import { Copy, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MAIL, TG_URL } from "@/data/works"
import { Reveal } from "./Reveal"

export function FinalCta() {
  const [done, setDone] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(MAIL)
      setDone(true)
      setTimeout(() => setDone(false), 2500)
    } catch {
      /* noop */
    }
  }
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-32">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-zinc-950 px-6 py-16 text-center text-white md:px-16 md:py-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,#333_1px,transparent_1px),linear-gradient(to_bottom,#333_1px,transparent_1px)] [background-size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_60%,transparent_100%)]"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-balance bg-gradient-to-br from-white from-30% to-white/50 bg-clip-text text-4xl font-semibold leading-[1.05] tracking-tighter text-transparent md:text-6xl">
              Расскажите о проекте. Предложу, как смонтировать
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg tracking-tight text-zinc-400">Пишите в Telegram или на почту. Отвечу, как сделаю, за сколько и к какому сроку.</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild variant="accent" size="lg" className="h-12 w-full font-geist text-base tracking-tight sm:w-auto">
                <a href={TG_URL} target="_blank" rel="noopener noreferrer">
                  <Send className="mr-2 h-4 w-4" /> Telegram @dolepp
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 w-full border-white/20 bg-transparent font-geist text-base tracking-tight text-white hover:bg-white hover:text-black sm:w-auto">
                <a href={`mailto:${MAIL}`}>{MAIL}</a>
              </Button>
              <Button type="button" onClick={copy} variant="ghost" size="lg" className="h-12 font-geist text-base tracking-tight text-zinc-300 hover:bg-white/10 hover:text-white">
                <Copy className="mr-2 h-4 w-4" /> {done ? "Скопировано" : "Скопировать почту"}
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
