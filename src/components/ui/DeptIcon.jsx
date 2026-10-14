import {
  Stethoscope, HeartHandshake, Baby, FlaskConical, Smile, UserRoundSearch, ShieldCheck,
  MessageCircle, HeartPulse, Info, CalendarCheck,
} from 'lucide-react'

const icons = { Stethoscope, HeartHandshake, Baby, FlaskConical, Smile, UserRoundSearch, ShieldCheck, MessageCircle, HeartPulse, Info, CalendarCheck }

export default function DeptIcon({ name, className = 'h-6 w-6' }) {
  const Icon = icons[name] || Stethoscope
  return <Icon className={className} aria-hidden="true" />
}
