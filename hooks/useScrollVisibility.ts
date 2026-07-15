import { useState, useEffect, useRef } from 'react'

export function useScrollVisibility(delay: number = 150) {
  const [isVisible, setIsVisible] = useState(true)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Hide while scrolling
      if (Math.abs(currentScrollY - lastScrollY.current) > 5) {
        setIsVisible(false)
      }
      
      lastScrollY.current = currentScrollY

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      // Show after scroll stops
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true)
      }, delay)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [delay])

  return isVisible
}

