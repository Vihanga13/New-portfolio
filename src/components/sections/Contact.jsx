import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ParallaxLayer from '../ParallaxLayer'
import useScrollFadeIn from '../../hooks/useScrollFadeIn'

export default function Contact({ isReducedMotion, isMobile }) {
  const containerRef = useRef(null)
  const titleRef = useScrollFadeIn(isReducedMotion)
  const formRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formInputsRef = useRef([])

  useEffect(() => {
    if (isReducedMotion) return

    // Fade in form elements
    formInputsRef.current.forEach((input, index) => {
      if (!input) return

      gsap.set(input, { opacity: 0, y: 20 })

      ScrollTrigger.create({
        trigger: input,
        onEnter: () => {
          gsap.to(input, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
          })
        },
        once: true,
      })
    })

    return () => {
      formInputsRef.current.forEach((input) => {
        if (input) {
          ScrollTrigger.getAll().forEach((trigger) => {
            if (trigger.trigger === input) {
              trigger.kill()
            }
          })
        }
      })
    }
  }, [isReducedMotion])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const button = formRef.current?.querySelector('button')
    const buttonText = button?.querySelector('.btn-text')

    if (button && buttonText) {
      gsap.timeline()
        .to(button, { background: 'rgba(255, 255, 255, 0.8)', duration: 0.3 })
        .to(buttonText, { opacity: 0, duration: 0.2 }, 0)
        .to(buttonText, { textContent: 'Message Received', opacity: 1, duration: 0.2 }, 0.2)

      setTimeout(() => {
        formRef.current?.reset()
        buttonText.textContent = 'Send Message'
        gsap.to(button, { background: 'white', duration: 0.3 })
        setIsSubmitting(false)
      }, 2000)
    }
  }

  const socialLinks = [
    { icon: '�', title: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: '💻', title: 'GitHub', href: 'https://github.com' },
    { icon: '📧', title: 'Email', href: 'mailto:vihaax23@gmail.com' },
    { icon: '🌐', title: 'Portfolio', href: '#' },
  ]

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full min-h-screen pt-40 pb-40 bg-gradient-to-br from-black-primary to-black-deep overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-12">
        <div className="grid grid-cols-2 gap-32 items-center">
          {/* Image */}
          <ParallaxLayer speed={0.5} isReducedMotion={isReducedMotion}>
            <div className="relative w-full aspect-video">
              <div className="w-full h-full bg-gradient-to-br from-black to-black-primary shadow-2xl overflow-hidden flex items-center justify-center text-white-pure/20">
                Contact Portrait
              </div>

              {/* Vignette */}
              <div className="absolute inset-0 bg-radial-gradient opacity-60 pointer-events-none" />
            </div>
          </ParallaxLayer>

          {/* Content */}
          <div className="flex flex-col gap-12">
            <h2 ref={titleRef} className="section-title">
              Let's Connect
            </h2>

            <p className="text-lg text-white-pure/80 leading-relaxed">
              I'm always interested in web development opportunities and collaborative projects. Feel free to reach out to discuss your ideas or just to say hello!
            </p>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div ref={(el) => (formInputsRef.current[0] = el)}>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full px-0 py-4 bg-transparent border-b border-white-pure/20 text-white-pure placeholder-white-pure/40 focus:outline-none focus:border-white-pure transition-colors"
                />
              </div>

              <div ref={(el) => (formInputsRef.current[1] = el)}>
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  className="w-full px-0 py-4 bg-transparent border-b border-white-pure/20 text-white-pure placeholder-white-pure/40 focus:outline-none focus:border-white-pure transition-colors"
                />
              </div>

              <div ref={(el) => (formInputsRef.current[2] = el)}>
                <textarea
                  placeholder="Tell me about your vision"
                  rows="4"
                  required
                  className="w-full px-0 py-4 bg-transparent border-b border-white-pure/20 text-white-pure placeholder-white-pure/40 focus:outline-none focus:border-white-pure transition-colors resize-none"
                />
              </div>

              <div ref={(el) => (formInputsRef.current[3] = el)}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-12 py-4 bg-white-pure text-black-deep font-semibold tracking-widest text-sm hover:shadow-2xl transition-all duration-400 disabled:opacity-50"
                >
                  <span className="btn-text">Send Message</span>
                </button>
              </div>
            </form>

            {/* Social Links */}
            <div
              className="flex gap-6 mt-8"
              ref={(el) => (formInputsRef.current[4] = el)}
            >
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  title={link.title}
                  className="w-12 h-12 border-2 border-white-pure/30 flex items-center justify-center text-lg hover:bg-white-pure/10 hover:border-white-pure transition-all duration-400 rounded"
                >
                  {link.icon}
                </a>
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
        }
      `}</style>
    </section>
  )
}
