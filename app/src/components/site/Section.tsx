import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Eyebrow({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={cn(
        "font-geist mx-auto flex w-fit items-center rounded-3xl border-[2px] px-4 py-1.5 text-xs uppercase tracking-tight",
        dark ? "border-white/10 bg-white/5 text-zinc-300" : "border-gray-300/30 bg-gradient-to-tr from-zinc-300/5 via-gray-400/5 to-transparent text-gray-600",
      )}
    >
      {children}
    </span>
  )
}

export function SectionHead({ eyebrow, title, sub, dark }: { eyebrow: string; title: ReactNode; sub?: string; dark?: boolean }) {
  return (
    <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className={cn(
          "mt-5 text-balance bg-clip-text text-4xl font-semibold leading-[1.05] tracking-tighter text-transparent md:text-6xl",
          dark ? "bg-gradient-to-br from-white from-30% to-white/50" : "bg-gradient-to-br from-black from-30% to-black/50",
        )}
      >
        {title}
      </h2>
      {sub && <p className={cn("mx-auto mt-5 max-w-xl text-balance text-lg tracking-tight", dark ? "text-zinc-400" : "text-gray-600")}>{sub}</p>}
    </header>
  )
}
