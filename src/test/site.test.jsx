import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../pages/Home.jsx'
import { appointmentSchema, todayISO } from '../lib/validation.js'

const valid = {
  fullName: 'Jane Demo', email: 'jane@example.com', phone: '+254 700 000 000',
  departmentId: 'general-medicine', doctorId: '', date: todayISO(),
  timeRange: 'Morning (8:00 to 12:00)', visitType: 'In-person visit', notes: '',
}

describe('validation', () => {
  it('accepts valid data', () => expect(appointmentSchema.safeParse(valid).success).toBe(true))
  it('rejects bad email, phone and past date', () => {
    const r = appointmentSchema.safeParse({ ...valid, email: 'nope', phone: 'abc', date: '2000-01-01' })
    expect(r.success).toBe(false)
    const keys = r.error.issues.map((i) => i.path[0])
    expect(keys).toEqual(expect.arrayContaining(['email', 'phone', 'date']))
  })
})

async function fillValid(user) {
  await user.type(screen.getByLabelText(/full name/i), 'Jane Demo')
  await user.type(screen.getByLabelText(/email address/i), 'jane@example.com')
  await user.type(screen.getByLabelText(/phone number/i), '+254 700 000 000')
  await user.selectOptions(screen.getByLabelText(/preferred department/i), 'general-medicine')
  await user.type(screen.getByLabelText(/preferred appointment date/i), todayISO())
  await user.selectOptions(screen.getByLabelText(/preferred time range/i), 'Morning (8:00 to 12:00)')
  await user.selectOptions(screen.getByLabelText(/visit type/i), 'In-person visit')
}

describe('appointment form', () => {
  it('shows inline errors and keeps entered data', async () => {
    const user = userEvent.setup()
    render(<Home />)
    await user.type(screen.getByLabelText(/full name/i), 'Jane Demo')
    await user.click(screen.getByRole('button', { name: /submit demo request/i }))
    expect(await screen.findByText(/enter your email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toHaveValue('Jane Demo')
  })

  it('rejects a past date', async () => {
    const user = userEvent.setup()
    render(<Home />)
    await fillValid(user)
    const date = screen.getByLabelText(/preferred appointment date/i)
    await user.clear(date)
    await user.type(date, '2020-01-01')
    await user.click(screen.getByRole('button', { name: /submit demo request/i }))
    expect(await screen.findByText(/today or a future date/i)).toBeInTheDocument()
  })

  it('filters clinicians by department', async () => {
    const user = userEvent.setup()
    render(<Home />)
    await user.selectOptions(screen.getByLabelText(/preferred department/i), 'paediatrics')
    const doc = screen.getByLabelText(/preferred clinician/i)
    expect(within(doc).getByRole('option', { name: /Tobi Placeholder/ })).toBeInTheDocument()
    expect(within(doc).queryByRole('option', { name: /Amani Demo/ })).toBeNull()
  })

  it('shows the demo success state with selections', async () => {
    const user = userEvent.setup()
    render(<Home />)
    await fillValid(user)
    await user.click(screen.getByRole('button', { name: /submit demo request/i }))
    expect(await screen.findByText(/your demo request has been completed/i, {}, { timeout: 4000 })).toBeInTheDocument()
    expect(screen.getByText('General Medicine', { selector: 'dd' })).toBeInTheDocument()
    expect(screen.getByText(/Morning \(8:00 to 12:00\)/, { selector: 'dd' })).toBeInTheDocument()
    expect(screen.queryByText(/confirmed/i, { selector: 'h3' })).toBeNull()
  })

  it('shows an error state and preserves data', async () => {
    const user = userEvent.setup()
    render(<Home />)
    await fillValid(user)
    await user.type(screen.getByLabelText(/additional notes/i), 'simulate error')
    await user.click(screen.getByRole('button', { name: /submit demo request/i }))
    expect(await screen.findByRole('alert', {}, { timeout: 4000 })).toHaveTextContent(/something went wrong/i)
    expect(screen.getByLabelText(/full name/i)).toHaveValue('Jane Demo')
    expect(screen.getByRole('button', { name: /try again/i })).toBeEnabled()
  })

  it('clinician card pre-selects department and clinician', async () => {
    const user = userEvent.setup()
    render(<Home />)
    await user.click(screen.getByRole('button', { name: /request appointment with Dr. Tobi Placeholder/i }))
    await waitFor(() => {
      expect(screen.getByLabelText(/preferred department/i)).toHaveValue('paediatrics')
      expect(screen.getByLabelText(/preferred clinician/i)).toHaveValue('dr-tobi-placeholder')
    })
  })
})

describe('interactions', () => {
  it('filters the clinician directory', async () => {
    const user = userEvent.setup()
    render(<Home />)
    await user.click(screen.getByRole('button', { name: 'Dental Care' }))
    expect(screen.getByRole('button', { name: 'Dental Care' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Dr. Nia Mock')).toBeInTheDocument()
    expect(screen.queryByText('Dr. Amani Demo')).toBeNull()
  })

  it('FAQ accordion toggles with aria-expanded', async () => {
    const user = userEvent.setup()
    render(<Home />)
    const btn = screen.getByRole('button', { name: /does submitting the demo form confirm a booking/i })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    await user.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(/no appointment is booked/i)).toBeInTheDocument()
    btn.focus()
    await user.keyboard('{Enter}')
    await waitFor(() => expect(btn).toHaveAttribute('aria-expanded', 'false'))
  })

  it('mobile menu opens, closes on link select and on Escape', async () => {
    const user = userEvent.setup()
    render(<Home />)
    const toggle = screen.getByRole('button', { name: /open menu/i })
    await user.click(toggle)
    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute('aria-expanded', 'true')
    await user.click(within(screen.getByRole('navigation', { name: 'Mobile' })).getByRole('link', { name: 'Our Services' }))
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).toBeNull()
    await user.click(screen.getByRole('button', { name: /open menu/i }))
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).toBeNull()
  })

  it('every in-page link points to an existing id', () => {
    const { container } = render(<Home />)
    const hrefs = [...container.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute('href').slice(1))
    for (const id of new Set(hrefs)) expect(container.querySelector(`#${id}`), id).not.toBeNull()
  })
})
