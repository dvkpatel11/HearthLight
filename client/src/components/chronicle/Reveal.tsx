import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Flow.module.css'

interface Props {
  recipientName: string
  occasionLabel?: string
  accent: string
  onComplete: () => void
}

/* Animate name letter by letter with stagger */
function AnimatedName({ name, accent }: { name: string; accent: string }) {
  return (
    <motion.h1
      className={styles.revealName}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 1.5 } },
      }}
    >
      {name.split('').map((char, i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', color: i === 0 ? accent : undefined }}
          variants={{
            hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
            visible: {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              transition: { duration: 0.5, ease: 'easeOut' },
            },
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.h1>
  )
}

export default function Reveal({
  recipientName,
  occasionLabel,
  accent,
  onComplete,
}: Props) {
  const [autoAdvance, setAutoAdvance] = useState(false)

  // Auto-advance after the reveal animation completes
  useEffect(() => {
    const t = setTimeout(() => setAutoAdvance(true), 4500)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (autoAdvance) {
      const t = setTimeout(onComplete, 800)
      return () => clearTimeout(t)
    }
  }, [autoAdvance, onComplete])

  return (
    <motion.div
      className={styles.revealStage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Central light burst that fades */}
      <motion.div
        className={styles.revealBurst}
        style={{ background: `radial-gradient(circle, ${accent}44 0%, transparent 60%)` }}
        initial={{ scale: 2, opacity: 1 }}
        animate={{ scale: 3.5, opacity: 0 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
      />

      {/* Particles materialize inward */}
      <motion.div
        className={styles.revealParticleRing}
        initial={{ scale: 2.5, opacity: 0 }}
        animate={{ scale: 1, opacity: [0, 0.8, 0.4] }}
        transition={{ duration: 2, ease: 'easeOut', delay: 0.5 }}
      >
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (Math.PI * 2 * i) / 16
          const r = 120
          return (
            <motion.div
              key={i}
              className={styles.revealDot}
              style={{
                left: `calc(50% + ${Math.cos(angle) * r}px)`,
                top: `calc(50% + ${Math.sin(angle) * r}px)`,
                background: accent,
              }}
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          )
        })}
      </motion.div>

      {/* Occasion label */}
      <motion.p
        className={styles.revealOccasion}
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        {occasionLabel || 'A Chronicle'}
      </motion.p>

      {/* Name writes itself */}
      <AnimatedName name={recipientName} accent={accent} />

      {/* Subtle decorative line */}
      <motion.div
        className={styles.revealLine}
        style={{ background: accent }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.5, duration: 1, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
