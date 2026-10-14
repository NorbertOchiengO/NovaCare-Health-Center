import Container from '../layout/Container.jsx'
import Button from '../ui/Button.jsx'

export default function ContactCTA() {
  return (
    <section aria-labelledby="cta-title" className="bg-teal-dark py-16 sm:py-20">
      <Container className="text-center">
        <h2 id="cta-title" className="mx-auto max-w-3xl text-3xl !text-white sm:text-4xl lg:text-5xl">
          Taking the Next Step Should Feel Simple.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-mint">
          Explore our services or begin an appointment request when you're ready.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="#appointment" variant="light">Request an Appointment</Button>
          <Button href="#contact" variant="outlineLight">Contact Us</Button>
        </div>
      </Container>
    </section>
  )
}
