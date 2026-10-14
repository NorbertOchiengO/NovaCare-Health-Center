import { useCallback, useState } from 'react'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import Hero from '../components/sections/Hero.jsx'
import QuickServices from '../components/sections/QuickServices.jsx'
import Departments from '../components/sections/Departments.jsx'
import WhyNovaCare from '../components/sections/WhyNovaCare.jsx'
import Clinicians from '../components/sections/Clinicians.jsx'
import AppointmentSection from '../components/sections/AppointmentSection.jsx'
import PatientInformation from '../components/sections/PatientInformation.jsx'
import FAQ from '../components/sections/FAQ.jsx'
import ContactCTA from '../components/sections/ContactCTA.jsx'

export default function Home() {
  const [prefill, setPrefill] = useState(null)

  // Department and clinician cards pre-select the form, then scroll to it.
  const requestAppointment = useCallback((selection) => {
    setPrefill({ ...selection, nonce: Date.now() })
    document.getElementById('appointment')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => document.getElementById('fullName')?.focus({ preventScroll: true }), 500)
  }, [])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:font-bold">
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <QuickServices />
        <Departments onRequest={requestAppointment} />
        <WhyNovaCare />
        <Clinicians onRequest={requestAppointment} />
        <AppointmentSection prefill={prefill} />
        <PatientInformation />
        <FAQ />
        <ContactCTA />
      </main>
      <Footer />
    </>
  )
}
