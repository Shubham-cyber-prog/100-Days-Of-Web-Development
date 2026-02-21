import { DashboardCard } from '../components/DashboardCard';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Calendar, Bell, FileText, TrendingUp } from 'lucide-react';

const upcomingEvents = [
  { id: 1, title: 'Physics Lab Session', date: 'Feb 22, 2026', time: '10:00 AM' },
  { id: 2, title: 'Math Workshop', date: 'Feb 23, 2026', time: '2:00 PM' },
  { id: 3, title: 'Career Fair', date: 'Feb 25, 2026', time: '9:00 AM' },
];

const assignments = [
  { id: 1, title: 'Data Structures Assignment', subject: 'Computer Science', due: 'Feb 24' },
  { id: 2, title: 'Research Paper', subject: 'English', due: 'Feb 26' },
  { id: 3, title: 'Circuit Analysis', subject: 'Electronics', due: 'Feb 28' },
];

const announcements = [
  { id: 1, title: 'Library hours extended for midterms', time: '2 hours ago' },
  { id: 2, title: 'New sports facilities opening', time: '5 hours ago' },
  { id: 3, title: 'Guest lecture on AI by Dr. Smith', time: '1 day ago' },
];

export function Dashboard() {
  return (
    <div className="p-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Attendance" className="bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-secondary">87%</span>
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <Progress value={87} className="h-2" />
            <p className="text-sm text-muted-foreground">Great! Keep it up</p>
          </div>
        </DashboardCard>

        <DashboardCard title="Assignments Due">
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-secondary">3</span>
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">This week</p>
          </div>
        </DashboardCard>

        <DashboardCard title="Upcoming Events">
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-secondary">5</span>
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Next 7 days</p>
          </div>
        </DashboardCard>

        <DashboardCard title="Notifications">
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-secondary">8</span>
              <Bell className="w-5 h-5 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Unread messages</p>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Upcoming Events">
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-secondary truncate">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.date} at {event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard title="Assignments Due">
          <div className="space-y-3">
            {assignments.map((assignment) => (
              <div key={assignment.id} className="flex items-start justify-between gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-secondary truncate">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                  </div>
                </div>
                <Badge variant="outline" className="flex-shrink-0">{assignment.due}</Badge>
              </div>
            ))}
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Announcements">
        <div className="space-y-3">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors">
              <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-secondary">{announcement.title}</p>
                <p className="text-sm text-muted-foreground">{announcement.time}</p>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>
    </div>
  );
}
