import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Sidebar } from "@/components/dashboard/Sidebar"

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex bg-background">
      <Sidebar user={user} />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6 max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  )
}
