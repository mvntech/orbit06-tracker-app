'use client'

import { ActivityBlock } from './ActivityBlock'
import { ActivityCategory, ActivityLog } from '@/types/database'

interface ActivityGridProps {
  categories: ActivityCategory[]
  logs: Map<string, ActivityLog>
  onToggle: (categoryId: string, currentValue: number) => void
  onValueChange?: (categoryId: string, value: number) => void
  loading?: boolean
}

export function ActivityGrid({
  categories,
  logs,
  onToggle,
  onValueChange,
  loading = false,
}: ActivityGridProps) {
  return (
    <div className="bg-card rounded-xl border-2 border-border p-6 shadow-md">
      <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-4">
        {categories.map((category) => {
          const log = logs.get(category.id)
          const value = log?.value || 0

          return (
            <ActivityBlock
              key={category.id}
              category={category}
              value={value}
              onToggle={() => onToggle(category.id, value)}
              onValueChange={onValueChange ? (v) => onValueChange(category.id, v) : undefined}
              showLabel
              disabled={loading}
              size="lg"
            />
          )
        })}
      </div>
    </div>
  )
}
