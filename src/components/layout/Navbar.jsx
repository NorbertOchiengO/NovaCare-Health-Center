import { useEffect, useRef, useState } from 'react'
import { Menu, X, Phone, Clock } from 'lucide-react'
import Container from './Container.jsx'
import Wordmark from '../ui/Wordmark.jsx'
import Button from '../ui/Button.jsx'
import { nav, site } from '../../data/site.js'
import { openingSummary } from '../../data/openingHours.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef(null)
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-teal-dark text-white">
        <Container className="flex min-h-10 items-center justify-between gap-4 py-1.5 text-sm">
          <a href={site.contact.phoneHref} className="inline-flex items-center gap-2 font-semibold hover:underline">
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span><span className="sr-only">Call us: </span>{site.contact.phone}</span>
            <span className="hidden text-mint sm:inline">(placeholder)</span>
          </a>
          <p className="hidden items-center gap-2 md:flex">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {openingSummary}
          </p>
          <a href="#contact" className="font-semibold underline-offset-4 hover:underline">
            Contact us
          </a>
        </Container>
      </div>

      <div className={`border-b bg-warm transition-shadow ${scrolled ? 'border-line shadow-sm' : 'border-transparent'}`}>
        <Container className="flex h-[4.5rem] items-center justify-between">
          <a href="#home" aria-label="NovaCare Health Centre, back to top" className="rounded-md">
            <Wordmark />
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="rounded-md px-3.5 py-3 text-base font-semibold text-ink hover:bg-mint hover:text-teal-dark">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button href="#appointment" className="hidden !min-h-11 !py-2 lg:inline-flex">
              Request an Appointment
            </Button>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-md border-2 border-line bg-white text-teal-dark hover:bg-mint lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </Container>

        {open && (
          <div id="mobile-menu" ref={menuRef} className="border-t border-line bg-warm lg:hidden">
            <Container className="py-4">
              <nav aria-label="Mobile">
                <ul className="flex flex-col">
                  {nav.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} onClick={close} className="flex min-h-12 items-center rounded-md px-3 text-lg font-semibold text-ink hover:bg-mint">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <Button href="#appointment" onClick={close} className="mt-3 w-full">
                Request an Appointment
              </Button>
            </Container>
          </div>
        )}
      </div>
    </header>
  )
}
