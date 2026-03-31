import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import MagicCta from './MagicCta'
import styles from './Flow.module.css'

interface Props {
  signOff?: string
  senderName?: string
  accent: string
  particleColor: string
  onComplete: () => void
}

/* Rising ember particles that dissolve upward */
function useEmbers(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  color: string,
  active: boolean
) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !active) return
    const ctx = canvas.getContext('2d')!
    let raf: number

    const W = (canvas.width = window.innerWidth)
    const H = (canvas.height = window.innerHeight)

    interface Ember {
      x: number; y: number; vy: number; vx: number
      size: number; opacity: number; twinkle: number
    }

    const embers: Ember[] = Array.from({ length: 30 }, () => ({
      x: W * 0.3 + Math.random() * W * 0.4,
      y: H * 0.5 + Math.random() * H * 0.3,
      vy: -(0.3 + Math.random() * 0.8),
      vx: (Math.random() - 0.5) * 0.3,
      size: 1 + Math.random() * 2.5,
      opacity: 0.6 + Math.random() * 0.4,
      twinkle: Math.random() * Math.PI * 2,
    }))

    function draw() {
      ctx.clearRect(0, 0, W, H)
      for (const e of embers) {
        e.y += e.vy
        e.x += e.vx + Math.sin(e.twinkle) * 0.15
        e.twinkle += 0.03
        e.opacity -= 0.002

        if (e.opacity <= 0) {
          e.y = H * 0.6 + Math.random() * H * 0.2
          e.x = W * 0.3 + Math.random() * W * 0.4
          e.opacity = 0.6 + Math.random() * 0.4
        }

        // Twinkle: brief flash
        const flash = Math.sin(e.twinkle * 3) > 0.9 ? 1.5 : 1
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.size * flash, 0, Math.PI * 2)
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${e.opacity})`)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [canvasRef, color, active])
}

export default function Farewell({
  signOff,
  senderName,
  accent,
  particleColor,
  onComplete,
}: Props) {
  const [showEmbers, setShowEmbers] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setShowEmbers(true), 1500)
    return () => clearTimeout(t)
  }, [])

  useEmbers(canvasRef, particleColor, showEmbers)

  // Build the sign-off display
  const signOffText = signOff || 'With warmth,'
  const senderDisplay = senderName || ''

  return (
    <motion.div
      className={styles.farewellStage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Ember canvas */}
      <canvas ref={canvasRef} className={styles.farewellCanvas} />

      <motion.div className={styles.farewellContent}>
        {/* Sign-off text — handwritten style */}
        <motion.div
          className={styles.farewellSignOff}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <p className={styles.farewellText} style={{ color: accent }}>
            {signOffText}
          </p>
          {senderDisplay && (
            <motion.p
              className={styles.farewellSender}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              — {senderDisplay}
            </motion.p>
          )}
        </motion.div>

        {/* Decorative fading line */}
        <motion.div
          className={styles.farewellLine}
          style={{ background: `linear-gradient(90deg, transparent, ${accent}66, transparent)` }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 2, duration: 1.2 }}
        />

        {/* Continue to afterglow */}
        <MagicCta accent={accent} onClick={onComplete} delay={3} minimal>
          Continue
        </MagicCta>
      </motion.div>
    </motion.div>
  )
}
