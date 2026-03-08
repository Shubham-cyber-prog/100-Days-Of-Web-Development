import { DashboardCard } from '../components/DashboardCard';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Bell, CheckCheck, Trash2, AlertCircle, Calendar, FileText, Award, MessageSquare } from 'lucide-react';

const notifications = [
  {
    id: 1,
    type: 'assignment',
    title: 'New Assignment Posted',
    message: 'Data Structures - Binary Trees Implementation due on Feb 24',
    time: '2 hours ago',
    read: false,
    priority: 'high',
  },
  {
    id: 2,
    type: 'event',
    title: 'Event Reminder',
    message: 'Career Fair starts tomorrow at 10:00 AM in Sports Complex',
    time: '5 hours ago',
    read: false,
    priority: 'medium',
  },
  {
    id: 3,
    type: 'grade',
    title: 'Grade Published',
    message: 'Your grade for Database Management midterm exam is now available',
    time: '1 day ago',
    read: true,
    priority: 'medium',
  },
  {
    id: 4,
    type: 'attendance',
    title: 'Attendance Alert',
    message: 'Your attendance in Physics has dropped to 79%. Maintain 75% minimum.',
    time: '1 day ago',
    read: false,
    priority: 'high',
  },
  {
    id: 5,
    type: 'announcement',
    title: 'Library Hours Extended',
    message: 'Library will remain open until midnight during midterm week',
    time: '2 days ago',
    read: true,
    priority: 'low',
  },
  {
    id: 6,
    type: 'message',
    title: 'Message from Dr. Smith',
    message: 'Office hours rescheduled to Thursday 2-4 PM',
    time: '2 days ago',
    read: true,
    priority: 'medium',
  },
  {
    id: 7,
    type: 'event',
    title: 'Registration Open',
    message: 'Registration for AI & Machine Learning Workshop is now open',
    time: '3 days ago',
    read: true,
    priority: 'low',
  },
  {
    id: 8,
    type: 'assignment',
    title: 'Assignment Graded',
    message: 'Your Calculus Problem Set has been graded. Score: 92/100',
    time: '3 days ago',
    read: true,
    priority: 'medium',
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'assignment':
      return FileText;
    case 'event':
      return Calendar;
    case 'grade':
      return Award;
    case 'attendance':
      return AlertCircle;
    case 'message':
      return MessageSquare;
    default:
      return Bell;
  }
};

const getIconColor = (type: string) => {
  switch (type) {
    case 'assignment':
      return 'text-primary';
    case 'event':
      return 'text-accent';
    case 'grade':
      return 'text-secondary';
    case 'attendance':
      return 'text-destructive';
    case 'message':
      return 'text-primary';
    default:
      return 'text-muted-foreground';
  }
};

export function Notifications() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-secondary mb-2">Notifications</h1>
          <p className="text-muted-foreground">Stay updated with all your campus activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="rounded-xl">
            <CheckCheck className="w-4 h-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline" className="rounded-xl">
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <DashboardCard title="Unread" className="bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="text-center">
            <div className="text-4xl font-semibold text-secondary mb-2">{unreadCount}</div>
            <p className="text-sm text-muted-foreground">New notifications</p>
          </div>
        </DashboardCard>

        <DashboardCard title="Total">
          <div className="text-center">
            <div className="text-4xl font-semibold text-secondary mb-2">{notifications.length}</div>
            <p className="text-sm text-muted-foreground">All time</p>
          </div>
        </DashboardCard>

        <DashboardCard title="High Priority">
          <div className="text-center">
            <div className="text-4xl font-semibold text-destructive mb-2">
              {notifications.filter(n => n.priority === 'high').length}
            </div>
            <p className="text-sm text-muted-foreground">Urgent items</p>
          </div>
        </DashboardCard>

        <DashboardCard title="This Week">
          <div className="text-center">
            <div className="text-4xl font-semibold text-accent mb-2">
              {notifications.filter(n => !n.time.includes('days')).length}
            </div>
            <p className="text-sm text-muted-foreground">Recent updates</p>
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="All Notifications">
        <div className="space-y-2">
          {notifications.map((notification) => {
            const Icon = getIcon(notification.type);
            const iconColor = getIconColor(notification.type);
            
            return (
              <div
                key={notification.id}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                  notification.read 
                    ? 'bg-white border-border' 
                    : 'bg-primary/5 border-primary/20'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0 ${
                  !notification.read ? 'bg-primary/10' : ''
                }`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-medium text-secondary">{notification.title}</h4>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {notification.priority === 'high' && (
                        <Badge className="bg-destructive hover:bg-destructive text-xs">
                          Urgent
                        </Badge>
                      )}
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                    <div className="flex gap-2">
                      {!notification.read && (
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                          Mark as read
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" className="h-8 text-xs text-destructive">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DashboardCard>
    </div>
  );
}
