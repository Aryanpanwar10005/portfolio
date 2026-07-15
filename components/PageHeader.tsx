"use client"

import { motion } from 'framer-motion'
import { BackButton } from './BackButton'

type Props = {
  eyebrow: string
  title: React.ReactNode
  intro?: string
}

export function PageHeader({ eyebrow, title, intro }: Props) {
  return (
    <header className="pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <BackButton />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="label-caps mb-4"
      >
        {eyebrow}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="font-display text-section text-foreground max-w-4xl"
      >
        {title}
      </motion.h1>
      {intro && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-6 text-lg text-foreground-muted max-w-2xl leading-relaxed"
        >
          {intro}
        </motion.p>
      )}
      <div className="hairline-gold mt-10 max-w-24" />
    </header>
  )
}