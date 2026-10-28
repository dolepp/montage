import { useState } from "react"
import { Hero } from "@/components/ui/hero-1"
import { Header } from "@/components/site/Header"
import { Showreel } from "@/components/site/Showreel"
import { Facts } from "@/components/site/Facts"
import { Services } from "@/components/site/Services"
import { Pricing } from "@/components/site/Pricing"
import { Covers } from "@/components/site/Covers"
import { Works } from "@/components/site/Works"
import { Proof } from "@/components/site/Proof"
import { Process } from "@/components/site/Process"
import { Order } from "@/components/site/Order"
import { Faq } from "@/components/site/Faq"
import { FinalCta } from "@/components/site/FinalCta"
import { Footer } from "@/components/site/Footer"
import { StickyBar } from "@/components/site/StickyBar"
import { SHOW_REELS, TG_URL } from "@/data/works"

export default function App() {
  const [type, setType] = useState("Рекламный ролик для товара")
  return (
    <>
      <Header />
      <main>
        <Hero
          eyebrow="ИИ-видео для бизнеса"
          eyebrowHref="#works"
          title={
            <>
              Рекламные ролики без съёмок:{" "}
              <span className="my-1 inline-block rounded-xl bg-[#FFD93D] px-3 pb-1.5 leading-[0.95] [-webkit-text-fill-color:#0a0a0a]">нейросеть</span> и монтаж
            </>
          }
          subtitle="Делаю ИИ-видео для товаров, недвижимости, кофеен и брендов: сцены по вашему фото или идее, подписи, музыка и готовые форматы для Reels, ленты и сайта."
          ctaLabel="Смотреть работы"
          ctaHref="#works"
          secondaryLabel="Обсудить проект"
          secondaryHref={TG_URL}
        >
          <Showreel />
        </Hero>
        {SHOW_REELS && <Covers />}
        <Works />
        <Facts />
        <Services onPick={setType} />
        <Pricing onPick={setType} />
        <Proof />
        <Process />
        <Order type={type} setType={setType} />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyBar />
    </>
  )
}
