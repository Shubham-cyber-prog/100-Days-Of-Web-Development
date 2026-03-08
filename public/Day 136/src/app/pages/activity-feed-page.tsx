import { ActivityFeed } from "../components/activity-feed";

export default function ActivityFeedPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-1">Team Activity</h1>
        <p className="text-muted-foreground">
          Real-time feed of moderation actions across your team
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ActivityFeed />
        </div>
        
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="p-6 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl text-white">
            <h3 className="text-lg font-semibold mb-4">Today's Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-violet-100">Actions Taken</span>
                <span className="text-2xl font-bold">147</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-violet-100">Active Moderators</span>
                <span className="text-2xl font-bold">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-violet-100">Avg Response Time</span>
                <span className="text-2xl font-bold">2.4m</span>
              </div>
            </div>
          </div>

          {/* Top Moderators */}
          <div className="p-6 bg-card border rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Top Moderators Today</h3>
            <div className="space-y-3">
              {[
                { name: "Sarah Chen", actions: 42, avatar: "SC" },
                { name: "Mike Johnson", actions: 38, avatar: "MJ" },
                { name: "Emily Davis", actions: 35, avatar: "ED" },
              ].map((moderator, index) => (
                <div
                  key={moderator.name}
                  className="flex items-center gap-3 p-3 rounded-lg bg-accent/50"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{moderator.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {moderator.actions} actions
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
