import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'

export default function Accordion({ items }) {
  const base = useId()
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className="divide-y divide-line rounded-lg border border-line bg-white">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const btnId = `${base}-btn-${i}`
        const panelId = `${base}-panel-${i}`
        return (
          <div key={item.q}>
            <h3 className="text-base">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left text-lg font-bold text-ink hover:bg-mint/60"
              >
                <span>{item.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-teal-deep transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-ink-soft">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
