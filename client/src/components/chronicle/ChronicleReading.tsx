import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagicCta from './MagicCta'
import styles from './Flow.module.css'

interface Props {
  prose: string
  greeting?: string
  signOff?: string
  recipientName: string
  occasionLabel: string
  accent: string
  onComplete: () => void
}

/**
 * Scene 4 — The Chronicle Reading.
 * Glassmorphism card with prose that reveals paragraph by paragraph.
 * Scroll-tracked progress bar. Greeting/signoff shown as bookends.
 */
export default function ChronicleReading({
  prose,
  greeting,
  signOff,
  recipientName,
  occasionLabel,
  accent,
  onComplete,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  const paragraphs = prose.split('\n\n').filter(Boolean)
  const [showCta, setShowCta] = useState(false)

  // Show CTA after a delay or when scrolled near bottom
  useEffect(() => {
    const t = setTimeout(() => setShowCta(true), 5000)
    const unsub = scrollYProgress.on('change', (v) => {
      if (v > 0.85) setShowCta(true)
    })
    return () => { clearTimeout(t); unsub() }
  }, [scrollYProgress])

  return (
    <motion.div
      className={styles.readingStage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Progress bar */}
      <motion.div
        className={styles.progressBar}
        style={{
          scaleX: progressScaleX,
          transformOrigin: 'left',
          background: accent,
        }}
      />

      <div className={styles.readingScroll} ref={containerRef}>
        {/* Glass card */}
        <motion.div
          className={styles.glassCard}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className={styles.readingHeader}>
            <motion.div
              className={styles.readingCrest}
              style={{ color: accent }}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            >
              ✦
            </motion.div>
            <p className={styles.readingOccasion}>{occasionLabel}</p>
            <h2 className={styles.readingName}>{recipientName}</h2>
          </div>

          {/* Greeting bookend */}
          {greeting && (
            <motion.p
              className={styles.readingGreeting}
              style={{ color: accent }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              {greeting}
            </motion.p>
          )}

          {/* Prose paragraphs */}
          <motion.div
            className={styles.proseContainer}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15, delayChildren: 1 } },
            }}
          >
            {paragraphs.map((para, idx) => (
              <motion.p
                key={idx}
                className={styles.proseParagraph}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
              >
                {para}
              </motion.p>
            ))}
          </motion.div>

          {/* Sign-off bookend */}
          {signOff && (
            <motion.p
              className={styles.readingSignOff}
              style={{ color: accent }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 + paragraphs.length * 0.15, duration: 0.6 }}
            >
              {signOff}
            </motion.p>
          )}

          {/* Scroll hint */}
          <motion.div
            className={styles.scrollHint}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ↓
            </motion.span>
          </motion.div>

          {/* Continue CTA */}
          {showCta && (
            <MagicCta accent={accent} onClick={onComplete} delay={0.2}>
              Continue
            </MagicCta>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}
