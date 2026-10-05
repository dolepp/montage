import { useState } from "react"
import { Hero } from "@/components/ui/hero-1"
import { Header } from "@/components/site/Header"
import { Showreel } from "@/components/site/Showreel"
import { Facts } from "@/components/site/Facts"
import { Services } from "@/components/site/Services"
import { Works } from "@/components/site/Works"
import { Proof } from "@/components/site/Proof"
import { Process } from "@/components/site/Process"
import { Order } from "@/components/site/Order"
import { Faq } from "@/components/site/Faq"
import { FinalCta } from "@/components/site/FinalCta"
import { Footer } from "@/components/site/Footer"
import { StickyBar } from "@/components/site/StickyBar"
import { TG_URL } from "@/data/works"

export default function App() {
  const [type, setType] = useState("Длинный ролик (YouTube)")
  return (
    <>
      <Header />
      <main>
        <Hero
          eyebrow="Видеомонтаж · YouTube · Подкасты · Shorts"
          eyebrowHref="#services"
          title={
            <>
              Монтирую видео, которые{" "}
              <span className="my-1 inline-block rounded-xl bg-[#FFD93D] px-3 pb-1.5 leading-[0.95] [-webkit-text-fill-color:#0a0a0a]">досматривают</span> до конца
            </>
          }
          subtitle="Ролики для YouTube до 30 минут, нарезки подкастов и интервью, Shorts. Моушн-графика, субтитры на русском и английском, цвет и звук. Работаю по вашему ТЗ."
          ctaLabel="Обсудить проект"
          ctaHref={TG_URL}
          secondaryLabel="Смотреть работы"
          secondaryHref="#works"
        >
          <Showreel />
        </Hero>
        <Facts />
        <Services onPick={setType} />
        <Works />
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
