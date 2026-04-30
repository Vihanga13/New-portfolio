import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function LayeredImage({
  foreground,
  midground,
  background,
  className = '',
  isReducedMotion,
  onHover,
}) {
  const containerRef = useRef(null)
  const foregroundRef = useRef(null)
  const midgroundRef = useRef(null)
  const backgroundRef = useRef(null)

  useEffect(() => {
    if (isReducedMotion || !containerRef.current) return

    // Parallax effect on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      onUpdate: (self) => {
        if (foregroundRef.current) {
          gsap.to(foregroundRef.current, {
            yPercent: self.progress * 15,
            duration: 0.3,
            overwrite: 'auto',
          })
        }

        if (midgroundRef.current) {
          gsap.to(midgroundRef.current, {
            yPercent: self.progress * 8,
            duration: 0.3,
            overwrite: 'auto',
          })
        }

        if (backgroundRef.current) {
          gsap.to(backgroundRef.current, {
            yPercent: self.progress * 3,
            duration: 0.3,
            overwrite: 'auto',
          })
        }
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === containerRef.current) {
          trigger.kill()
        }
      })
    }
  }, [isReducedMotion])

  const handleMouseEnter = () => {
    if (onHover && !isReducedMotion) {
      gsap.to(foregroundRef.current, {
        scale: 1.08,
        duration: 0.6,
        ease: 'power2.out',
      })

      if (midgroundRef.current) {
        gsap.to(midgroundRef.current, {
          scale: 1.05,
          duration: 0.6,
          ease: 'power2.out',
        })
      }
    }
  }

  const handleMouseLeave = () => {
    if (onHover && !isReducedMotion) {
      gsap.to(foregroundRef.current, {
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
      })

      if (midgroundRef.current) {
        gsap.to(midgroundRef.current, {
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
        })
      }
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Layer */}
      {background && (
        <div ref={backgroundRef} className="absolute inset-0">
          {typeof background === 'string' ? (
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ) : (
            background
          )}
        </div>
      )}

      {/* Midground Layer */}
      {midground && (
        <div ref={midgroundRef} className="absolute inset-0">
          {typeof midground === 'string' ? (
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${midground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ) : (
            midground
          )}
        </div>
      )}

      {/* Foreground Layer */}
      {foreground && (
        <div ref={foregroundRef} className="absolute inset-0">
          {typeof foreground === 'string' ? (
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${foreground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ) : (
            foreground
          )}
        </div>
      )}
    </div>
  )
}
