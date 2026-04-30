import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Navigation({ isCinemaMode, setIsCinemaMode }) {
  const navRef = useRef(null)
  const linksRef = useRef([])

  useEffect(() => {
    const logo = navRef.current?.querySelector('.nav-logo')
    const links = navRef.current?.querySelectorAll('.nav-link')
    const toggle = navRef.current?.querySelector('.cinema-toggle')

    const tl = gsap.timeline({ delay: 4 })

    if (logo) {
      tl.to(logo, { opacity: 1, x: 0, duration: 0.8 }, 0)
    }

    links?.forEach((link, index) => {
      tl.to(link, { opacity: 1, x: 0, duration: 0.8 }, 0.1 * index)
    })

    if (toggle) {
      tl.to(toggle, { opacity: 1, x: 0, duration: 0.8 }, 0.3)
    }

    return () => {
      tl.kill()
    }
  }, [])

  const handleNavClick = (e, target) => {
    e.preventDefault()
    const element = document.getElementById(target)
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element, offsetY: 80 },
        duration: 1.2,
        ease: 'power2.inOut',
      })
    }
  }

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full h-20 bg-gradient-to-b from-black-deep/95 via-black-deep/90 to-black-deep/0 z-100 backdrop-blur-lg border-b border-white-pure/5"
    >
      <div className="max-w-7xl mx-auto px-12 h-full flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="nav-logo text-3xl font-serif font-light tracking-wider text-white-pure opacity-0">
          V
        </a>

        {/* Links */}
        <div className="flex gap-12 items-center">
          {['about', 'work', 'process', 'journal', 'contact'].map((link, index) => (
            <a
              key={link}
              ref={(el) => (linksRef.current[index] = el)}
              href={`#${link}`}
              onClick={(e) => handleNavClick(e, link)}
              className="nav-link text-xs tracking-widest font-medium text-white-pure/60 hover:text-white-pure transition-colors duration-400 opacity-0 origin-left"
              style={{ transform: 'translateX(30px)' }}
            >
              {link.toUpperCase()}
            </a>
          ))}
        </div>

        {/* Cinema Toggle */}
        <button
          onClick={() => setIsCinemaMode(!isCinemaMode)}
          className="cinema-toggle px-4 py-2 border-2 border-white-pure/30 text-white-pure hover:bg-white-pure/10 hover:border-white-pure transition-all duration-400 text-base opacity-0"
          style={{ transform: 'translateX(30px)' }}
          title="Toggle Cinema Mode"
        >
          {isCinemaMode ? '🎞️' : '🎬'}
        </button>
      </div>
    </nav>
  )
}
