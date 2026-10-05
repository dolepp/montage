import { useMemo, useState } from "react"
import { Check, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MAIL, TG_URL } from "@/data/works"
import { cn } from "@/lib/utils"
import { Reveal } from "./Reveal"
import { SectionHead } from "./Section"

const TYPES = ["Длинный ролик (YouTube)", "Нарезка интервью/подкаста", "Shorts / Reels / TikTok", "Другое"]
const TYPE_LABEL: Record<string, string> = { "Длинный ролик (YouTube)": "Длинный ролик", "Нарезка интервью/подкаста": "Нарезка интервью", "Shorts / Reels / TikTok": "Shorts / Reels", "Другое": "Другое" }
const LENS = ["до 1 минуты", "1–10 минут", "10–30 минут", "больше 30 минут"]
const WHENS = ["срочно, 1–2 дня", "в течение недели", "не горит"]
const HAVE = ["озвучка", "видеозапись", "фото", "музыка", "референс"]

function Chip({ on, onClick, children, role = "radio" }: { on: boolean; onClick: () => void; children: string; role?: string }) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={on}
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        on ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400",
      )}
    >
      {children}
    </button>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-3">
      <legend className="mb-3 font-mono text-xs uppercase tracking-wide text-gray-500">{title}</legend>
      <div className="flex flex-wrap gap-2" role="group">{children}</div>
    </fieldset>
  )
}

export function Order({ type, setType }: { type: string; setType: (t: string) => void }) {
  const [len, setLen] = useState(LENS[2])
  const [when, setWhen] = useState(WHENS[1])
  const [have, setHave] = useState<string[]>([])
  const [note, setNote] = useState("")
  const [hint, setHint] = useState("Текст скопируется сам. В Telegram останется вставить его в чат.")

  const text = useMemo(
    () =>
      [
        "Здравствуйте! Хочу заказать монтаж.",
        `Что нужно: ${type}`,
        `Длительность: ${len}`,
        `Срок: ${when}`,
        `Что уже есть: ${have.join(", ") || "уточню в переписке"}`,
        note.trim() ? `Пожелания: ${note.trim()}` : "",
        "",
        "Расскажите, как будем работать и сколько это стоит?",
      ]
        .filter((l, i, a) => l !== "" || a[i - 1] !== "")
        .join("\n"),
    [type, len, when, have, note],
  )

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    window.open(`${TG_URL}?text=${encodeURIComponent(text)}`, "_blank", "noopener")
    copy().then((ok) => setHint(ok ? "Текст скопирован. Вставьте его в чат Telegram" : "Откройте чат и опишите задачу своими словами"))
  }

  const toggle = (v: string) => setHave((h) => (h.includes(v) ? h.filter((x) => x !== v) : [...h, v]))
  const mailto = `mailto:${MAIL}?subject=${encodeURIComponent("Заказ монтажа")}&body=${encodeURIComponent(text)}`

  return (
    <section id="order" className="scroll-mt-20 border-y border-zinc-200 bg-zinc-50 px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Заявка" title="Бриф за полминуты" sub="Выберите, что нужно. Я подготовлю сообщение, вам останется отправить его в Telegram. Так мне проще сразу назвать срок и цену." />
        <Reveal>
          <form onSubmit={submit} className="mx-auto max-w-3xl space-y-7 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm md:p-10">
            <Group title="Что нужно сделать">
              {TYPES.map((t) => <Chip key={t} on={type === t} onClick={() => setType(t)}>{TYPE_LABEL[t]}</Chip>)}
            </Group>
            <Group title="Длительность готового видео">
              {LENS.map((t) => <Chip key={t} on={len === t} onClick={() => setLen(t)}>{t}</Chip>)}
            </Group>
            <Group title="Когда нужно">
              {WHENS.map((t) => <Chip key={t} on={when === t} onClick={() => setWhen(t)}>{t}</Chip>)}
            </Group>
            <Group title="Что уже есть">
              {HAVE.map((t) => <Chip key={t} role="checkbox" on={have.includes(t)} onClick={() => toggle(t)}>{t}</Chip>)}
            </Group>
            <label className="block">
              <span className="mb-3 block font-mono text-xs uppercase tracking-wide text-gray-500">Пожелания или ссылка на референс</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Например: «как в этом ролике…», нужны субтитры на английском"
                className="w-full resize-y rounded-xl border border-zinc-200 bg-white p-4 text-base outline-none transition-colors placeholder:text-zinc-400 focus:border-zinc-950"
              />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" size="lg" className="h-12 font-geist text-base tracking-tight">
                <Send className="mr-2 h-4 w-4" /> Отправить в Telegram
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 font-geist text-base tracking-tight">
                <a href={mailto}>Написать на почту</a>
              </Button>
            </div>
            <p className="flex items-start gap-2 text-sm text-gray-500" role="status" aria-live="polite">
              <Check className="mt-0.5 h-4 w-4 flex-none" /> {hint}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
