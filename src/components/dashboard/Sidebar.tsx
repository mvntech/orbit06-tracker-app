'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { MessageCircleHeart, Calendar, Trophy, Settings, Sparkle } from 'lucide-react'

interface SidebarProps {
  user: User
}

const navItems = [
  { href: '/dashboard', label: 'Today', icon: <MessageCircleHeart /> },
  { href: '/calendar', label: 'Calendar', icon: <Calendar /> },
  { href: '/achievements', label: 'Achievements', icon: <Trophy /> },
  { href: '/settings', label: 'Settings', icon: <Settings /> },
]

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* logo & brand */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Sparkle className="text-3xl text-sidebar-primary" />
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground">Orbit06</h1>
            <p className="text-xs text-muted-foreground">Your 2026 Journey</p>
          </div>
        </Link>
      </div>

      {/* navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200",
                isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* user profile & logout */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold">
            {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {user.user_metadata?.full_name || 'User'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200"
        >
          Sign Out
        </button>
      </div>
    </aside>
  )
}
