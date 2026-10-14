import { Clock, MapPin, Phone, Mail, ClipboardList, DoorOpen } from 'lucide-react'
import Container from '../layout/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import { openingHours } from '../../data/openingHours.js'
import { site } from '../../data/site.js'

const card = 'rounded-lg border border-line bg-white p-6'

export default function PatientInformation() {
  return (
    <section id="contact" aria-labelledby="visit-title" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading id="visit-title" eyebrow="Contact" title="Plan Your Visit." text="Practical information to help you and your family prepare. All details below are placeholders for a fictional facility." />
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className={card}>
            <h3 className="flex items-center gap-2 text-lg"><Clock className="h-5 w-5 text-teal-deep" aria-hidden="true" />Opening hours</h3>
            <dl className="mt-3 space-y-3">
              {openingHours.map((h) => (
                <div key={h.days}>
                  <dt className="font-bold">{h.days}</dt>
                  <dd className="text-ink-soft">{h.hours}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={card}>
            <h3 className="flex items-center gap-2 text-lg"><Phone className="h-5 w-5 text-teal-deep" aria-hidden="true" />Contact</h3>
            <ul className="mt-3 space-y-3">
              <li><a href={site.contact.phoneHref} className="font-bold text-teal-dark underline underline-offset-4">{site.contact.phone}</a></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-teal-deep" aria-hidden="true" /><a href={site.contact.emailHref} className="font-bold text-teal-dark underline underline-offset-4 break-all">{site.contact.email}</a></li>
            </ul>
            <p className="mt-3 text-sm text-ink-soft">{site.contact.note}</p>
          </div>

          <div className={card}>
            <h3 className="flex items-center gap-2 text-lg"><MapPin className="h-5 w-5 text-teal-deep" aria-hidden="true" />Location</h3>
            <address className="mt-3 not-italic text-ink-soft">
              {site.location.lines.map((l) => <span key={l} className="block">{l}</span>)}
            </address>
            <p className="mt-3 text-sm text-ink-soft">{site.location.note}</p>
          </div>

          <div className={card}>
            <h3 className="flex items-center gap-2 text-lg"><ClipboardList className="h-5 w-5 text-teal-deep" aria-hidden="true" />Preparing for your visit</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-ink-soft">
              <li>Bring a list of questions you would like to ask.</li>
              <li>Bring any documents the facility has asked you to bring.</li>
              <li>Arrive a little early to allow time to check in.</li>
              <li>Caregivers are welcome to attend with the patient.</li>
            </ul>
          </div>

          <div className={`${card} md:col-span-2 lg:col-span-2`}>
            <h3 className="flex items-center gap-2 text-lg"><DoorOpen className="h-5 w-5 text-teal-deep" aria-hidden="true" />What to expect</h3>
            <ol className="mt-3 grid gap-3 text-ink-soft sm:grid-cols-3">
              <li><strong className="block text-ink">1. Check in</strong>Reception confirms your details and the reason for your visit.</li>
              <li><strong className="block text-ink">2. Consultation</strong>You meet your clinician, who explains next steps in plain language.</li>
              <li><strong className="block text-ink">3. Follow-up</strong>Any further visits or tests are explained before you leave.</li>
            </ol>
          </div>
        </div>
      </Container>
    </section>
  )
}
