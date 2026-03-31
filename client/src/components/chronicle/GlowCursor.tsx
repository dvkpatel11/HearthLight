import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Props {
  accent: string
}

/**
 * Custom glowing cursor that replaces the default arrow.
 * - Small glowing dot that trails the mouse
 * - Outer ring expands on clickable elements
 * - Only on desktop (pointer: fine)
 */
export default function GlowCursor({ accent }: Props) {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 300, damping: 25 })
  const springY = useSpring(cursorY, { stiffness: 300, damping: 25 })
  const isHovering = useRef(false)
  const ringScale = useMotionValue(1)
  const ringSpring = useSpring(ringScale, { stiffness: 200, damping: 20 })

  useEffect(() => {
    // Only on devices with a fine pointer (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)

      // Check if hovering something clickable
      const target = e.target as HTMLElement
      const clickable = target.closest('button, a, [role="button"], [data-clickable]')
      if (clickable && !isHovering.current) {
        isHovering.current = true
        ringScale.set(2.2)
      } else if (!clickable && isHovering.current) {
        isHovering.current = false
        ringScale.set(1)
      }
    }

    const onLeave = () => {
      cursorX.set(-100)
      cursorY.set(-100)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [cursorX, cursorY, ringScale])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Inner dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: accent,
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'screen',
          boxShadow: `0 0 12px ${accent}88, 0 0 24px ${accent}44`,
        }}
      />
      {/* Outer ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: `1px solid ${accent}55`,
          x: springX,
          y: springY,
          scale: ringSpring,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
    </>
  )
}
