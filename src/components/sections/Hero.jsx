import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ParallaxLayer from '../ParallaxLayer'

export default function Hero({ isReducedMotion, isMobile }) {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const taglineRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  useEffect(() => {
    const timeline = gsap.timeline({ delay: 4 })

    // Animate hero content
    if (titleRef.current) {
      timeline.to(titleRef.current, { opacity: 1, duration: 0.8 }, 0)
    }

    if (taglineRef.current) {
      timeline.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.3)
    }

    if (scrollIndicatorRef.current) {
      timeline.to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.6)
    }

    // Listen for scroll to hide scroll indicator
    let hasScrolled = false
    const handleScroll = () => {
      if (!hasScrolled) {
        hasScrolled = true
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          duration: 0.4,
          pointerEvents: 'none',
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { once: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      timeline.kill()
    }
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-screen pt-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-black-deep to-black-primary"
    >
      <div className="absolute inset-0 bg-radial-gradient opacity-[0.02] pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-12 flex items-center gap-20">
        {/* Hero Image */}
        <ParallaxLayer speed={0.5} isReducedMotion={isReducedMotion}>
          <div className="flex-1 min-h-[600px]">
            <div className="w-full h-full bg-gradient-to-br from-black-primary to-black-secondary shadow-2xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-b from-gray-dark to-black-deep flex items-center justify-center text-2xl opacity-0"
                   style={{
                     animation: 'fadeInUp 1.2s ease-out 4.5s forwards',
                   }}>
                Portrait Cutout
              </div>
            </div>
          </div>
        </ParallaxLayer>

        {/* Hero Text */}
        <div className="flex-1">
          <ParallaxLayer speed={0.3} isReducedMotion={isReducedMotion}>
            <div>
              {/* Title */}
              <h1
                ref={titleRef}
                className="text-9xl font-serif font-light tracking-tighter mb-6 text-white-pure opacity-0"
                style={{
                  lineHeight: 1,
                  animation: isReducedMotion ? 'none' : 'typewriter 0.08s steps(15) 4.5s forwards',
                }}
              >
                Vihanga Nilusha
              </h1>

              {/* Tagline */}
              <p
                ref={taglineRef}
                className="text-base tracking-wider text-white-pure/70 mb-16 opacity-0"
                style={{ transform: 'translateY(20px)' }}
              >
                Web Developer • UI Designer • Computer Science Graduate
              </p>

              {/* Scroll Indicator */}
              <div
                ref={scrollIndicatorRef}
                className="flex flex-col items-center gap-3 mt-20 opacity-0"
                style={{ transform: 'translateY(20px)' }}
              >
                <span className="text-xs tracking-widest text-white-pure/50">SCROLL</span>
                <div
                  className="w-0.5 h-8 bg-gradient-to-b from-white-pure to-transparent"
                  style={{
                    animation: 'scroll-bounce 2s ease-in-out infinite',
                  }}
                />
              </div>
            </div>
          </ParallaxLayer>
        </div>
      </div>

      {/* Film Grain */}
      <div className="film-grain" />

      {/* Light Leaks */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-to-tl from-white/10 to-transparent rounded-full opacity-0 pointer-events-none"
           style={{
             animation: 'light-leak 8s ease-in-out infinite',
             mixBlendMode: 'screen',
           }} />

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1024px) {
          .max-w-7xl {
            flex-direction: column;
            gap: 40px;
          }

          h1 {
            font-size: 5rem;
          }
        }

        @media (max-width: 640px) {
          h1 {
            font-size: 2.5rem;
          }

          .min-h-[600px] {
            min-height: 300px;
          }
        }
      `}</style>
    </section>
  )
}
