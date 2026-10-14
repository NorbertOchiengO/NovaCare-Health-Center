import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2, Loader2, TriangleAlert } from 'lucide-react'
import Container from '../layout/Container.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import FormField from '../ui/FormField.jsx'
import SelectField from '../ui/SelectField.jsx'
import Button from '../ui/Button.jsx'
import { departments, visitTypes, timeRanges } from '../../data/departments.js'
import { doctors } from '../../data/doctors.js'
import { appointmentSchema, todayISO } from '../../lib/validation.js'
import { submitAppointmentRequest, formatDate } from '../../lib/appointmentHandlers.js'

const defaults = {
  fullName: '', email: '', phone: '', departmentId: '', doctorId: '',
  date: '', timeRange: '', visitType: '', notes: '',
}

export default function AppointmentSection({ prefill }) {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [summary, setSummary] = useState(null)
  const successRef = useRef(null)
  const errorRef = useRef(null)

  const {
    register, handleSubmit, watch, setValue, reset, formState: { errors },
  } = useForm({ resolver: zodResolver(appointmentSchema), defaultValues: defaults, mode: 'onTouched' })

  const departmentId = watch('departmentId')
  const doctorId = watch('doctorId')

  const doctorOptions = useMemo(
    () => doctors.filter((d) => d.departmentId === departmentId).map((d) => ({ value: d.id, label: `${d.name} (${d.specialty})` })),
    [departmentId],
  )

  // Clear a clinician that no longer matches the department.
  useEffect(() => {
    if (doctorId && !doctors.some((d) => d.id === doctorId && d.departmentId === departmentId)) {
      setValue('doctorId', '')
    }
  }, [departmentId, doctorId, setValue])

  // Apply selections made from department / clinician cards.
  useEffect(() => {
    if (!prefill) return
    setStatus((s) => (s === 'success' ? 'idle' : s))
    setValue('departmentId', prefill.departmentId || '', { shouldValidate: false })
    // Set clinician after the department-sync effect has run.
    const t = setTimeout(() => setValue('doctorId', prefill.doctorId || ''), 0)
    return () => clearTimeout(t)
  }, [prefill, setValue])

  useEffect(() => {
    if (status === 'success') successRef.current?.focus()
    if (status === 'error') errorRef.current?.focus()
  }, [status])

  const onSubmit = async (values) => {
    setStatus('submitting')
    try {
      await submitAppointmentRequest(values)
      const dept = departments.find((d) => d.id === values.departmentId)
      const doc = doctors.find((d) => d.id === values.doctorId)
      setSummary({
        service: dept?.name,
        clinician: doc?.name,
        date: formatDate(values.date),
        time: values.timeRange,
        visitType: values.visitType,
      })
      setStatus('success')
    } catch {
      setStatus('error') // form values are preserved so the person can retry
    }
  }

  const onInvalid = (errs) => {
    const first = Object.keys(errs)[0]
    if (first) document.getElementById(first === 'departmentId' ? 'departmentId' : first)?.focus()
  }

  const startOver = () => {
    reset(defaults)
    setSummary(null)
    setStatus('idle')
  }

  return (
    <section id="appointment" aria-labelledby="appointment-title" className="bg-mint py-16 sm:py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
        <div>
          <SectionHeading
            id="appointment-title"
            eyebrow="Appointments"
            title="Request Your Appointment."
            text="Tell us which service you're interested in and your preferred visit details. Our demonstration form will guide you through a simple appointment request."
          />
          <div className="mt-6 rounded-md border border-accent bg-white p-4 text-base" role="note">
            <p className="font-bold text-ink">Demonstration form</p>
            <p className="mt-1 text-ink-soft">
              This is a frontend demo, not a real booking system. Nothing is sent anywhere, no availability is checked and no appointment is made. Please do not enter medical history, diagnoses or ID numbers.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-line bg-white p-5 sm:p-8">
          <AnimatePresence mode="wait" initial={false}>
            {status === 'success' && summary ? (
              <motion.div key="success" initial={{ opacity: 0.85, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-teal-deep" aria-hidden="true" />
                  <div>
                    <h3 ref={successRef} tabIndex={-1} className="text-2xl focus:outline-none">
                      Your demo request has been completed
                    </h3>
                    <p className="mt-2 text-ink-soft">
                      This is a demonstration only. No appointment has been booked or confirmed, and no clinician availability was checked.
                    </p>
                  </div>
                </div>
                <dl className="mt-6 divide-y divide-line rounded-md border border-line">
                  {[
                    ['Selected service', summary.service],
                    summary.clinician && ['Preferred clinician', summary.clinician],
                    ['Preferred date', summary.date],
                    ['Preferred time range', summary.time],
                    ['Visit type', summary.visitType],
                  ].filter(Boolean).map(([k, v]) => (
                    <div key={k} className="grid gap-1 px-4 py-3 sm:grid-cols-[11rem_1fr]">
                      <dt className="font-bold text-ink">{k}</dt>
                      <dd className="text-ink-soft">{v}</dd>
                    </div>
                  ))}
                </dl>
                <Button onClick={startOver} variant="secondary" className="mt-6">
                  Start another demo request
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={handleSubmit(onSubmit, onInvalid)}
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                aria-describedby="form-note"
              >
                <p id="form-note" className="mb-5 text-base text-ink-soft">
                  Fields marked <span className="font-bold text-danger" aria-hidden="true">*</span>
                  <span className="sr-only">with an asterisk</span> are required.
                </p>

                {status === 'error' && (
                  <div
                    ref={errorRef}
                    tabIndex={-1}
                    role="alert"
                    className="mb-5 flex items-start gap-3 rounded-md border-2 border-danger bg-white p-4 text-ink focus:outline-none"
                  >
                    <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-danger" aria-hidden="true" />
                    <p>
                      <strong>Something went wrong.</strong> Your demo request could not be completed. Your details are still here, so you can try again.
                    </p>
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <FormField id="fullName" label="Full name" required autoComplete="name" error={errors.fullName?.message} {...register('fullName')} />
                  </div>
                  <FormField id="email" label="Email address" required type="email" autoComplete="email" inputMode="email" error={errors.email?.message} {...register('email')} />
                  <FormField id="phone" label="Phone number" required type="tel" autoComplete="tel" inputMode="tel" hint="Include your country code if you can." error={errors.phone?.message} {...register('phone')} />
                  <SelectField id="departmentId" label="Preferred department" required placeholder="Choose a department" options={departments.map((d) => ({ value: d.id, label: d.name }))} error={errors.departmentId?.message} {...register('departmentId')} />
                  <SelectField
                    id="doctorId"
                    label="Preferred clinician"
                    placeholder={departmentId ? 'No preference' : 'Choose a department first'}
                    options={doctorOptions}
                    disabled={!departmentId}
                    hint="Optional. A preference does not guarantee availability."
                    {...register('doctorId')}
                  />
                  <FormField id="date" label="Preferred appointment date" required type="date" min={todayISO()} error={errors.date?.message} {...register('date')} />
                  <SelectField id="timeRange" label="Preferred time range" required placeholder="Choose a time range" options={timeRanges.map((t) => ({ value: t, label: t }))} error={errors.timeRange?.message} {...register('timeRange')} />
                  <div className="sm:col-span-2">
                    <SelectField id="visitType" label="Visit type" required placeholder="Choose a visit type" options={visitTypes.map((t) => ({ value: t, label: t }))} error={errors.visitType?.message} {...register('visitType')} />
                  </div>
                  <div className="sm:col-span-2">
                    <FormField id="notes" label="Additional notes" multiline hint="Non-sensitive details only, up to 300 characters." error={errors.notes?.message} {...register('notes')} />
                  </div>
                </div>

                <Button type="submit" disabled={status === 'submitting'} className="mt-6 w-full sm:w-auto disabled:cursor-wait disabled:opacity-80">
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                      Submitting demo request…
                    </>
                  ) : status === 'error' ? 'Try again' : 'Submit demo request'}
                </Button>
                <p className="sr-only" role="status" aria-live="polite">
                  {status === 'submitting' ? 'Submitting your demo request' : ''}
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
