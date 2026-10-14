import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Container from '../layout/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import DeptIcon from '../ui/DeptIcon.jsx'
import Reveal from '../ui/Reveal.jsx'
import { departments } from '../../data/departments.js'

export default function Departments({ onRequest }) {
  return (
    <section id="services" aria-labelledby="services-title" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            id="services-title"
            eyebrow="Our Services"
            title="Healthcare Services for Every Stage of Life."
            text="Explore our care services and find the information you need to plan your next visit."
          />
        </Reveal>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => (
            <motion.li
              key={d.id}
              id={`service-${d.id}`}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col rounded-lg border border-line bg-white p-6 hover:border-teal-deep"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-md bg-mint text-teal-deep">
                <DeptIcon name={d.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-xl">{d.name}</h3>
              <p className="mt-2 flex-1 text-ink-soft">{d.description}</p>
              <button
                type="button"
                onClick={() => onRequest({ departmentId: d.id })}
                aria-label={`Request an appointment for ${d.name}`}
                className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-md font-bold text-teal-dark underline-offset-4 hover:underline"
              >
                Request an appointment
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </motion.li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink-soft">
          Concept services for a fictional facility. A real facility would list only the services it actually offers.
        </p>
      </Container>
    </section>
  )
}
