import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Heart, MessageCircle, UserPlus, AtSign, Bell } from 'lucide-react';
import { mockNotifications } from '../lib/mockData';
import type { Notification } from '../lib/mockData';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'like':
        return <Heart className="size-5 text-red-500 fill-current" />;
      case 'comment':
        return <MessageCircle className="size-5 text-blue-500" />;
      case 'follow':
        return <UserPlus className="size-5 text-green-500" />;
      case 'mention':
        return <AtSign className="size-5 text-purple-500" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="size-6 text-primary" />
          <h1 className="text-2xl font-bold">Notifications</h1>
        </div>
        <Button variant="outline" onClick={markAllAsRead}>
          Mark all as read
        </Button>
      </div>

      {/* Notifications Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
          <TabsTrigger value="follows">Follows</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-2">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`p-4 hover:bg-accent/50 transition-colors cursor-pointer ${
                !notification.isRead ? 'bg-primary/5 border-primary/20' : ''
              }`}
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Avatar className="size-12">
                    <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                    <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="relative -mt-3 ml-8">
                    <div className="bg-card p-1 rounded-full">
                      {getIcon(notification.type)}
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground">
                    <span className="font-medium">{notification.user.name}</span>{' '}
                    {notification.content}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{notification.time}</p>
                </div>
                {notification.post?.image && (
                  <img
                    src={notification.post.image}
                    alt="Post"
                    className="size-16 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                {!notification.isRead && (
                  <Badge className="size-2 p-0 rounded-full bg-primary self-start mt-2" />
                )}
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="mentions" className="mt-6 space-y-2">
          {notifications
            .filter((n) => n.type === 'mention')
            .map((notification) => (
              <Card key={notification.id} className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex gap-4">
                  <Avatar className="size-12">
                    <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                    <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-foreground">
                      <span className="font-medium">{notification.user.name}</span>{' '}
                      {notification.content}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                </div>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="likes" className="mt-6 space-y-2">
          {notifications
            .filter((n) => n.type === 'like')
            .map((notification) => (
              <Card key={notification.id} className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex gap-4">
                  <Avatar className="size-12">
                    <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                    <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-foreground">
                      <span className="font-medium">{notification.user.name}</span>{' '}
                      {notification.content}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  {notification.post?.image && (
                    <img
                      src={notification.post.image}
                      alt="Post"
                      className="size-16 rounded-lg object-cover"
                    />
                  )}
                </div>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="follows" className="mt-6 space-y-2">
          {notifications
            .filter((n) => n.type === 'follow')
            .map((notification) => (
              <Card key={notification.id} className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex gap-4 items-center">
                  <Avatar className="size-12">
                    <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
                    <AvatarFallback>{notification.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-foreground">
                      <span className="font-medium">{notification.user.name}</span>{' '}
                      {notification.content}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Follow Back
                  </Button>
                </div>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
