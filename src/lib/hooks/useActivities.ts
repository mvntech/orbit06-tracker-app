'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ActivityCategory, ActivityLog } from '@/types/database'

export function useActivities(date: Date) {
  const [categories, setCategories] = useState<ActivityCategory[]>([])
  const [logs, setLogs] = useState<Map<string, ActivityLog>>(new Map())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const dateStr = date.toISOString().split('T')[0]

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    const supabase = createClient()
    
    try {
      // fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('activity_categories')
        .select('*')
        .order('sort_order', { ascending: true })
        .returns<ActivityCategory[]>()

      if (categoriesError) throw categoriesError
      setCategories(categoriesData || [])

      // fetch logs for the specific date
      const { data: logsData, error: logsError } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('date', dateStr)
        .returns<ActivityLog[]>()

      if (logsError) throw logsError
      
      // convert to map
      const logsMap = new Map<string, ActivityLog>()
      if (logsData) {
        logsData.forEach(log => {
          logsMap.set(log.category_id, log)
        })
      }
      setLogs(logsMap)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }, [dateStr])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const toggleActivity = async (categoryId: string, currentValue: number) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    try {
      if (currentValue > 0) {
        // remove the log
        await supabase
          .from('activity_logs')
          .delete()
          .eq('user_id', user.id)
          .eq('category_id', categoryId)
          .eq('date', dateStr)

        setLogs(prev => {
          const newMap = new Map(prev)
          newMap.delete(categoryId)
          return newMap
        })
      } else {
        // create new log with value 1
        const insertData = {
          user_id: user.id,
          category_id: categoryId,
          date: dateStr,
          value: 1,
        }
        
        const { data, error } = await supabase
          .from('activity_logs')
          .upsert(insertData as never)
          .select()
          .returns<ActivityLog[]>()
          .single()

        if (error) throw error
        if (!data) throw new Error('No data returned')

        setLogs(prev => {
          const newMap = new Map(prev)
          newMap.set(categoryId, data)
          return newMap
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update activity')
    }
  }

  const updateActivityValue = async (categoryId: string, value: number) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return

    try {
      const insertData = {
        user_id: user.id,
        category_id: categoryId,
        date: dateStr,
        value,
      }

      const { data, error } = await supabase
        .from('activity_logs')
        .upsert(insertData as never)
        .select()
        .returns<ActivityLog[]>()
        .single()

      if (error) throw error
      if (!data) throw new Error('No data returned')

      setLogs(prev => {
        const newMap = new Map(prev)
        newMap.set(categoryId, data)
        return newMap
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update activity')
    }
  }

  return {
    categories,
    logs,
    loading,
    error,
    toggleActivity,
    updateActivityValue,
    refetch: fetchData,
  }
}
