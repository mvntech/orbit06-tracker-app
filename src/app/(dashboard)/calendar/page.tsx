export default function CalendarPage() {
  return (
    <div className="space-y-8">
      {/* header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Calendar View</h1>
        <p className="text-muted-foreground mt-1">
          View your year at a glance with the activity heatmap
        </p>
      </div>

      {/* coming soon card */}
      <div className="bg-card rounded-xl border-2 border-border p-12 shadow-md">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-6xl mb-4">🗓️</span>
          <h2 className="text-2xl font-bold text-foreground mb-2">Year Heatmap Coming Soon</h2>
          <p className="text-muted-foreground max-w-md">
            See your 2026 journey visualized with a beautiful GitHub-style contribution graph.
            Each day will be colored based on your activity levels.
          </p>
          <div className="mt-6 flex gap-2">
            {['#f6e6ee', '#f3a0ca', '#d04f99', '#c67b96', '#8a2e5a'].map((color, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-md shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Less → More activity</p>
        </div>
      </div>
    </div>
  )
}
