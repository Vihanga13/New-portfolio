import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CinematicEffects({ isReducedMotion, isMobile }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (isReducedMotion || isMobile) return

    // Create dust particles
    const particleCount = isMobile ? 3 : 8
    const container = containerRef.current

    if (!container) return

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'dust-particle'
      particle.style.cssText = `
        width: ${Math.random() * 2 + 1}px;
        height: ${Math.random() * 2 + 1}px;
        background: rgba(255, 255, 255, 0.1);
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `
      container.appendChild(particle)

      const duration = Math.random() * 20 + 20
      const randomX = (Math.random() - 0.5) * window.innerWidth
      const randomY = (Math.random() - 0.5) * window.innerHeight

      gsap.to(particle, {
        x: randomX,
        y: randomY,
        opacity: 0,
        duration: duration,
        ease: 'none',
        repeat: -1,
        onRepeat: () => {
          gsap.set(particle, {
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            opacity: 0.1,
          })
        },
      })
    }

    return () => {
      container.innerHTML = ''
    }
  }, [isReducedMotion, isMobile])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  )
}
