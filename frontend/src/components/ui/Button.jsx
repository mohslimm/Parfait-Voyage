"use client";
import { useRef, memo } from 'react'
import { motion } from 'framer-motion'
import { useMagneticButton } from '@/animations/effects'

const variants = {
  primary: 'bg-gradient-to-r from-[#B8924A] via-[#c5a059] to-[#D4B57A] text-[#1A1200] font-semibold hover:opacity-90 shadow-gold',
  secondary: 'bg-[var(--color-bg-surface)] text-[var(--color-text-primary)] border border-[var(--color-border-subtle)] hover:border-[var(--color-gold-500)]',
  gold: 'bg-gradient-to-r from-[var(--color-gold-400)] to-[var(--color-gold-500)] text-[#1A1200] font-semibold hover:opacity-90',
  ghost: 'bg-transparent text-[var(--color-gold-500)] hover:bg-[var(--color-gold-glow)]',
  dark: 'bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)] border border-[var(--color-border-subtle)]',
}

const sizes = {
  sm:  'px-4 py-2 text-sm',
  md:  'px-6 py-3 text-base',
  lg:  'px-8 py-4 text-lg',
  xl:  'px-10 py-5 text-xl',
}

export const Button = memo(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  magnetic = false,
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  const ref = useRef(null)
  const magneticPos = useMagneticButton(ref)
  const { x, y } = magnetic ? magneticPos : { x: 0, y: 0 }

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`
        relative inline-flex items-center justify-center gap-2
        font-body rounded-[12px]
        transition-all duration-300 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-gold-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-void)]
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  )
})

Button.displayName = 'Button'
