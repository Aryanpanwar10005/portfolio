import { motion } from 'framer-motion'
import { values } from '@/content/tools'

export function Philosophy() {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto">
        <p className="label-caps mb-8 text-primary-foreground">08 · Product Philosophy</p>
        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display text-large md:text-section leading-[1.05] max-w-5xl text-primary-foreground"
        >
          "The PM job isn't to have the best ideas. It's to make sure the team ships
          the <span className="font-serif-italic text-accent">right ones</span>, for the right users, with the right restraint."
        </motion.blockquote>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-primary-foreground/20 pt-10">
          {values.map((v, i) => (
            <motion.div
              key={v}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <p className="label-caps text-primary-foreground mb-2">0{i + 1}</p>
              <h3 className="font-display text-xl md:text-2xl">{v}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}