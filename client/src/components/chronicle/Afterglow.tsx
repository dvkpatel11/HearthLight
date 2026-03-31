import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import MagicCta from './MagicCta'
import styles from './Flow.module.css'

interface Props {
  senderName?: string
  accent: string
  onReplay: () => void
}

/**
 * Scene 7 — The Afterglow.
 * Post-experience screen with replay, create your own, and branding.
 * This is the viral growth engine.
 */
export default function Afterglow({ senderName, accent, onReplay }: Props) {
  const navigate = useNavigate()

  return (
    <motion.div
      className={styles.afterglowStage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* Remaining floating embers — very sparse */}
      <div className={styles.afterglowEmbers}>
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className={styles.afterglowEmber}
            style={{ background: accent }}
            initial={{
              x: Math.random() * 300 - 150,
              y: Math.random() * 200,
              opacity: 0,
            }}
            animate={{
              y: [Math.random() * 200, -100],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 1.2,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <motion.div className={styles.afterglowContent}>
        {/* Attribution */}
        <motion.div
          className={styles.afterglowAttribution}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <p className={styles.afterglowFrom}>
            You received a Chronicle
            {senderName ? ` from ${senderName}` : ''}
          </p>
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          className={styles.afterglowActions}
        >
          <MagicCta accent={accent} onClick={onReplay} delay={0.8}>
            Experience Again
          </MagicCta>
          <MagicCta accent={accent} onClick={() => navigate('/create')} delay={1.0}>
            Create Your Own
          </MagicCta>
        </motion.div>

        {/* Branding */}
        <motion.p
          className={styles.afterglowBrand}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Crafted with Hearthlight
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
