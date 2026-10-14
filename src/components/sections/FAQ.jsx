import Container from '../layout/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Accordion from '../ui/Accordion.jsx'
import Reveal from '../ui/Reveal.jsx'
import { faqs } from '../../data/faqs.js'

export default function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-mint py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <SectionHeading id="faq-title" eyebrow="FAQ" title="Frequently Asked Questions." text="Quick answers about finding services and requesting an appointment. For medical questions, please speak with a qualified clinician." />
        </Reveal>
        <Accordion items={faqs} />
      </Container>
    </section>
  )
}
