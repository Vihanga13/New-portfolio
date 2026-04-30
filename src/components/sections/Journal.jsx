import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useScrollFadeIn from '../../hooks/useScrollFadeIn'

export default function Journal({ isReducedMotion, isMobile }) {
  const containerRef = useRef(null)
  const titleRef = useScrollFadeIn(isReducedMotion)
  const entriesRef = useRef([])

  const entries = [
    {
      date: '2026 / 04',
      title: 'Full Stack Development Journey',
      text: 'Building complete web solutions from UI design to backend integration. The key is understanding how each layer connects—frontend, backend, and database work in harmony.',
    },
    {
      date: '2026 / 03',
      title: 'React & Modern Web Development',
      text: 'React has revolutionized how we build interactive interfaces. Component-based architecture and state management make complex applications manageable and scalable.',
    },
    {
      date: '2026 / 02',
      title: 'The Power of Problem Solving',
      text: 'Every project—from Medical Information Systems to Transportation Apps—taught me that great solutions come from understanding user needs first. Technology is the tool; empathy is the compass.',
    },
  ]

  useEffect(() => {
    if (isReducedMotion) return

    entriesRef.current.forEach((entry, index) => {
      if (!entry) return

      ScrollTrigger.create({
        trigger: entry,
        onEnter: () => {
          gsap.fromTo(
            entry,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, delay: index * 0.1, ease: 'power2.out' }
          )
        },
        once: true,
      })
    })

    return () => {
      entriesRef.current.forEach((entry) => {
        if (entry) {
          ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger.trigger === entry) {
              trigger.kill()
            }
          })
        }
      })
    }
  }, [isReducedMotion])

  return (
    <section
      id="journal"
      ref={containerRef}
      className="relative w-full min-h-screen pt-40 pb-40 bg-black-deep overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-12">
        <h2 ref={titleRef} className="section-title">
          Thoughts & Observations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mt-20">
          {entries.map((entry, index) => (
            <article
              key={index}
              ref={(el) => (entriesRef.current[index] = el)}
              className="flex flex-col gap-8 opacity-0"
            >
              {/* Image */}
              <div className="relative w-full aspect-square bg-gradient-to-br from-black-secondary to-black-primary overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white-pure/30">Entry {index + 1}</div>

                {/* Vignette */}
                <div className="absolute inset-0 bg-radial-gradient opacity-40 pointer-events-none" />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4">
                <time className="text-xs tracking-widest text-white-pure/40">{entry.date}</time>
                <h3 className="text-2xl font-serif font-light text-white-pure">{entry.title}</h3>
                <p className="text-base leading-relaxed text-white-pure/70">{entry.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="film-grain" />
    </section>
  )
}
