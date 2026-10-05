import { MAIL, TG_URL } from "@/data/works"
import { asset } from "@/lib/asset"

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white px-6 py-12 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:justify-between">
        <div>
          <a href="#hero" className="flex items-center gap-2.5 font-geist text-lg font-semibold tracking-tighter">
            <img src={asset("favicon.svg")} width={28} height={28} alt="" />
            DOLEPP
          </a>
          <p className="mt-4 text-sm text-gray-600">
            <a className="hover:text-black" href={TG_URL} target="_blank" rel="noopener noreferrer">t.me/dolepp</a>
            {" · "}
            <a className="hover:text-black" href={`mailto:${MAIL}`}>{MAIL}</a>
          </p>
        </div>
        <p className="max-w-2xl text-xs leading-relaxed text-gray-500">
          Демонстрационные работы смонтированы из открытых материалов и материалов, предоставленных для обработки. Права на исходные видео принадлежат их авторам. Подкасты: Динара Сатжан, «Маткульт-привет!», The Royal Society (CC BY 3.0, Wikimedia Commons). На сайте показан только мой монтаж, графика и субтитры.
        </p>
      </div>
    </footer>
  )
}
