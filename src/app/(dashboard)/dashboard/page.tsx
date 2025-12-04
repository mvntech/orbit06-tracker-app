'use client'

import { useState } from 'react'
import { ActivityGrid } from '@/components/activity/ActivityGrid'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { useActivities } from '@/lib/hooks/useActivities'
import { useStats } from '@/lib/hooks/useStats'

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const { categories, logs, loading, toggleActivity, updateActivityValue } = useActivities(selectedDate)
  const { stats, loading: statsLoading } = useStats()

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const goToPreviousDay = () => {
    setSelectedDate(prev => {
      const newDate = new Date(prev)
      newDate.setDate(newDate.getDate() - 1)
      return newDate
    })
  }

  const goToNextDay = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    setSelectedDate(prev => {
      const newDate = new Date(prev)
      newDate.setDate(newDate.getDate() + 1)
      // don't allow future dates
      if (newDate > today) return prev
      return newDate
    })
  }

  const isToday = () => {
    const today = new Date()
    return selectedDate.toDateString() === today.toDateString()
  }

  return (
    <div className="space-y-8">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {isToday() ? "Today's Tracker" : "Activity Log"}
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your activities and build your streaks
          </p>
        </div>
      </div>

      {/* date navigation */}
      <div className="flex items-center justify-center gap-4 bg-card rounded-xl border-2 border-border p-4 shadow-md">
        <button
          onClick={goToPreviousDay}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label="Previous day"
        >
          <span className="text-xl">←</span>
        </button>
        <div className="text-center min-w-[280px]">
          <p className="text-lg font-semibold text-foreground">{formatDate(selectedDate)}</p>
          {isToday() && (
            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full">
              Today
            </span>
          )}
        </div>
        <button
          onClick={goToNextDay}
          disabled={isToday()}
          className="p-2 rounded-lg hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Next day"
        >
          <span className="text-xl">→</span>
        </button>
      </div>

      {/* stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          icon="🔥"
          label="Current Streak"
          value={statsLoading ? '-' : stats?.currentLongestStreak || 0}
          subtext="days consecutive"
        />
        <StatsCard
          icon="✅"
          label="Today's Progress"
          value={statsLoading ? '-' : `${stats?.categoriesTrackedToday || 0}/${stats?.totalCategories || 0}`}
          subtext="activities logged"
        />
        <StatsCard
          icon="📊"
          label="Total Logged"
          value={statsLoading ? '-' : stats?.totalActivitiesLogged || 0}
          subtext="all time"
        />
        <StatsCard
          icon="🎯"
          label="Completion"
          value={statsLoading || !stats ? '-' : `${Math.round((stats.categoriesTrackedToday / stats.totalCategories) * 100)}%`}
          subtext="for today"
        />
      </div>

      {/* activity grid */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Track Your Day
        </h2>
        {loading ? (
          <div className="bg-card rounded-xl border-2 border-border p-12 shadow-md">
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
              <p>Loading activities...</p>
            </div>
          </div>
        ) : categories.length === 0 ? (
          <div className="bg-card rounded-xl border-2 border-border p-12 shadow-md">
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <span className="text-5xl mb-4">📝</span>
              <p className="text-lg font-medium mb-2">No activities yet</p>
              <p className="text-sm">Run the database migrations to set up activity categories</p>
            </div>
          </div>
        ) : (
          <ActivityGrid
            categories={categories}
            logs={logs}
            onToggle={toggleActivity}
            onValueChange={updateActivityValue}
            loading={loading}
          />
        )}
      </div>

      {/* quick tips */}
      <div className="bg-accent/30 rounded-xl border-2 border-accent p-5">
        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <span>💡</span> Quick Tips
        </h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Click on any activity to toggle it on/off</li>
          <li>• Use the intensity dots below each block to set levels (1-5)</li>
          <li>• Build streaks by logging activities daily!</li>
        </ul>
      </div>
    </div>
  )
}
