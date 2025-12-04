export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type TrackerType =
  | 'years_in_pixels'
  | 'mood'
  | 'anxiety'
  | 'habit'
  | 'sleep'
  | 'workout'
  | 'steps'
  | 'shower'
  | 'veggie_fruits'
  | 'monthly_affirmation'
  | 'custom'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          display_name: string | null
          avatar_url: string | null
          timezone: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          timezone?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          display_name?: string | null
          avatar_url?: string | null
          timezone?: string
          updated_at?: string
        }
      }
      activity_categories: {
        Row: {
          id: string
          user_id: string | null
          name: string
          slug: TrackerType
          icon: string | null
          color: string
          is_system: boolean
          sort_order: number
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          name: string
          slug: TrackerType
          icon?: string | null
          color: string
          is_system?: boolean
          sort_order?: number
          description?: string | null
          created_at?: string
        }
        Update: {
          name?: string
          icon?: string | null
          color?: string
          sort_order?: number
          description?: string | null
        }
      }
      activity_logs: {
        Row: {
          id: string
          user_id: string
          category_id: string
          date: string
          value: number
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id: string
          date: string
          value?: number
          notes?: string | null
          created_at?: string
        }
        Update: {
          value?: number
          notes?: string | null
        }
      }
      user_stats: {
        Row: {
          id: string
          user_id: string
          category_id: string
          current_streak: number
          longest_streak: number
          total_count: number
          last_logged_date: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id: string
          current_streak?: number
          longest_streak?: number
          total_count?: number
          last_logged_date?: string | null
          updated_at?: string
        }
        Update: {
          current_streak?: number
          longest_streak?: number
          total_count?: number
          last_logged_date?: string | null
          updated_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          requirement_type: 'streak' | 'total' | 'variety' | 'special'
          requirement_value: number
          tier: 'bronze' | 'silver' | 'gold' | 'platinum'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          requirement_type: 'streak' | 'total' | 'variety' | 'special'
          requirement_value: number
          tier: 'bronze' | 'silver' | 'gold' | 'platinum'
          created_at?: string
        }
        Update: {
          name?: string
          description?: string | null
          icon?: string | null
          requirement_type?: 'streak' | 'total' | 'variety' | 'special'
          requirement_value?: number
          tier?: 'bronze' | 'silver' | 'gold' | 'platinum'
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_id: string
          unlocked_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_id: string
          unlocked_at?: string
        }
        Update: never
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      tracker_type: TrackerType
      achievement_tier: 'bronze' | 'silver' | 'gold' | 'platinum'
      requirement_type: 'streak' | 'total' | 'variety' | 'special'
    }
  }
}

// helper types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ActivityCategory = Database['public']['Tables']['activity_categories']['Row']
export type ActivityLog = Database['public']['Tables']['activity_logs']['Row']
export type UserStats = Database['public']['Tables']['user_stats']['Row']
export type Achievement = Database['public']['Tables']['achievements']['Row']
export type UserAchievement = Database['public']['Tables']['user_achievements']['Row']

// insert types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ActivityLogInsert = Database['public']['Tables']['activity_logs']['Insert']
export type UserStatsInsert = Database['public']['Tables']['user_stats']['Insert']

// update types
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
export type ActivityLogUpdate = Database['public']['Tables']['activity_logs']['Update']
export type UserStatsUpdate = Database['public']['Tables']['user_stats']['Update']
