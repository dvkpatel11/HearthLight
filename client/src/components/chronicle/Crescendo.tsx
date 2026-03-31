import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import MagicCta from './MagicCta'
import styles from './Flow.module.css'

interface Props {
  recipientName: string
  occasionLabel?: string
  accent: string
  particleColor: string
  onComplete: () => void
}

type OccasionFx = 'confetti' | 'fireworks' | 'lanterns' | 'petals' | 'stars'

function getOccasionConfig(label?: string): {
  wish: string
  fx: OccasionFx
  emoji: string
} {
  if (!label) return { wish: 'This moment is yours.', fx: 'stars', emoji: '✨' }
  const l = label.toLowerCase()
  if (l.includes('birthday'))
    return { wish: 'Happy Birthday!', fx: 'confetti', emoji: '🎂' }
  if (l.includes('anniversary') || l.includes('wedding'))
    return { wish: 'Happy Anniversary!', fx: 'petals', emoji: '💕' }
  if (l.includes('graduation'))
    return { wish: 'Congratulations, Graduate!', fx: 'fireworks', emoji: '🎓' }
  if (l.includes('farewell'))
    return { wish: 'Bon Voyage!', fx: 'lanterns', emoji: '🕊️' }
  if (l.includes('promotion') || l.includes('job'))
    return { wish: 'You Earned This!', fx: 'fireworks', emoji: '🚀' }
  if (l.includes('holiday'))
    return { wish: 'Happy Holidays!', fx: 'stars', emoji: '🎄' }
  return { wish: 'This Is Your Moment.', fx: 'stars', emoji: '✨' }
}

/* Canvas particle burst effect */
function useParticleBurst(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  color: string,
  fx: OccasionFx,
  active: boolean
) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !active) return
    const ctx = canvas.getContext('2d')!
    let raf: number

    const W = (canvas.width = window.innerWidth)
    const H = (canvas.height = window.innerHeight)
    const cx = W / 2
    const cy = H / 2

    interface P {
      x: number; y: number; vx: number; vy: number
      size: number; opacity: number; hue: number
      decay: number; gravity: number; shape: string
    }

    const shapes = fx === 'confetti' ? ['rect', 'rect', 'circle']
      : fx === 'petals' ? ['circle', 'circle']
      : fx === 'lanterns' ? ['circle']
      : fx === 'fireworks' ? ['circle', 'rect']
      : ['circle']

    const particles: P[] = Array.from({ length: 80 }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 2 + Math.random() * 6
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        size: 2 + Math.random() * 4,
        opacity: 1,
        hue: Math.random() * 60 - 30, // offset from base
        decay: 0.008 + Math.random() * 0.008,
        gravity: fx === 'lanterns' ? -0.02 : 0.04,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      }
    })

    function draw() {
      ctx.clearRect(0, 0, W, H)
      let alive = 0
      for (const p of particles) {
        if (p.opacity <= 0) continue
        alive++
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = color.replace(/[\d.]+\)$/, `${p.opacity})`)
        ctx.translate(p.x, p.y)

        if (p.shape === 'rect') {
          ctx.rotate(p.vx * 0.5)
          ctx.fillRect(-p.size / 2, -p.size, p.size, p.size * 2)
        } else {
          ctx.beginPath()
          ctx.arc(0, 0, p.size, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()

        p.x += p.vx
        p.y += p.vy
        p.vy += p.gravity
        p.vx *= 0.99
        p.opacity -= p.decay
      }
      if (alive > 0) raf = requestAnimationFrame(draw)
    }

    // Initial burst delay
    const t = setTimeout(() => draw(), 300)
    return () => { clearTimeout(t); cancelAnimationFrame(raf) }
  }, [canvasRef, color, fx, active])
}

export default function Crescendo({
  recipientName,
  occasionLabel,
  accent,
  particleColor,
  onComplete,
}: Props) {
  const [phase, setPhase] = useState<'build' | 'peak' | 'hold'>('build')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const config = getOccasionConfig(occasionLabel)

  useParticleBurst(canvasRef, particleColor, config.fx, phase === 'peak')

  // Choreography timeline
  useEffect(() => {
    const t1 = setTimeout(() => setPhase('peak'), 1200)
    const t2 = setTimeout(() => setPhase('hold'), 3500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const wishWords = `${config.wish}`.split(' ')

  return (
    <motion.div
      className={styles.crescendoStage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background intensification */}
      <motion.div
        className={styles.crescendoGlow}
        style={{ background: `radial-gradient(ellipse, ${accent}55 0%, transparent 65%)` }}
        animate={
          phase === 'build'
            ? { scale: [1, 1.5], opacity: [0.2, 0.6] }
            : phase === 'peak'
            ? { scale: [1.5, 2.5], opacity: [0.6, 0.9, 0.6] }
            : { scale: 2, opacity: 0.3 }
        }
        transition={{ duration: phase === 'peak' ? 2 : 1.5 }}
      />

      {/* Particle burst canvas */}
      <canvas ref={canvasRef} className={styles.crescendoCanvas} />

      {/* Emoji rain */}
      {phase !== 'build' && (
        <div className={styles.emojiRain}>
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.span
              key={i}
              className={styles.emojiParticle}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400) - 200,
                y: -40,
                rotate: Math.random() * 360,
                opacity: 0.8,
              }}
              animate={{
                y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 40,
                rotate: Math.random() * 720,
                opacity: 0,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 1.5,
                ease: 'easeIn',
              }}
            >
              {config.emoji}
            </motion.span>
          ))}
        </div>
      )}

      {/* Main wish text */}
      <motion.div className={styles.crescendoContent}>
        {/* Recipient name — appears first */}
        <motion.p
          className={styles.crescendoFor}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {recipientName}
        </motion.p>

        {/* Wish words — kinetic typography */}
        <motion.div
          className={styles.crescendoWish}
          initial="hidden"
          animate={phase !== 'build' ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
        >
          {wishWords.map((word, i) => (
            <motion.span
              key={i}
              className={styles.crescendoWord}
              style={{ color: accent }}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.5, filter: 'blur(10px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                  transition: { duration: 0.5, ease: 'easeOut' },
                },
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Continue button — appears after hold */}
        {phase === 'hold' && (
          <MagicCta accent={accent} onClick={onComplete} delay={0.5} minimal>
            Continue
          </MagicCta>
        )}
      </motion.div>
    </motion.div>
  )
}
