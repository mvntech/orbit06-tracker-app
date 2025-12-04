'use client'

import { cn } from '@/lib/utils'
import { ActivityCategory } from '@/types/database'

interface ActivityBlockProps {
  category: ActivityCategory
  value: number
  onToggle: () => void
  onValueChange?: (value: number) => void
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  disabled?: boolean
}

export function ActivityBlock({
  category,
  value,
  onToggle,
  onValueChange,
  size = 'md',
  showLabel = false,
  disabled = false,
}: ActivityBlockProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl',
  }

  const handleClick = () => {
    if (disabled) return
    onToggle()
  }

  const handleIntensityChange = (newValue: number) => {
    if (disabled || !onValueChange) return
    onValueChange(newValue)
  }

  const opacity = value === 0 ? 0.15 : 0.3 + (value / 5) * 0.7

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "relative rounded-lg border-2 transition-all duration-300 hover:scale-110 active:scale-95",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          sizeClasses[size],
          disabled && "opacity-50 cursor-not-allowed hover:scale-100"
        )}
        style={{
          backgroundColor: value > 0 ? category.color : 'transparent',
          borderColor: category.color,
          opacity: value > 0 ? opacity : 0.5,
          boxShadow: value > 0 ? `0 4px 12px ${category.color}40` : 'none',
        }}
        title={`${category.name}: ${value > 0 ? `Level ${value}` : 'Not tracked'}`}
      >
        <span className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-200",
          value > 0 ? "opacity-100" : "opacity-40"
        )}>
          {category.icon || '●'}
        </span>
        
        {/* checkmark for completed */}
        {value > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full shadow-md flex items-center justify-center text-[10px]">
            ✓
          </span>
        )}
      </button>
      
      {showLabel && (
        <span className="text-xs text-muted-foreground text-center max-w-[80px] truncate">
          {category.name}
        </span>
      )}

      {/* intensity selector */}
      {value > 0 && onValueChange && (
        <div className="flex gap-0.5 mt-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <button
              key={level}
              onClick={(e) => {
                e.stopPropagation()
                handleIntensityChange(level)
              }}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-200",
                level <= value ? "opacity-100" : "opacity-30"
              )}
              style={{ backgroundColor: category.color }}
              title={`Set intensity to ${level}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
