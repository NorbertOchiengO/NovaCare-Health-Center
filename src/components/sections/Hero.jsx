import { motion } from 'motion/react'
import { Stethoscope, FlaskConical, Baby, ArrowRight } from 'lucide-react'
import Container from '../layout/Container.jsx'
import Button from '../ui/Button.jsx'
import HeroImg from '../../assets/hero.jpg'

const fade = (delay = 0) => ({
  initial: { opacity: 0.9, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
})

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="bg-warm">
      <Container className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
        <div>
          <motion.p {...fade(0)} className="mb-4 inline-block rounded-md bg-mint px-3 py-1.5 text-sm font-bold text-teal-dark">
            Care That Puts You First.
          </motion.p>
          <motion.h1 {...fade(0.05)} id="hero-title" className="text-4xl sm:text-5xl lg:text-6xl">
            Your Health Deserves Thoughtful Care.
          </motion.h1>
          <motion.p {...fade(0.1)} className="mt-5 max-w-xl text-lg text-ink-soft sm:text-xl">
            Discover accessible healthcare services, compassionate clinicians, and a straightforward way to request your next appointment.
          </motion.p>
          <motion.div {...fade(0.15)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#appointment">Request an Appointment</Button>
            <Button href="#services" variant="secondary">
              Explore Our Services <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </motion.div>
          <motion.p {...fade(0.2)} className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-base font-semibold text-ink">
            <span className="inline-flex items-center gap-2"><Stethoscope className="h-5 w-5 text-teal-deep" aria-hidden="true" />General medicine</span>
            <span className="inline-flex items-center gap-2"><Baby className="h-5 w-5 text-teal-deep" aria-hidden="true" />Family and children</span>
            <span className="inline-flex items-center gap-2"><FlaskConical className="h-5 w-5 text-teal-deep" aria-hidden="true" />Laboratory</span>
          </motion.p>
        </div>

        <motion.figure {...fade(0.1)} className="relative m-0">
          <div className="aspect-[4/3] overflow-hidden rounded-lg border border-line bg-mint sm:aspect-[5/4]">
            <img
              src={HeroImg}
              width="800"
              height="640"
              alt="Illustration of a clinician speaking with a patient across a consultation desk"
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
          </div>
          <figcaption className="mt-3 text-sm text-ink-soft">
            Concept illustration. Replace with licensed photography of a real clinician and patient before launch.
          </figcaption>
        </motion.figure>
      </Container>
    </section>
  )
}
