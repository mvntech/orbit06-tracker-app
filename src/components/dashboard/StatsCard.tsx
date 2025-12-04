interface StatsCardProps {
  icon: string
  label: string
  value: number | string
  subtext?: string
  color?: string
}

export function StatsCard({ icon, label, value, subtext, color }: StatsCardProps) {
  return (
    <div className="bg-card rounded-xl border-2 border-border p-5 shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{icon}</span>
        {color && (
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: color }}
          />
        )}
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold text-foreground">
          {value}
        </p>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {subtext && (
          <p className="text-xs text-muted-foreground">{subtext}</p>
        )}
      </div>
    </div>
  )
}
