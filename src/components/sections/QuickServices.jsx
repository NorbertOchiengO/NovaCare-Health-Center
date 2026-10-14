import { TriangleAlert } from 'lucide-react'
import Container from '../layout/Container.jsx'
import DeptIcon from '../ui/DeptIcon.jsx'
import { quickServices } from '../../data/departments.js'
import { site } from '../../data/site.js'

export default function QuickServices() {
  return (
    <section aria-labelledby="quick-title" className="border-y border-line bg-mint py-10">
      <Container>
        <h2 id="quick-title" className="text-xl sm:text-2xl">What are you looking for today?</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickServices.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className="flex min-h-16 items-center gap-3 rounded-md border border-line bg-white px-4 py-3 font-bold text-ink transition-colors hover:border-teal-deep hover:text-teal-dark"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-mint text-teal-deep">
                  <DeptIcon name={s.icon} />
                </span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-5 flex items-start gap-3 rounded-md border border-accent bg-white p-4 text-base text-ink" role="note">
          <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-accent-dark" aria-hidden="true" />
          <span>
            <strong>Emergency?</strong> {site.emergency}
          </span>
        </p>
      </Container>
    </section>
  )
}
