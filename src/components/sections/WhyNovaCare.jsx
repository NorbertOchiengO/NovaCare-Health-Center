import Container from '../layout/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import DeptIcon from '../ui/DeptIcon.jsx'
import Reveal from '../ui/Reveal.jsx'

const principles = [
  { icon: 'MessageCircle', title: 'Clear Communication', text: 'Plain language about services, visits and next steps, so you know what to expect.' },
  { icon: 'HeartHandshake', title: 'Respectful Patient Experiences', text: 'Care designed around dignity, privacy and the needs of patients and caregivers.' },
  { icon: 'Info', title: 'Accessible Service Information', text: 'Opening hours, departments and contact details that are easy to find and easy to read.' },
  { icon: 'CalendarCheck', title: 'A Straightforward Appointment Process', text: 'A short request form that asks only for what is needed to get in touch.' },
]

export default function WhyNovaCare() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-mint py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal>
          <SectionHeading
            id="about-title"
            eyebrow="About Us"
            title="Care Built Around You."
            text="NovaCare is a fictional health centre created to show how a clinic website can put patients first. These principles guide the design of every page."
          />
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2">
          {principles.map((p) => (
            <li key={p.title} className="rounded-lg border border-line bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-mint text-teal-deep">
                <DeptIcon name={p.icon} />
              </span>
              <h3 className="mt-4 text-lg">{p.title}</h3>
              <p className="mt-2 text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
