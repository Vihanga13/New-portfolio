import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

import Navigation from './components/Navigation'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Work from './components/sections/Work'
import Process from './components/sections/Process'
import Journal from './components/sections/Journal'
import Contact from './components/sections/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import FilmCountdown from './components/FilmCountdown'
import CinematicEffects from './components/CinematicEffects'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

function App() {
  const [isCinemaMode, setIsCinemaMode] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  // Check for reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setIsReducedMotion(prefersReducedMotion)
  }, [])

  // Handle responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  // Handle cinema mode
  useEffect(() => {
    if (isCinemaMode) {
      document.body.classList.add('cinema-mode')
    } else {
      document.body.classList.remove('cinema-mode')
    }
  }, [isCinemaMode])

  return (
    <div className="bg-black-deep">
      <FilmCountdown />
      <CustomCursor isMobile={isMobile} />
      <Navigation isCinemaMode={isCinemaMode} setIsCinemaMode={setIsCinemaMode} />
      
      <main>
        <Hero isReducedMotion={isReducedMotion} isMobile={isMobile} />
        <About isReducedMotion={isReducedMotion} isMobile={isMobile} />
        <Work isReducedMotion={isReducedMotion} isMobile={isMobile} />
        <Process isReducedMotion={isReducedMotion} isMobile={isMobile} />
        <Journal isReducedMotion={isReducedMotion} isMobile={isMobile} />
        <Contact isReducedMotion={isReducedMotion} isMobile={isMobile} />
      </main>

      <Footer />

      <CinematicEffects isReducedMotion={isReducedMotion} isMobile={isMobile} />
    </div>
  )
}

export default App
