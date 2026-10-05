import * as Accordion from "@radix-ui/react-accordion"
import { Plus } from "lucide-react"
import { faq } from "@/data/works"
import { SectionHead } from "./Section"

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-6 pb-24 md:px-8 md:pb-32">
      <SectionHead eyebrow="Вопросы" title="Перед заказом" />
      <Accordion.Root type="single" collapsible defaultValue="item-0" className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
        {faq.map((f, i) => (
          <Accordion.Item key={f.q} value={`item-${i}`}>
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-geist text-lg font-medium tracking-tight transition-colors hover:bg-zinc-50">
                {f.q}
                <Plus className="h-5 w-5 flex-none text-gray-500 transition-transform duration-300 group-data-[state=open]:rotate-45" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <p className="px-6 pb-6 text-gray-600">{f.a}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  )
}
