import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Flow.module.css'

interface Props {
  greeting: string
  accent: string
  onComplete: () => void
}

/**
 * Scene 3 — The sender's greeting appears in handwritten style,
 * revealed character by character as if being written in real-time.
 */
export default function Greeting({ greeting, accent, onComplete }: Props) {
  const [visibleChars, setVisibleChars] = useState(0)

  // Typewriter effect — one char at a time
  useEffect(() => {
    if (visibleChars >= greeting.length) {
      // Hold for a beat after writing completes, then advance
      const t = setTimeout(onComplete, 2000)
      return () => clearTimeout(t)
    }
    const speed = greeting[visibleChars] === ' ' ? 30 : 55
    const t = setTimeout(() => setVisibleChars((v) => v + 1), speed)
    return () => clearTimeout(t)
  }, [visibleChars, greeting, onComplete])

  return (
    <motion.div
      className={styles.greetingStage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className={styles.greetingCard}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <p className={styles.greetingText} style={{ color: accent }}>
          {greeting.slice(0, visibleChars)}
          <motion.span
            className={styles.greetingCursor}
            style={{ background: accent }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity }}
          />
        </p>
      </motion.div>
    </motion.div>
  )
}
