import gsap from 'gsap'

/**
 * Common animation utilities for the portfolio
 */

export const animationConfig = {
  durations: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.8,
    verySlow: 1.2,
  },
  easing: {
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    film: 'cubic-bezier(0.17, 0.55, 0.55, 1)',
    slow: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
  },
}

/**
 * Stagger animation for multiple elements
 */
export const staggerElements = (elements, options = {}) => {
  const defaults = {
    duration: 0.8,
    delay: 0.1,
    ease: 'power2.out',
  }

  const config = { ...defaults, ...options }

  gsap.to(elements, {
    opacity: 1,
    y: 0,
    duration: config.duration,
    stagger: config.delay,
    ease: config.ease,
  })
}

/**
 * Typewriter text animation
 */
export const typewriterText = (element, duration = 0.08) => {
  const text = element.textContent
  element.textContent = ''

  gsap.to(element, {
    duration: text.length * duration,
    onUpdate: () => {
      const progress = Math.round(text.length * gsap.getProgress())
      element.textContent = text.substring(0, progress)
    },
  })
}

/**
 * Fade in up animation
 */
export const fadeInUp = (element, options = {}) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      ...options,
    }
  )
}

/**
 * Scale animation on hover
 */
export const scaleOnHover = (element, scale = 1.05, duration = 0.6) => {
  const originalScale = gsap.getProperty(element, 'scale') || 1

  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale,
      duration,
      ease: 'power2.out',
    })
  })

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: originalScale,
      duration,
      ease: 'power2.out',
    })
  })
}

/**
 * Create a staggered reveal animation
 */
export const revealOnScroll = (container, selector, staggerDelay = 0.1) => {
  const elements = container.querySelectorAll(selector)

  elements.forEach((el, index) => {
    gsap.set(el, { opacity: 0, y: 20 })

    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: index * staggerDelay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        once: true,
      },
    })
  })
}

/**
 * Parallax scroll effect
 */
export const parallaxOnScroll = (element, speed = 0.5) => {
  gsap.set(element, { y: 0 })

  gsap.to(element, {
    scrollTrigger: {
      trigger: element.parentElement,
      onUpdate: (self) => {
        const yPercent = self.progress * speed * 100
        gsap.set(element, { yPercent })
      },
    },
  })
}

/**
 * Create a timeline for sequential animations
 */
export const createSequenceTimeline = (animations = []) => {
  const tl = gsap.timeline()

  animations.forEach((anim) => {
    tl.to(anim.target, anim.props, anim.position || '+=0')
  })

  return tl
}

export default animationConfig
