import Container from './Container.jsx'
import Wordmark from '../ui/Wordmark.jsx'
import { nav, site } from '../../data/site.js'
import { departments } from '../../data/departments.js'
import { openingHours } from '../../data/openingHours.js'

const link = 'inline-flex min-h-9 items-center text-mint underline-offset-4 hover:text-white hover:underline'

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Wordmark light />
          <p className="mt-4 text-mint">A fictional health centre concept showing how clear, accessible design can help patients find services and request appointments.</p>
        </div>
        <nav aria-label="Footer">
          <h2 className="text-base !text-white">Navigate</h2>
          <ul className="mt-3">
            {nav.map((n) => <li key={n.href}><a className={link} href={n.href}>{n.label}</a></li>)}
          </ul>
        </nav>
        <nav aria-label="Departments">
          <h2 className="text-base !text-white">Departments</h2>
          <ul className="mt-3">
            {departments.map((d) => <li key={d.id}><a className={link} href={`#service-${d.id}`}>{d.name}</a></li>)}
          </ul>
        </nav>
        <div>
          <h2 className="text-base !text-white">Contact (placeholder)</h2>
          <p className="mt-3 text-mint">{site.contact.phone}<br />{site.contact.email}</p>
          <h2 className="mt-5 text-base !text-white">Opening hours</h2>
          <ul className="mt-2 text-mint">
            {openingHours.map((h) => <li key={h.days}>{h.days}: {h.hours}</li>)}
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/15">
        <Container className="space-y-2 py-6 text-sm text-mint">
          <p><strong className="text-white">Portfolio demo.</strong> NovaCare Health Centre is a fictional concept by ARCLUME LABS. It is not a real healthcare provider and offers no medical advice or services.</p>
          <p><strong className="text-white">Privacy notice.</strong> The demo appointment form runs only in your browser. Nothing you type is stored or sent anywhere. Please do not enter sensitive health information.</p>
          <p>© 2026 ARCLUME LABS. Where Ideas Become Infrastructure.</p>
        </Container>
      </div>
    </footer>
  )
}
