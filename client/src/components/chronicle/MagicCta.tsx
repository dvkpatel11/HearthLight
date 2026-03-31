import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import styles from './MagicCta.module.css'

interface Props {
  children: string
  accent: string
  onClick: () => void
  /** Minimal style — just the text, no border/bg */
  minimal?: boolean
  /** Delay before appearing */
  delay?: number
}

/**
 * Magnetic text CTA with rhythmic hover.
 * - Letters spread apart on hover
 * - Whole element magnetically follows cursor
 * - Glow pulse on hover
 * - No boring pill buttons
 */
export default function MagicCta({
  children,
  accent,
  onClick,
  minimal = false,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const [hovered, setHovered] = useState(false)

  // Magnetic follow — button shifts toward cursor
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!rect) return
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      // Magnetic pull — move up to 8px toward cursor
      mouseX.set((e.clientX - cx) * 0.12)
      mouseY.set((e.clientY - cy) * 0.12)
    },
    [mouseX, mouseY]
  )

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  // Glow intensity on hover
  const glowOpacity = useTransform(springX, [-10, 0, 10], [0.6, 0.8, 0.6])

  const letters = children.split('')

  return (
    <motion.button
      ref={ref}
      className={`${styles.magicCta} ${minimal ? styles.minimal : styles.bordered}`}
      style={{
        x: springX,
        y: springY,
        // @ts-expect-error CSS custom property
        '--accent': accent,
      }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow backdrop */}
      <motion.span
        className={styles.glow}
        style={{
          background: `radial-gradient(circle, ${accent}44 0%, transparent 70%)`,
          opacity: hovered ? glowOpacity : 0,
        }}
      />

      {/* Underline that expands on hover */}
      <motion.span
        className={styles.underline}
        style={{ background: accent }}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />

      {/* Letters with staggered spread */}
      <span className={styles.letters}>
        {letters.map((char, i) => (
          <motion.span
            key={i}
            className={styles.letter}
            animate={
              hovered
                ? {
                    letterSpacing: '0.18em',
                    y: [0, -2, 0],
                    scale: [1, 1.08, 1],
                  }
                : {
                    letterSpacing: '0.1em',
                    y: 0,
                    scale: 1,
                  }
            }
            transition={
              hovered
                ? {
                    letterSpacing: { duration: 0.3 },
                    y: {
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.04,
                      ease: 'easeInOut',
                    },
                    scale: {
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.04,
                      ease: 'easeInOut',
                    },
                  }
                : { duration: 0.3 }
            }
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    </motion.button>
  )
}
