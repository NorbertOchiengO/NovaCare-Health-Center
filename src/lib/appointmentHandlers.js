// Form handling lives here, separate from the UI.
// DEMO ONLY: nothing is sent anywhere. To go live, replace the body of
// submitAppointmentRequest with a call to a secure, privacy-reviewed backend.

const DEMO_DELAY_MS = 1200

export async function submitAppointmentRequest(values) {
  await new Promise((resolve) => setTimeout(resolve, DEMO_DELAY_MS))

  // Lets reviewers exercise the error state: type "simulate error" in the notes field.
  if (values.notes && values.notes.toLowerCase().includes('simulate error')) {
    throw new Error('Demo error: the request could not be completed.')
  }

  return { ok: true, demo: true, receivedAt: new Date().toISOString() }
}

export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}
