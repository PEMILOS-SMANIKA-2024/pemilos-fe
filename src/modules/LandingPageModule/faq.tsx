import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion'

/* eslint-disable react/react-in-jsx-scope */
export const FAQSection = () => {
  return (
    <section
      id="faq"
      className="w-full font-manrope flex flex-col gap-10 my-10 relative"
    >
      <h1 className="font-extrabold text-3xl md:text-5xl text-center">
        Masih Bingung? <br /> Yuk Baca
        <b className="text-purple-primary"> FAQ </b> Berikut
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full flex flex-col gap-4"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
