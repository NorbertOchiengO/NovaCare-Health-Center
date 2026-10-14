# NovaCare Health Centre

A fictional healthcare website concept by **ARCLUME LABS — Where Ideas Become Infrastructure.**
Portfolio demo only. NovaCare is not a real provider; all contact details, clinicians and services are placeholders.

## Stack
React (JSX) · Vite · Tailwind CSS v4 · Motion (`motion/react`) · Lucide React · React Hook Form + Zod

## Run
```bash
npm install
npm run dev      # local dev server
npm run build    # production build to dist/
npm run preview  # serve the production build
npm test         # vitest + Testing Library (forms, accordion, nav, filtering, anchors)
```

## Where to edit content
| File | Purpose |
| --- | --- |
| `src/data/site.js` | Name, placeholder phone/email/address, emergency guidance, nav |
| `src/data/departments.js` | Services, quick links, visit types, time ranges |
| `src/data/doctors.js` | Fictional clinicians (placeholder credentials) |
| `src/data/faqs.js`, `openingHours.js` | FAQ and hours |
| `src/lib/validation.js` | Zod schema for the appointment form |
| `src/lib/appointmentHandlers.js` | Form submission logic. **Demo only; swap for a secure backend** |

## Demo behaviour
- The appointment form validates in the browser and shows a demo confirmation. Nothing is sent or stored.
- To preview the error state, type `simulate error` in the notes field and submit.

## Before real use
- Replace `public/images/hero.svg` with licensed photography (keep the alt text accurate).
- Replace all placeholder details and clinician data with verified information.
- Any real appointment handling needs separate security, privacy and compliance scoping.

## Deploy to Vercel
1. Push this folder to a Git repository.
2. In Vercel choose **Add New → Project**, import the repo.
3. Framework preset: **Vite**. Build command `npm run build`, output directory `dist`.
4. Deploy. The site is fully static and needs no environment variables.
