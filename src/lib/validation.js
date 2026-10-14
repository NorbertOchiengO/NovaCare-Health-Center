import { z } from 'zod'

// Local calendar date as YYYY-MM-DD (avoids UTC off-by-one issues).
export function todayISO() {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export const appointmentSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, 'Please enter your full name.')
    .max(80, 'Name must be 80 characters or fewer.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email address.')
    .email('Enter a valid email address, for example name@example.com.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Please enter a phone number.')
    .regex(/^\+?[0-9\s\-().]+$/, 'Use digits, spaces, and + - ( ) only.')
    .refine((v) => {
      const digits = v.replace(/\D/g, '').length
      return digits >= 7 && digits <= 15
    }, 'Phone number should contain 7 to 15 digits.'),
  departmentId: z.string().min(1, 'Please choose a department.'),
  doctorId: z.string().optional(),
  date: z
    .string()
    .min(1, 'Please choose a preferred date.')
    .refine((v) => /^\d{4}-\d{2}-\d{2}$/.test(v), 'Enter a valid date.')
    .refine((v) => v >= todayISO(), 'Please choose today or a future date.'),
  timeRange: z.string().min(1, 'Please choose a preferred time range.'),
  visitType: z.string().min(1, 'Please choose a visit type.'),
  notes: z.string().max(300, 'Notes must be 300 characters or fewer.').optional(),
})
