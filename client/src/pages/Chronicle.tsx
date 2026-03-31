import { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { fetchChronicle, logView } from '../lib/api'
import type { Chronicle } from '../types'
import FloatingParticles from '../components/ui/FloatingParticles'
import AudioControls from '../components/ui/AudioControls'
import { getThemeBackground, getThemeTextureLayers, getThemeLottieOverlay } from '../lib/themeAssets'
import LottieOverlay from '../components/ui/LottieOverlay'
import Envelope from '../components/chronicle/Envelope'
import Reveal from '../components/chronicle/Reveal'
import Greeting from '../components/chronicle/Greeting'
import ChronicleReading from '../components/chronicle/ChronicleReading'
import Crescendo from '../components/chronicle/Crescendo'
import Farewell from '../components/chronicle/Farewell'
import Afterglow from '../components/chronicle/Afterglow'
import GlowCursor from '../components/chronicle/GlowCursor'
import styles from './Chronicle.module.css'

/* ── Theme maps ────────────────────────────────── */

const THEME_PARTICLES: Record<string, string> = {
  'golden-warmth':  'rgba(201, 168, 76, 0.5)',
  'midnight-bloom': 'rgba(160, 100, 210, 0.4)',
  'ocean-calm':     'rgba(80, 180, 200, 0.4)',
  'forest-dawn':    'rgba(100, 180, 80, 0.35)',
  'celestial':      'rgba(200, 130, 200, 0.4)',
}

const THEME_OVERLAY: Record<string, string> = {
  'golden-warmth':  'linear-gradient(180deg, rgba(14,12,10,0.55) 0%, rgba(14,12,10,0.85) 60%, #0e0c0a 100%)',
  'midnight-bloom': 'linear-gradient(180deg, rgba(10,8,20,0.55) 0%, rgba(10,8,20,0.88) 60%, #0a0814 100%)',
  'ocean-calm':     'linear-gradient(180deg, rgba(5,15,22,0.55) 0%, rgba(5,15,22,0.88) 60%, #050f16 100%)',
  'forest-dawn':    'linear-gradient(180deg, rgba(8,15,10,0.55) 0%, rgba(8,15,10,0.88) 60%, #080f0a 100%)',
  'celestial':      'linear-gradient(180deg, rgba(8,8,18,0.55) 0%, rgba(8,8,18,0.88) 60%, #080812 100%)',
}

const THEME_OVERLAY_READING: Record<string, string> = {
  'golden-warmth':  'linear-gradient(180deg, rgba(14,12,10,0.18) 0%, rgba(14,12,10,0.35) 100%)',
  'midnight-bloom': 'linear-gradient(180deg, rgba(10,8,20,0.18) 0%, rgba(10,8,20,0.35) 100%)',
  'ocean-calm':     'linear-gradient(180deg, rgba(5,15,22,0.18) 0%, rgba(5,15,22,0.35) 100%)',
  'forest-dawn':    'linear-gradient(180deg, rgba(8,15,10,0.18) 0%, rgba(8,15,10,0.35) 100%)',
  'celestial':      'linear-gradient(180deg, rgba(8,8,18,0.18) 0%, rgba(8,8,18,0.35) 100%)',
}

const THEME_ACCENT: Record<string, string> = {
  'golden-warmth':  '#c9a84c',
  'midnight-bloom': '#a064d2',
  'ocean-calm':     '#50b4c8',
  'forest-dawn':    '#64b450',
  'celestial':      '#c882c8',
}

/* ── Flow stages ───────────────────────────────── */

type FlowStage =
  | 'envelope'
  | 'reveal'
  | 'greeting'
  | 'reading'
  | 'crescendo'
  | 'farewell'
  | 'afterglow'

/* Stages where the backdrop should be vivid (lighter overlay) */
const VIVID_STAGES: FlowStage[] = ['reveal', 'reading', 'crescendo']

export default function ChroniclePage() {
  const { slug } = useParams<{ slug: string }>()
  const [chronicle, setChronicle] = useState<Chronicle | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [flowStage, setFlowStage] = useState<FlowStage>('envelope')
  const heroRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: heroRef })
  const imageParallax = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  // Fetch chronicle
  useEffect(() => {
    if (!slug) return
    fetchChronicle(slug)
      .then((c) => { setChronicle(c); logView(slug) })
      .catch(() => setError('This chronicle could not be found.'))
      .finally(() => setLoading(false))
  }, [slug])

  // Update browser title
  useEffect(() => {
    if (chronicle) {
      document.title = `${chronicle.recipient.name}'s Chronicle — Hearthlight`
    }
    return () => { document.title = 'Hearthlight' }
  }, [chronicle])

  /* ── Derived values ─────────────────────────── */

  const theme = chronicle?.theme || 'golden-warmth'
  const accent = THEME_ACCENT[theme] || THEME_ACCENT['golden-warmth']
  const particleColor = THEME_PARTICLES[theme] || THEME_PARTICLES['golden-warmth']
  const isVivid = VIVID_STAGES.includes(flowStage)
  const overlay = isVivid
    ? (THEME_OVERLAY_READING[theme] || THEME_OVERLAY_READING['golden-warmth'])
    : (THEME_OVERLAY[theme] || THEME_OVERLAY['golden-warmth'])

  const backgroundImage = chronicle?.imageUrl || getThemeBackground(theme)
  const showAnimation = !!chronicle?.animationUrl && !shouldReduceMotion
  const textureLayers = getThemeTextureLayers()
  const lottieOverlay = getThemeLottieOverlay()

  // Skip greeting scene if no greeting text
  const hasGreeting = !!chronicle?.greeting?.trim()

  /* ── Loading / Error states ─────────────────── */

  if (loading) {
    return (
      <div className={styles.loadState}>
        <div
          className={styles.loadOrb}
          style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
        />
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.loadState}>
        <p className={styles.errorMsg}>{error}</p>
      </div>
    )
  }

  if (!chronicle) return null

  /* ── Scene transition handler ───────────────── */

  function nextStage(from: FlowStage) {
    switch (from) {
      case 'envelope':  setFlowStage('reveal'); break
      case 'reveal':    setFlowStage(hasGreeting ? 'greeting' : 'reading'); break
      case 'greeting':  setFlowStage('reading'); break
      case 'reading':   setFlowStage('crescendo'); break
      case 'crescendo': setFlowStage('farewell'); break
      case 'farewell':  setFlowStage('afterglow'); break
      case 'afterglow': break
    }
  }

  function replay() {
    setFlowStage('envelope')
  }

  /* ── Render ─────────────────────────────────── */

  return (
    <div className={styles.root} style={{ '--accent': accent } as React.CSSProperties}>
      {/* Custom glowing cursor */}
      <GlowCursor accent={accent} />

      {/* Background layers — always present, intensity changes per stage */}
      {flowStage !== 'envelope' && (
        <FloatingParticles count={25} color={particleColor} />
      )}

      {chronicle.musicUrl && flowStage !== 'envelope' && (
        <AudioControls src={chronicle.musicUrl} accentColor={accent} />
      )}

      {/* Hero backdrop */}
      <div className={styles.heroWrap} ref={heroRef}>
        {showAnimation ? (
          <video
            className={styles.heroImage}
            src={chronicle.animationUrl}
            poster={backgroundImage}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          <motion.div
            className={styles.heroImage}
            style={{
              backgroundImage: `url(${backgroundImage})`,
              y: shouldReduceMotion ? undefined : imageParallax,
            }}
            animate={
              shouldReduceMotion
                ? undefined
                : { scale: [1, 1.02, 1] }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 40, repeat: Infinity, ease: 'linear' }
            }
          />
        )}

        {textureLayers.map((src, index) => (
          <motion.div
            key={index}
            className={styles.textureLayer}
            style={{ backgroundImage: `url(${src})` }}
            animate={
              shouldReduceMotion
                ? undefined
                : { opacity: [0.15, 0.3, 0.15], y: [0, -10, 0] }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 30 + index * 5, repeat: Infinity, ease: 'easeInOut' }
            }
          />
        ))}

        <motion.div
          className={styles.heroOverlay}
          animate={{ background: overlay }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </div>

      {lottieOverlay && flowStage !== 'envelope' && (
        <div className={styles.lottieLayer}>
          <LottieOverlay src={lottieOverlay} />
        </div>
      )}

      {/* ── Flow Scenes ──────────────────────── */}
      <AnimatePresence mode="wait">
        {flowStage === 'envelope' && (
          <Envelope
            key="envelope"
            recipientName={chronicle.recipient.name}
            occasionLabel={chronicle.occasion.label}
            accent={accent}
            particleColor={particleColor}
            onOpen={() => nextStage('envelope')}
          />
        )}

        {flowStage === 'reveal' && (
          <Reveal
            key="reveal"
            recipientName={chronicle.recipient.name}
            occasionLabel={chronicle.occasion.label}
            accent={accent}
            onComplete={() => nextStage('reveal')}
          />
        )}

        {flowStage === 'greeting' && (
          <Greeting
            key="greeting"
            greeting={chronicle.greeting!}
            accent={accent}
            onComplete={() => nextStage('greeting')}
          />
        )}

        {flowStage === 'reading' && (
          <ChronicleReading
            key="reading"
            prose={chronicle.prose}
            greeting={chronicle.greeting}
            signOff={chronicle.signOff}
            recipientName={chronicle.recipient.name}
            occasionLabel={chronicle.occasion.label}
            accent={accent}
            onComplete={() => nextStage('reading')}
          />
        )}

        {flowStage === 'crescendo' && (
          <Crescendo
            key="crescendo"
            recipientName={chronicle.recipient.name}
            occasionLabel={chronicle.occasion.label}
            accent={accent}
            particleColor={particleColor}
            onComplete={() => nextStage('crescendo')}
          />
        )}

        {flowStage === 'farewell' && (
          <Farewell
            key="farewell"
            signOff={chronicle.signOff}
            senderName={chronicle.senderName}
            accent={accent}
            particleColor={particleColor}
            onComplete={() => nextStage('farewell')}
          />
        )}

        {flowStage === 'afterglow' && (
          <Afterglow
            key="afterglow"
            senderName={chronicle.senderName}
            accent={accent}
            onReplay={replay}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
