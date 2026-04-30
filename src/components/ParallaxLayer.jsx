import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ParallaxLayer({ children, speed = 0.5, isReducedMotion }) {
  const layerRef = useRef(null)

  useEffect(() => {
    if (isReducedMotion || !layerRef.current) return

    ScrollTrigger.create({
      trigger: layerRef.current.parentElement,
      onUpdate: (self) => {
        const yPercent = self.progress * speed * 100
        gsap.to(layerRef.current, {
          yPercent,
          duration: 0.3,
          overwrite: 'auto',
        })
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === layerRef.current?.parentElement) {
          trigger.kill()
        }
      })
    }
  }, [speed, isReducedMotion])

  return (
    <div ref={layerRef} className="parallax-layer">
      {children}
    </div>
  )
}
