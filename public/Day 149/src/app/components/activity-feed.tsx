import React from 'react';
import { FileText, Edit, Trash2, Star, Tag, FolderOpen, User, Clock } from 'lucide-react';

interface Activity {
  id: string;
  type: 'create' | 'edit' | 'delete' | 'bookmark' | 'tag' | 'category';
  user: string;
  userAvatar?: string;
  action: string;
  target: string;
  timestamp?: Date;
  time?: string;
  icon?: typeof FileText;
  iconColor?: string;
  iconBg?: string;
}

interface ActivityFeedProps {
  activities?: Activity[];
}

export function ActivityFeed({ activities: providedActivities }: ActivityFeedProps) {
  const defaultActivities: Activity[] = [
    {
      id: '1',
      type: 'create',
      user: 'Sarah Johnson',
      userAvatar: 'SJ',
      action: 'created a new article',
      target: 'Advanced TypeScript Patterns',
      timestamp: new Date('2026-03-07T10:30:00'),
      icon: FileText,
      iconColor: 'text-green-600 dark:text-green-400',
      iconBg: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      id: '2',
      type: 'edit',
      user: 'Mike Chen',
      userAvatar: 'MC',
      action: 'edited',
      target: 'React Best Practices',
      timestamp: new Date('2026-03-07T09:45:00'),
      icon: Edit,
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      id: '3',
      type: 'bookmark',
      user: 'Emma Wilson',
      userAvatar: 'EW',
      action: 'bookmarked',
      target: 'API Documentation Guide',
      timestamp: new Date('2026-03-07T09:20:00'),
      icon: Star,
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      iconBg: 'bg-yellow-100 dark:bg-yellow-900/30'
    },
    {
      id: '4',
      type: 'tag',
      user: 'John Smith',
      userAvatar: 'JS',
      action: 'added tag "urgent" to',
      target: 'Database Migration Steps',
      timestamp: new Date('2026-03-07T08:55:00'),
      icon: Tag,
      iconColor: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      id: '5',
      type: 'category',
      user: 'Sarah Johnson',
      userAvatar: 'SJ',
      action: 'moved to category "Development"',
      target: 'Git Workflow Guide',
      timestamp: new Date('2026-03-07T08:30:00'),
      icon: FolderOpen,
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      iconBg: 'bg-indigo-100 dark:bg-indigo-900/30'
    },
    {
      id: '6',
      type: 'create',
      user: 'Alex Brown',
      userAvatar: 'AB',
      action: 'created a new article',
      target: 'Security Best Practices',
      timestamp: new Date('2026-03-07T07:15:00'),
      icon: FileText,
      iconColor: 'text-green-600 dark:text-green-400',
      iconBg: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      id: '7',
      type: 'edit',
      user: 'Mike Chen',
      userAvatar: 'MC',
      action: 'edited',
      target: 'Deployment Checklist',
      timestamp: new Date('2026-03-06T16:45:00'),
      icon: Edit,
      iconColor: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      id: '8',
      type: 'delete',
      user: 'John Smith',
      userAvatar: 'JS',
      action: 'deleted',
      target: 'Outdated Configuration Guide',
      timestamp: new Date('2026-03-06T15:20:00'),
      icon: Trash2,
      iconColor: 'text-red-600 dark:text-red-400',
      iconBg: 'bg-red-100 dark:bg-red-900/30'
    }
  ];

  const activities = providedActivities || defaultActivities;

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const Icon = activity.icon || FileText;
        return (
          <div key={activity.id} className="relative">
            {/* Timeline line */}
            {index < activities.length - 1 && (
              <div className="absolute left-5 top-12 w-0.5 h-full bg-gray-200 dark:bg-gray-700" />
            )}
            
            {/* Activity item */}
            <div className="flex gap-4">
              {/* Icon */}
              <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full ${activity.iconBg || 'bg-gray-100 dark:bg-gray-700'} flex items-center justify-center`}>
                <Icon className={`size-5 ${activity.iconColor || 'text-gray-600 dark:text-gray-400'}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-8">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">{activity.user}</span>
                      {' '}
                      <span className="text-gray-600 dark:text-gray-400">
                        {activity.action}
                      </span>
                      {' '}
                      <span className="font-medium text-gray-900 dark:text-white">
                        {activity.target}
                      </span>
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <Clock className="size-3" />
                      <span>{activity.timestamp ? formatTimestamp(activity.timestamp) : activity.time}</span>
                    </div>
                  </div>

                  {/* User avatar */}
                  {activity.userAvatar && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                      {activity.userAvatar}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}