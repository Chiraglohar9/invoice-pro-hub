import { useState, useEffect } from 'react'

interface UseCountUpProps {
  end: number
  start?: number
  duration?: number
  decimals?: number
}

export const useCountUp = ({ end, start = 0, duration = 2000, decimals = 0 }: UseCountUpProps) => {
  const [value, setValue] = useState(start)

  useEffect(() => {
    let startTime: number
    let animationId: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime

      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      
      const currentValue = start + (end - start) * easeOutQuart
      setValue(Number(currentValue.toFixed(decimals)))

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [end, start, duration, decimals])

  return value
}