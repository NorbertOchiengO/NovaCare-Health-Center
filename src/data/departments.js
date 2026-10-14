// Fictional concept departments. Swap in a real facility's services here.
// `icon` is a lucide-react icon name resolved in components/ui/DeptIcon.jsx.
export const departments = [
  {
    id: 'general-medicine',
    name: 'General Medicine',
    icon: 'Stethoscope',
    description: 'Routine consultations and general health assessments.',
  },
  {
    id: 'maternal-family',
    name: 'Maternal and Family Health',
    icon: 'HeartHandshake',
    description: 'General information about maternal and family healthcare services.',
  },
  {
    id: 'paediatrics',
    name: 'Paediatrics',
    icon: 'Baby',
    description: 'Healthcare services for children and young patients.',
  },
  {
    id: 'laboratory',
    name: 'Laboratory Services',
    icon: 'FlaskConical',
    description: 'Information about laboratory testing services.',
  },
  {
    id: 'dental',
    name: 'Dental Care',
    icon: 'Smile',
    description: 'General dental consultations and oral health services.',
  },
  {
    id: 'specialist',
    name: 'Specialist Consultations',
    icon: 'UserRoundSearch',
    description: 'Information about specialist appointments and referrals.',
  },
]

export const quickServices = [
  { label: 'General Consultation', icon: 'Stethoscope', href: '#service-general-medicine' },
  { label: 'Specialist Services', icon: 'UserRoundSearch', href: '#service-specialist' },
  { label: 'Laboratory Services', icon: 'FlaskConical', href: '#service-laboratory' },
  { label: 'Preventive Care', icon: 'ShieldCheck', href: '#service-general-medicine' },
]

export const visitTypes = ['In-person visit', 'Follow-up visit', 'Not sure yet']
export const timeRanges = ['Morning (8:00 to 12:00)', 'Afternoon (12:00 to 17:00)', 'Late afternoon (17:00 to 18:00)']
