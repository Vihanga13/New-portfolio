import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParallaxLayer from '../ParallaxLayer'
import useScrollFadeIn from '../../hooks/useScrollFadeIn'

export default function About({ isReducedMotion, isMobile }) {
  const containerRef = useRef(null)
  const statsRef = useRef([])
  const titleRef = useScrollFadeIn(isReducedMotion)

  useEffect(() => {
    if (isReducedMotion) return

    const stats = statsRef.current
    stats.forEach((stat, index) => {
      ScrollTrigger.create({
        trigger: stat,
        onEnter: () => {
          gsap.fromTo(
            stat,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, delay: index * 0.1, ease: 'power2.out' }
          )
        },
        once: true,
      })
    })

    return () => {
      stats.forEach((stat) => {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === stat) {
            trigger.kill()
          }
        })
      })
    }
  }, [isReducedMotion])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full min-h-screen pt-40 pb-40 bg-black-primary overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-12">
        <div className="grid grid-cols-2 gap-32 items-center">
          {/* Image Stack */}
          <div className="relative h-[600px]">
            <ParallaxLayer speed={0.7} isReducedMotion={isReducedMotion}>
              <div className="absolute w-3/5 aspect-square top-0 right-0 bg-gradient-to-br from-black-secondary to-black-primary shadow-2xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white-pure/40">Cutout</div>
              </div>
            </ParallaxLayer>

            <ParallaxLayer speed={0.5} isReducedMotion={isReducedMotion}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl opacity-60">📓</div>
                <div className="text-5xl absolute bottom-20 left-8 opacity-50">📷</div>
                <div className="text-6xl absolute bottom-32 right-12 opacity-60">💻</div>
              </div>
            </ParallaxLayer>

            <ParallaxLayer speed={0.3} isReducedMotion={isReducedMotion}>
              <div className="absolute inset-0 bg-radial-gradient opacity-5 pointer-events-none" />
            </ParallaxLayer>
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-10">
            <h2 ref={titleRef} className="section-title">
              About
            </h2>

            <p className="text-lg leading-relaxed text-white-pure/80 opacity-0 fade-in-on-scroll">
              I am a passionate and dedicated Computer Science student with hands-on experience in web development, UI design,
              frontend development, and mobile application development. With a solid foundation in programming languages and frameworks
              such as HTML, CSS, JavaScript, React Native, Flutter, and Flask Node.js, I am excited to apply my knowledge to real-world
              projects.
            </p>

            <p className="text-lg leading-relaxed text-white-pure/80 opacity-0 fade-in-on-scroll"
               style={{ transitionDelay: '0.1s' }}>
              I am eager to contribute to dynamic teams, learn from seasoned experts, and build meaningful and creative digital solutions.
              Currently looking for a job opportunity to broaden my knowledge and contribute to emerging tech challenges in the tech sector.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-10 mt-8">
              {[
                { number: '5+', label: 'Projects' },
                { number: '3+', label: 'Years' },
                { number: '∞', label: 'Growth' },
              ].map((stat, index) => (
                <div
                  key={index}
                  ref={(el) => (statsRef.current[index] = el)}
                  className="flex flex-col gap-2 pb-6 border-b border-white-pure/10 opacity-0"
                >
                  <span className="text-5xl font-serif font-light text-white-pure">{stat.number}</span>
                  <span className="text-xs tracking-widest text-white-pure/50">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="film-grain" />

      <style>{`
        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .min-h-screen {
            min-height: auto;
          }
        }
      `}</style>
    </section>
  )
}
