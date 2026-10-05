import { useEffect, useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TG_URL } from "@/data/works"

/** Mobile-only bottom CTA: appears after the hero, hides near the order form and final block. */
export function StickyBar() {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const flags = { hero: true, order: false, contact: false }
    const update = () => setOn(!flags.hero && !flags.order && !flags.contact)
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          flags[e.target.id as keyof typeof flags] = e.isIntersecting
          update()
        }),
      { threshold: 0.05 },
    )
    ;(["hero", "order", "contact"] as const).forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200 bg-white/90 p-3 backdrop-blur transition-transform duration-300 md:hidden ${on ? "translate-y-0" : "translate-y-full"}`}>
      <Button asChild size="lg" variant="accent" className="h-12 w-full font-geist text-base tracking-tight">
        <a href={TG_URL} target="_blank" rel="noopener noreferrer">
          <Send className="mr-2 h-4 w-4" /> Написать в Telegram
        </a>
      </Button>
    </div>
  )
}
