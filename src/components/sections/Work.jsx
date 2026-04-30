import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useScrollFadeIn from '../../hooks/useScrollFadeIn'

export default function Work({ isReducedMotion, isMobile }) {
  const containerRef = useRef(null)
  const titleRef = useScrollFadeIn(isReducedMotion)
  const projectsRef = useRef([])

  const projects = [
    { title: 'MedSync', category: 'Medical Information Management' },
    { title: 'Green Stay', category: 'Hostel Booking Platform' },
    { title: 'Green Ride', category: 'Transportation App' },
    { title: 'Weather App', category: 'Python Application' },
    { title: 'AI Nutrition Apps', category: 'ML Application' },
    { title: 'Dietary Management', category: 'Health Monitoring' },
  ]

  useEffect(() => {
    if (isReducedMotion) return

    projectsRef.current.forEach((card, index) => {
      if (!card) return

      ScrollTrigger.create({
        trigger: card,
        onEnter: () => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
          )
        },
        once: true,
      })

      // Hover effect
      card.addEventListener('mouseenter', () => {
        const image = card.querySelector('.project-image')
        gsap.to(image, {
          scale: 1.08,
          duration: 0.6,
          ease: 'power2.out',
        })

        const overlay = card.querySelector('.project-overlay')
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.6,
        })
      })

      card.addEventListener('mouseleave', () => {
        const image = card.querySelector('.project-image')
        gsap.to(image, {
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
        })

        const overlay = card.querySelector('.project-overlay')
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.6,
        })
      })
    })

    return () => {
      projectsRef.current.forEach((card) => {
        if (card) {
          ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger.trigger === card) {
              trigger.kill()
            }
          })
        }
      })
    }
  }, [isReducedMotion])

  return (
    <section id="work" ref={containerRef} className="relative w-full min-h-screen pt-40 pb-40 bg-black-deep overflow-hidden">
      <div className="max-w-7xl mx-auto px-12">
        <h2 ref={titleRef} className="section-title">
          Selected Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (projectsRef.current[index] = el)}
              className="group cursor-pointer opacity-0"
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-square bg-black-primary mb-8">
                <div
                  className="project-image w-full h-full bg-gradient-to-br from-gray-dark to-black-primary flex items-center justify-center text-white-pure/30"
                >
                  Project {index + 1}
                </div>

                <div
                  className="project-overlay absolute inset-0 bg-gradient-to-br from-transparent to-black/40 opacity-0"
                />
              </div>

              {/* Title & Category */}
              <div>
                <h3 className="text-2xl font-serif font-light text-white-pure mb-2">{project.title}</h3>
                <p className="text-xs tracking-widest text-white-pure/50">{project.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="film-grain" />

      <style>{`
        .group:hover .project-image {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  )
}
