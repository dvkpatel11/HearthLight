import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Flow.module.css'

interface Props {
  recipientName: string
  occasionLabel?: string
  accent: string
  particleColor: string
  onOpen: () => void
}

/* Occasion → wax seal icon */
function getSealIcon(label?: string): string {
  if (!label) return '✦'
  const l = label.toLowerCase()
  if (l.includes('birthday')) return '🎂'
  if (l.includes('anniversary') || l.includes('wedding')) return '💍'
  if (l.includes('graduation')) return '🎓'
  if (l.includes('farewell')) return '✈️'
  if (l.includes('holiday')) return '🎄'
  return '✦'
}

/* Tiny canvas particles orbiting the envelope */
function useEnvelopeParticles(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  color: string,
  active: boolean
) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !active) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    const W = (canvas.width = 400)
    const H = (canvas.height = 500)
    const cx = W / 2
    const cy = H / 2

    const dots = Array.from({ length: 24 }, (_, i) => ({
      angle: (Math.PI * 2 * i) / 24 + Math.random() * 0.5,
      radius: 140 + Math.random() * 60,
      speed: 0.002 + Math.random() * 0.003,
      size: Math.random() * 2 + 0.8,
      opacity: Math.random() * 0.5 + 0.2,
    }))

    function draw() {
      ctx.clearRect(0, 0, W, H)
      for (const d of dots) {
        d.angle += d.speed
        const x = cx + Math.cos(d.angle) * d.radius
        const y = cy + Math.sin(d.angle) * d.radius * 0.7
        ctx.beginPath()
        ctx.arc(x, y, d.size, 0, Math.PI * 2)
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${d.opacity})`)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(raf)
  }, [canvasRef, color, active])
}

export default function Envelope({
  recipientName,
  occasionLabel,
  accent,
  particleColor,
  onOpen,
}: Props) {
  const [opened, setOpened] = useState(false)
  const [showPrompt, setShowPrompt] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sealIcon = getSealIcon(occasionLabel)

  useEnvelopeParticles(canvasRef, particleColor, !opened)

  // Show "tap to open" after the envelope settles
  useEffect(() => {
    const t = setTimeout(() => setShowPrompt(true), 1800)
    return () => clearTimeout(t)
  }, [])

  const handleOpen = useCallback(() => {
    if (opened) return
    setOpened(true)
    // Let the opening animation play, then advance
    setTimeout(onOpen, 1200)
  }, [opened, onOpen])

  return (
    <AnimatePresence>
      {!opened ? (
        <motion.div
          className={styles.envelopeStage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.3, filter: 'brightness(3)' }}
          transition={{ duration: 0.8 }}
          onClick={handleOpen}
        >
          {/* Volumetric light behind */}
          <motion.div
            className={styles.envelopeGlow}
            style={{ background: `radial-gradient(ellipse, ${accent}33 0%, transparent 70%)` }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Orbiting particles */}
          <canvas
            ref={canvasRef}
            className={styles.envelopeParticles}
            style={{ width: 400, height: 500 }}
          />

          {/* The envelope */}
          <motion.div
            className={styles.envelope}
            initial={{ y: -80, rotate: -3, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 60,
              damping: 12,
              mass: 1.2,
              delay: 0.3,
            }}
          >
            {/* Envelope body */}
            <div className={styles.envelopeBody}>
              {/* Flap (triangle) */}
              <div className={styles.envelopeFlap} />

              {/* Wax seal */}
              <motion.div
                className={styles.waxSeal}
                style={{ borderColor: accent }}
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className={styles.sealIcon}>{sealIcon}</span>
              </motion.div>

              {/* Recipient name */}
              <motion.p
                className={styles.envelopeName}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                For {recipientName}
              </motion.p>
            </div>
          </motion.div>

          {/* Tap prompt */}
          {showPrompt && (
            <motion.p
              className={styles.tapPrompt}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: [0.4, 0.8, 0.4], y: 0 }}
              transition={{
                opacity: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
                y: { duration: 0.5 },
              }}
            >
              Tap to open
            </motion.p>
          )}
        </motion.div>
      ) : (
        /* White flash on open */
        <motion.div
          className={styles.envelopeFlash}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, times: [0, 0.3, 1] }}
        />
      )}
    </AnimatePresence>
  )
}
