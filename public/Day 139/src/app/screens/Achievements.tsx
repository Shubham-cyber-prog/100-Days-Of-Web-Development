import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { Award, Trophy, Star, Target, Download, Share2 } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Achievements() {
  const certificates = [
    { 
      title: 'Web Development Fundamentals', 
      instructor: 'Sarah Johnson', 
      date: 'Feb 15, 2026', 
      score: '95%',
      verified: true 
    },
    { 
      title: 'UI/UX Design Principles', 
      instructor: 'Emma Davis', 
      date: 'Jan 28, 2026', 
      score: '92%',
      verified: true 
    },
  ];
  
  const badges = [
    { name: 'Fast Learner', icon: Trophy, description: 'Complete 5 courses in one month', earned: true, color: 'text-yellow-600 bg-yellow-100' },
    { name: 'Perfect Score', icon: Star, description: 'Score 100% on any quiz', earned: true, color: 'text-purple-600 bg-purple-100' },
    { name: 'Discussion Leader', icon: Award, description: 'Post 50 helpful discussions', earned: true, color: 'text-blue-600 bg-blue-100' },
    { name: 'Marathon Learner', icon: Target, description: 'Study for 20 hours in one week', earned: false, color: 'text-gray-400 bg-gray-100' },
  ];
  
  const streaks = [
    { title: 'Current Streak', value: '12 days', progress: 60 },
    { title: 'Longest Streak', value: '28 days', progress: 100 },
    { title: 'Weekly Goal', value: '8/10 hrs', progress: 80 },
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mb-2">Certificates & Achievements</h1>
        <p className="text-gray-600">Track your learning milestones and accomplishments</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {streaks.map((streak) => (
          <Card key={streak.title}>
            <CardContent className="p-6">
              <h3 className="mb-2">{streak.value}</h3>
              <p className="text-sm text-gray-600 mb-3">{streak.title}</p>
              <Progress value={streak.progress} showLabel={false} />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <h2>Earned Certificates</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div key={cert.title} className="p-6 border-2 border-indigo-200 rounded-2xl bg-gradient-to-br from-indigo-50 to-white">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  {cert.verified && <Badge variant="success">Verified</Badge>}
                </div>
                <h3 className="mb-2">{cert.title}</h3>
                <p className="text-sm text-gray-600 mb-1">Instructor: {cert.instructor}</p>
                <p className="text-sm text-gray-600 mb-4">Completed: {cert.date} • Score: {cert.score}</p>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <h2>Badges Collection</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div 
                  key={badge.name}
                  className={`p-6 rounded-2xl border-2 text-center transition-all ${
                    badge.earned 
                      ? 'border-indigo-200 bg-white hover:shadow-md cursor-pointer' 
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className={`w-16 h-16 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4 className="mb-2">{badge.name}</h4>
                  <p className="text-xs text-gray-600">{badge.description}</p>
                  {badge.earned && (
                    <Badge variant="success" className="mt-3">Earned</Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
