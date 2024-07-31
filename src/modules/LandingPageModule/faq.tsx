'use client'
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion'
import { AnimatedSection } from '@/components/ui/animated-section'
import { AnimatedTitle } from '@/components/ui/animated-title'

interface FAQProps {
  question: string
  answer: string
}

const FAQItems: FAQProps[] = [
  {
    question:
      'Data apa saja yang dibutuhkan saat mengisi suara pada PEMILOS SMANIKA tahun ini?',
    answer: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  {
    question:
      'Bagaimana jika terjadi kendala atapun kesalahan saat mengisi data untuk website PEMILOS SMANIKA 2024?',
    answer:
      'Yes. It comes with default styles that matches the other components aesthetic.',
  },
  {
    question:
      'Apa yang harus dilakukan jika saya tidak bisa menghadiri sesi pemilihan secara langsung?',
    answer:
      "Yes. It's animated by default, but you can disable it if you prefer.",
  },
]

/* eslint-disable react/react-in-jsx-scope */
export const FAQSection = () => {
  return (
    <section
      id="faq"
      className="w-full font-manrope flex flex-col gap-10 my-10 relative"
    >
      <AnimatedTitle>
        Masih Bingung? <br /> Yuk Baca
        <b className="text-purple-primary"> FAQ </b> Berikut
      </AnimatedTitle>
      <AnimatedSection>
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4"
        >
          {
            // token &&
            FAQItems.map((item, index) => {
              return (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              )
            })
          }
        </Accordion>
      </AnimatedSection>
    </section>
  )
}
