'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { UserStats } from '@/types/database'

interface StatsOverview {
  totalActivitiesLogged: number
  currentLongestStreak: number
  categoriesTrackedToday: number
  totalCategories: number
  statsByCategory: Map<string, UserStats>
}

export function useStats() {
  const [stats, setStats] = useState<StatsOverview | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    const supabase = createClient()
    const today = new Date().toISOString().split('T')[0]
    
    try {
      // fetch user stats
      const { data: userStats, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .returns<UserStats[]>()

      if (statsError) throw statsError

      // fetch today's logs count
      const { data: todayLogs, error: todayError } = await supabase
        .from('activity_logs')
        .select('id')
        .eq('date', today)

      if (todayError) throw todayError

      // fetch total categories
      const { count: totalCategories, error: catError } = await supabase
        .from('activity_categories')
        .select('id', { count: 'exact', head: true })

      if (catError) throw catError

      // calculate aggregate stats
      const statsByCategory = new Map<string, UserStats>()
      let totalActivitiesLogged = 0
      let currentLongestStreak = 0

      if (userStats) {
        userStats.forEach(stat => {
          statsByCategory.set(stat.category_id, stat)
          totalActivitiesLogged += stat.total_count
          if (stat.current_streak > currentLongestStreak) {
            currentLongestStreak = stat.current_streak
          }
        })
      }

      setStats({
        totalActivitiesLogged,
        currentLongestStreak,
        categoriesTrackedToday: todayLogs?.length || 0,
        totalCategories: totalCategories || 0,
        statsByCategory,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stats')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
  }
}
