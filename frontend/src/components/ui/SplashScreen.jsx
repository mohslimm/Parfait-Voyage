"use client";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion'
import { useState, useEffect } from 'react'

export function SplashScreen({ finishLoading }) {
  const [percent, setPercent] = useState(0)
  const [isRevealing, setIsRevealing] = useState(false)
  const progress = useMotionValue(0)

  // Derive all values from a single GPU-tracked progress value
  // This avoids React re-renders and keeps the animation light
  const taxiLimit = 15
  
  const planeX = useTransform(progress, 
    [0, taxiLimit, 100], 
    ["10%", "32.5%", "110%"]
  )
  
  const planeY = useTransform(progress, 
    [0, taxiLimit, 100], 
    ["0%", "0%", "110%"]
  )
  
  const planeRotation = useTransform(progress, 
    [0, taxiLimit, taxiLimit + 5, 100], 
    [90, 90, 45, 45]
  )
  
  const planeScale = useTransform(progress, [taxiLimit, 100], [1, 1.4])
  
  const clipPath = useTransform(progress, (v) => {
    const y = v < taxiLimit ? 0 : (v - taxiLimit) * 1.25
    return `inset(0% 0% ${y}% 0%)`
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1
      })
    }, 20)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Drive the animation once, at 60fps on the GPU
    const controls = animate(progress, 100, {
      duration: 3.5, // Slow, premium speed
      ease: [0.76, 0, 0.24, 1],
      onComplete: () => {
        setIsRevealing(true)
        setTimeout(finishLoading, 800)
      }
    })
    
    return () => controls.stop()
  }, [progress, finishLoading])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      style={{ clipPath }}
      animate={{ opacity: isRevealing ? 0 : 1 }}
      className="fixed inset-0 z-[9999] bg-[#0A0A0F] flex flex-col items-center justify-center overflow-hidden will-change-[clip-path]"
    >
      <div className="relative overflow-hidden w-full max-w-4xl flex flex-col items-center h-full justify-center">
        {/* Background Subtle Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,98,51,0.1),transparent_50%)] pointer-events-none" />

        {/* Main Branding */}
        <motion.div
          animate={{ 
            y: isRevealing ? -100 : 0,
            opacity: isRevealing ? 0 : 1 
          }}
          className="relative z-10 mb-32 flex flex-col items-center"
        >
          <span className="font-display text-4xl md:text-6xl lg:text-8xl font-bold text-white tracking-tighter block text-center">
            PARFAIT <span className="text-[#006233]">VOYAGE</span>
          </span>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/30 to-transparent mt-4"
          />
          <div className="flex items-center gap-4 mt-6">
            <div className="w-48 h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[#C9A96E]"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="font-mono text-sm text-[#C9A96E] w-12">{percent}%</span>
          </div>
        </motion.div>

        {/* Cinematic Plane Flight */}
        <motion.div
          className="absolute z-20 will-change-transform"
          style={{ 
            left: planeX,
            bottom: planeY,
            rotate: planeRotation,
            scale: planeScale
          }}
        >
          <div className="relative w-24 md:w-40 aspect-square flex items-center justify-center -translate-x-1/2 translate-y-1/2">
            {/* The image from the public directory */}
            <img 
              src="/plane-removebg.png" 
              alt="Plane"
              className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
            />
            
            {/* Engine Heat/Trail Effect */}
            <motion.div 
              className="absolute top-1/2 right-[85%] w-32 h-px bg-gradient-to-l from-[#C9A96E]/40 via-[#006233]/20 to-transparent origin-right"
              animate={{ width: [60, 100, 60], opacity: [0.3, 0.5, 0.3] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
            />
            
            {/* Wing Tip Lights */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div 
                className="absolute top-[20%] left-[40%] w-1 h-1 bg-red-500 rounded-full"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, delay: 0.6 }}
              />
              <motion.div 
                className="absolute bottom-[20%] left-[40%] w-1 h-1 bg-green-500 rounded-full"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealing ? 0 : 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-12 text-center z-10"
      >
        <p className="text-white/30 text-xs font-body tracking-[0.3em] uppercase mb-2">
          Expérience Voyage Premium
        </p>
        <p className="text-white/20 text-[10px] font-arabic mb-1">
          رحلة أحلامك تبدأ هنا
        </p>
        <p className="text-white/20 text-[10px] font-body tracking-[0.6em] uppercase">
          L'art de voyager différemment
        </p>
      </motion.div>
    </motion.div>
  )
}
