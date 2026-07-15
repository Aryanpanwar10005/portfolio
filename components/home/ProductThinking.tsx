"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { thinkingSteps } from '@/content/thinking'
import { cn } from '@/lib/utils'

export function ProductThinking() {
  const [active, setActive] = useState(thinkingSteps[0].key)
  const current = thinkingSteps.find((s) => s.key === active)!

  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="label-caps mb-3">03 · How I Think</p>
          <h2 className="font-display text-section text-foreground max-w-3xl">
            Product thinking, step by <span className="font-serif-italic text-primary">step.</span>
          </h2>
        </div>

        {/* Stepper */}
        <div className="relative">
          <div className="hairline mb-6" />
          <div className="flex flex-wrap gap-x-2 gap-y-3">
            {thinkingSteps.map((step, i) => (
              <button
                key={step.key}
                onMouseEnter={() => setActive(step.key)}
                onClick={() => setActive(step.key)}
                className={cn(
                  'group flex items-baseline gap-2 px-3 py-2 -mt-6 text-sm transition-colors border-t-2',
                  active === step.key
                    ? 'border-primary text-primary'
                    : 'border-transparent text-foreground-muted hover:text-foreground'
                )}
              >
                <span className="label-caps text-xs">{String(i + 1).padStart(2, '0')}</span>
                <span className="font-medium">{step.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Panel */}
        <motion.div
          key={current.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
        >
          <div className="md:col-span-4">
            <p className="label-caps mb-2">Step</p>
            <h3 className="font-display text-large text-primary">{current.label}</h3>
          </div>
          <p className="md:col-span-8 text-xl text-foreground leading-relaxed font-serif-italic md:pt-8">
            {current.body}
          </p>
        </motion.div>
      </div>
    </section>
  )
}