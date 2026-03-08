import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { Input, TextArea } from '../components/ui/Input';
import { Users, Plus, MessageSquare, Calendar, Lock, Globe } from 'lucide-react';

export function StudyGroups() {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  
  const myGroups = [
    { 
      name: 'React Mastery Group',
      course: 'Advanced React Patterns',
      members: 8,
      messages: 45,
      nextMeeting: 'Mar 8, 3:00 PM',
      privacy: 'private',
      active: true
    },
    { 
      name: 'UI/UX Design Study Circle',
      course: 'UI/UX Design Principles',
      members: 12,
      messages: 78,
      nextMeeting: 'Mar 10, 2:00 PM',
      privacy: 'public',
      active: true
    },
  ];
  
  const suggestedGroups = [
    { name: 'JavaScript Fundamentals', course: 'Web Development', members: 15, privacy: 'public' },
    { name: 'Node.js Developers', course: 'Backend Development', members: 9, privacy: 'private' },
    { name: 'CSS Wizards', course: 'Web Development', members: 11, privacy: 'public' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Study Groups</h1>
          <p className="text-gray-600">Collaborate with peers and enhance your learning</p>
        </div>
        <Button variant="primary" onClick={() => setShowCreateGroup(true)}>
          <Plus className="w-5 h-5" />
          Create Group
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>
            <h2 className="mb-1">{myGroups.length}</h2>
            <p className="text-sm text-gray-600">Active Groups</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
            </div>
            <h2 className="mb-1">123</h2>
            <p className="text-sm text-gray-600">Total Messages</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
            <h2 className="mb-1">3</h2>
            <p className="text-sm text-gray-600">Upcoming Sessions</p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="mb-4">My Study Groups</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {myGroups.map((group) => (
            <Card key={group.name} hover className="cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3>{group.name}</h3>
                      {group.privacy === 'private' ? (
                        <Lock className="w-4 h-4 text-gray-500" />
                      ) : (
                        <Globe className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{group.course}</p>
                  </div>
                  <Badge variant={group.active ? 'success' : 'default'}>
                    {group.active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{group.members} members</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MessageSquare className="w-4 h-4" />
                    <span>{group.messages} messages</span>
                  </div>
                </div>
                
                {group.nextMeeting && (
                  <div className="p-3 bg-indigo-50 rounded-xl mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      <span className="text-indigo-900">Next meeting: {group.nextMeeting}</span>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" className="flex-1">Open Group</Button>
                  <Button variant="secondary" size="sm">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <h2>Suggested Study Groups</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {suggestedGroups.map((group) => (
              <div key={group.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4>{group.name}</h4>
                      {group.privacy === 'private' ? (
                        <Lock className="w-4 h-4 text-gray-400" />
                      ) : (
                        <Globe className="w-4 h-4 text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{group.course} • {group.members} members</p>
                  </div>
                </div>
                <Button variant="primary" size="sm">Join Group</Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Modal
        isOpen={showCreateGroup}
        onClose={() => setShowCreateGroup(false)}
        title="Create Study Group"
        footer={
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setShowCreateGroup(false)}>Cancel</Button>
            <Button variant="primary">Create Group</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input label="Group Name" placeholder="e.g., React Study Circle" />
          <div>
            <label className="block text-sm mb-2">Related Course</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none">
              <option>Advanced React Patterns</option>
              <option>Web Development Fundamentals</option>
              <option>UI/UX Design Principles</option>
            </select>
          </div>
          <TextArea label="Description" placeholder="What is this group about?" rows={3} />
          <div>
            <label className="block text-sm mb-2">Privacy</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none">
              <option>Public - Anyone can join</option>
              <option>Private - Invitation only</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
