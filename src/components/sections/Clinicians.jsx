import { useState } from 'react'
import { motion } from 'motion/react'
import Container from '../layout/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'
import { doctors } from '../../data/doctors.js'
import { departments } from '../../data/departments.js'

export default function Clinicians({ onRequest }) {
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? doctors : doctors.filter((d) => d.departmentId === filter)
  const options = [{ id: 'all', name: 'All specialties' }, ...departments.filter((d) => doctors.some((x) => x.departmentId === d.id))]

  return (
    <section id="doctors" aria-labelledby="doctors-title" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            id="doctors-title"
            eyebrow="Our Doctors"
            title="Meet the People Behind Your Care."
            text="These are fictional portfolio-demo profiles. Names, specialties and credentials are placeholders to be replaced with verified information."
          />
        </Reveal>

        <div role="group" aria-label="Filter clinicians by specialty" className="mt-8 flex flex-wrap gap-2">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              aria-pressed={filter === o.id}
              onClick={() => setFilter(o.id)}
              className={`min-h-11 rounded-md border-2 px-4 text-base font-bold transition-colors ${
                filter === o.id ? 'border-teal-deep bg-teal-deep text-white' : 'border-line bg-white text-ink hover:border-teal-deep'
              }`}
            >
              {o.name}
            </button>
          ))}
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          Showing {shown.length} {shown.length === 1 ? 'clinician' : 'clinicians'}
        </p>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((d) => (
            <motion.li
              layout
              key={d.id}
              className="flex flex-col rounded-lg border border-line bg-white p-6"
            >
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-mint text-xl font-extrabold text-teal-dark"
                >
                  {d.initials}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg break-words">{d.name}</h3>
                  <p className="text-base font-semibold text-teal-dark">{d.specialty}</p>
                </div>
              </div>
              <p className="mt-4 text-ink-soft">{d.intro}</p>
              <p className="mt-3 text-sm text-ink-soft">
                <span className="font-bold text-ink">Qualifications:</span> {d.credentials}
              </p>
              <p className="mt-3 inline-block self-start rounded bg-mint px-2 py-1 text-xs font-bold text-teal-dark">
                Fictional demo profile
              </p>
              <button
                type="button"
                onClick={() => onRequest({ departmentId: d.departmentId, doctorId: d.id })}
                aria-label={`Request appointment with ${d.name}`}
                className="mt-5 inline-flex min-h-11 items-center self-start rounded-md font-bold text-teal-dark underline-offset-4 hover:underline"
              >
                Request appointment
              </button>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
