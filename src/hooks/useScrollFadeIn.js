import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function useScrollFadeIn(isReducedMotion = false) {
  const elementRef = useRef(null)

  useEffect(() => {
    if (isReducedMotion || !elementRef.current) return

    const element = elementRef.current

    ScrollTrigger.create({
      trigger: element,
      onEnter: () => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        })
      },
      once: true,
    })

    // Set initial state
    gsap.set(element, { opacity: 0, y: 20 })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [isReducedMotion])

  return elementRef
}
