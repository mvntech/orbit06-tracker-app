import { User2Icon, SparkleIcon, BellIcon, DatabaseIcon } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Customize your Orbit06 experience
        </p>
      </div>

      {/* settings cards */}
      <div className="space-y-6">
        {/* profile section */}
        <div className="bg-card rounded-xl border-2 border-border p-6 shadow-md">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <User2Icon /> Profile
          </h2>
          <p className="text-sm text-muted-foreground">
            Profile settings coming soon. You'll be able to update your display name, avatar, and timezone.
          </p>
        </div>

        {/* appearance section */}
        <div className="bg-card rounded-xl border-2 border-border p-6 shadow-md">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <SparkleIcon /> Appearance
          </h2>
          <p className="text-sm text-muted-foreground">
            Dark mode and theme customization coming soon.
          </p>
        </div>

        {/* notifications section */}
        <div className="bg-card rounded-xl border-2 border-border p-6 shadow-md">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BellIcon /> Notifications
          </h2>
          <p className="text-sm text-muted-foreground">
            Daily reminders and streak notifications coming soon.
          </p>
        </div>

        {/* data section */}
        <div className="bg-card rounded-xl border-2 border-border p-6 shadow-md">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <DatabaseIcon /> Data
          </h2>
          <p className="text-sm text-muted-foreground">
            Export and import your data coming soon.
          </p>
        </div>
      </div>
    </div>
  )
}
