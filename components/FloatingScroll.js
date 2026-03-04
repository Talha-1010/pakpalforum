// components/FloatingScroll.js
import React, { useEffect, useRef } from 'react'

const FloatingScroll = ({ children, direction = 'up', speed = 0.05, className = '' }) => {
  const elementRef = useRef(null)

  useEffect(() => {
    // Skip if no element or if running on server
    if (!elementRef.current || typeof window === 'undefined') return

    let startPosition = 0
    let ticking = false
    let animationFrame = null

    const handleScroll = () => {
      startPosition = window.scrollY
      if (!ticking) {
        animationFrame = window.requestAnimationFrame(() => {
          updatePosition(startPosition)
          ticking = false
        })
        ticking = true
      }
    }

    const updatePosition = (scrollPos) => {
      if (!elementRef.current) return

      const elementTop = elementRef.current.getBoundingClientRect().top + window.scrollY
      const windowHeight = window.innerHeight

      // Only animate when element is in viewport
      if (
        scrollPos + windowHeight > elementTop &&
        scrollPos < elementTop + elementRef.current.offsetHeight
      ) {
        // Calculate how far the element is from the center of the viewport
        const viewportCenter = scrollPos + windowHeight / 2
        const distanceFromCenter =
          viewportCenter - (elementTop + elementRef.current.offsetHeight / 2)

        // Calculate the floating effect
        let floatValue = distanceFromCenter * speed

        // Determine direction
        if (direction === 'down') floatValue = -floatValue

        // Apply transform
        elementRef.current.style.transform = `translateY(${floatValue}px)`
      }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll)

    // Initial position update
    updatePosition(window.scrollY)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
    }
  }, [direction, speed])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

export default FloatingScroll
