import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParallaxLayer from '../ParallaxLayer'
import useScrollFadeIn from '../../hooks/useScrollFadeIn'

export default function Process({ isReducedMotion, isMobile }) {
  const containerRef = useRef(null)
  const titleRef = useScrollFadeIn(isReducedMotion)
  const stepsRef = useRef([])

  const steps = [
    { title: 'Design', description: 'UI/UX design with Figma, creating wireframes and prototypes before development.' },
    { title: 'Frontend Development', description: 'React, JavaScript, and HTML/CSS for responsive, interactive interfaces.' },
    { title: 'Backend Integration', description: 'PHP, Node.js, and database integration for complete functionality.' },
    { title: 'Testing & Deployment', description: 'Comprehensive testing and deployment to production environments.' },
  ]

  useEffect(() => {
    if (isReducedMotion) return

    stepsRef.current.forEach((step, index) => {
      if (!step) return

      ScrollTrigger.create({
        trigger: step,
        onEnter: () => {
          gsap.fromTo(
            step,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
          )
        },
        once: true,
      })
    })

    return () => {
      stepsRef.current.forEach((step) => {
        if (step) {
          ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger.trigger === step) {
              trigger.kill()
            }
          })
        }
      })
    }
  }, [isReducedMotion])

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full min-h-screen pt-40 pb-40 bg-black-primary overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-12">
        <h2 ref={titleRef} className="section-title">
          Process & Methodology
        </h2>

        <div className="space-y-32 mt-20">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => (stepsRef.current[index] = el)}
              className={`grid grid-cols-2 gap-20 items-center opacity-0 ${
                index % 2 === 1 ? 'grid-cols-2-reverse' : ''
              }`}
            >
              {/* Image */}
              <ParallaxLayer speed={0.6 - index * 0.1} isReducedMotion={isReducedMotion}>
                <div className="relative w-full aspect-video bg-gradient-to-br from-black-secondary to-black-primary overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-white-pure/30">Process {index + 1}</div>

                  {/* Film strip border */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(90deg, transparent 0, transparent 24px, rgba(255,255,255,0.1) 24px, rgba(255,255,255,0.1) 28px)',
                    }}
                  />
                </div>
              </ParallaxLayer>

              {/* Content */}
              <div>
                <h3 className="text-4xl font-serif font-light text-white-pure mb-6">{step.title}</h3>
                <p className="text-lg text-white-pure/70 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="film-grain" />

      <style>{`
        .grid-cols-2-reverse {
          grid-auto-flow: dense;
        }

        .grid-cols-2-reverse > :first-child {
          grid-column: 2;
        }

        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .grid-cols-2-reverse > :first-child {
            grid-column: auto;
          }
        }
      `}</style>
    </section>
  )
}
