import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TG_URL } from "@/data/works"

const nav = [
  ["Услуги", "#services"],
  ["Работы", "#works"],
  ["Процесс", "#process"],
  ["Вопросы", "#faq"],
] as const

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-200/70 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-6 md:px-8">
        <a href="#hero" className="font-geist text-xl font-semibold tracking-tighter" aria-label="DOLEPP, наверх">
          DOLEPP
        </a>
        <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Разделы">
          {nav.map(([label, href]) => (
            <a key={href} href={href} className="rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-zinc-100 hover:text-black">
              {label}
            </a>
          ))}
        </nav>
        <Button asChild size="sm" className="ml-auto font-geist md:ml-2">
          <a href={TG_URL} target="_blank" rel="noopener noreferrer">
            <Send className="mr-1.5 h-4 w-4" />
            Написать
          </a>
        </Button>
      </div>
    </header>
  )
}
