import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor({ isMobile }) {
  const cursorRef = useRef(null)

  useEffect(() => {
    if (isMobile || !cursorRef.current) return

    cursorRef.current.classList.add('active')

    const handleMouseMove = (e) => {
      gsap.to(cursorRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        overwrite: 'auto',
      })
    }

    const handleMouseLeave = () => {
      cursorRef.current?.classList.remove('active')
    }

    const handleMouseEnter = () => {
      cursorRef.current?.classList.add('active')
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [isMobile])

  return (
    <div ref={cursorRef} id="custom-cursor" className="pointer-events-none">
      <div className="cursor-crosshair" />
      <div className="cursor-reticle" />
    </div>
  )
}
