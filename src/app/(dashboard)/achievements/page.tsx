export default function AchievementsPage() {
  return (
    <div className="space-y-8">
      {/* header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Achievements</h1>
        <p className="text-muted-foreground mt-1">
          Unlock badges and celebrate your progress
        </p>
      </div>

      {/* coming soon card */}
      <div className="bg-card rounded-xl border-2 border-border p-12 shadow-md">
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-6xl mb-4">🏆</span>
          <h2 className="text-2xl font-bold text-foreground mb-2">Achievements Coming Soon</h2>
          <p className="text-muted-foreground max-w-md">
            Earn badges for your dedication! From streak warriors to variety masters,
            there are achievements for everyone.
          </p>
          
          {/* preview badges */}
          <div className="mt-8 grid grid-cols-4 gap-4">
            {[
              { icon: '🌟', tier: 'bronze', name: 'First Step' },
              { icon: '🔥', tier: 'silver', name: 'Week Warrior' },
              { icon: '💪', tier: 'gold', name: 'Monthly Master' },
              { icon: '👑', tier: 'platinum', name: 'Year Legend' },
            ].map((badge) => (
              <div 
                key={badge.name}
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50"
              >
                <div className="text-4xl opacity-30">{badge.icon}</div>
                <span className="text-xs text-muted-foreground">{badge.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  badge.tier === 'bronze' ? 'bg-amber-600/20 text-amber-700' :
                  badge.tier === 'silver' ? 'bg-slate-400/20 text-slate-600' :
                  badge.tier === 'gold' ? 'bg-yellow-400/20 text-yellow-700' :
                  'bg-purple-400/20 text-purple-700'
                }`}>
                  {badge.tier}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
