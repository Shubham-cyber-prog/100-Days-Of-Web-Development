import React from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { Progress } from '../components/ui/Progress';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { DiscussionPanel } from '../components/DiscussionPanel';
import { Play, Clock, Users, Star, CheckCircle, Circle, Lock } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useNavigate } from 'react-router';

export function CourseDetail() {
  const navigate = useNavigate();
  
  const lessons = [
    { id: 1, title: 'Introduction to React', duration: '15 min', completed: true, locked: false },
    { id: 2, title: 'Components and Props', duration: '22 min', completed: true, locked: false },
    { id: 3, title: 'State and Lifecycle', duration: '28 min', completed: false, locked: false },
    { id: 4, title: 'Hooks Deep Dive', duration: '35 min', completed: false, locked: false },
    { id: 5, title: 'Context API', duration: '25 min', completed: false, locked: true },
    { id: 6, title: 'Performance Optimization', duration: '30 min', completed: false, locked: true },
  ];
  
  const discussions = [
    { id: '1', author: 'John Doe', content: 'What\'s the difference between useMemo and useCallback?', timestamp: '2 hours ago', likes: 12, replies: 5 },
    { id: '2', author: 'Jane Smith', content: 'Great explanation on React context! Really helped me understand the pattern.', timestamp: '5 hours ago', likes: 8, replies: 2 },
  ];
  
  const overviewTab = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3">About This Course</h3>
        <p className="text-gray-600 leading-relaxed">
          Master advanced React patterns and best practices. This comprehensive course covers hooks, context, performance optimization, 
          and modern React development techniques. Build real-world projects and learn from industry experts.
        </p>
      </div>
      
      <div>
        <h3 className="mb-3">What You'll Learn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Advanced React Hooks patterns',
            'Context API and state management',
            'Performance optimization techniques',
            'Testing React components',
            'Real-world project development',
            'Best practices and patterns'
          ].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const lessonsTab = (
    <div className="space-y-3">
      {lessons.map((lesson) => (
        <div 
          key={lesson.id} 
          className={`flex items-center justify-between p-4 rounded-xl border border-gray-200 ${lesson.locked ? 'bg-gray-50 opacity-60' : 'bg-white hover:shadow-md transition-shadow cursor-pointer'}`}
          onClick={() => !lesson.locked && navigate('/video-lesson')}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              {lesson.completed ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : lesson.locked ? (
                <Lock className="w-5 h-5 text-gray-400" />
              ) : (
                <Play className="w-5 h-5 text-indigo-600" />
              )}
            </div>
            <div>
              <h4>{lesson.title}</h4>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{lesson.duration}</span>
              </div>
            </div>
          </div>
          {lesson.completed && <Badge variant="success">Completed</Badge>}
        </div>
      ))}
    </div>
  );
  
  const discussionsTab = (
    <DiscussionPanel discussions={discussions} />
  );
  
  return (
    <div className="space-y-6">
      <Card>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ImageWithFallback 
              src="https://images.unsplash.com/photo-1633356122544-f134324a6c5f?w=800&h=400&fit=crop"
              alt="Course cover"
              className="w-full h-64 object-cover rounded-2xl"
            />
          </div>
          <div className="p-6 flex flex-col justify-center">
            <Badge variant="info" className="w-fit mb-3">Advanced</Badge>
            <h1 className="mb-2">Advanced React Patterns</h1>
            <p className="text-gray-600 mb-4">by Michael Chen</p>
            
            <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span>4.8 (234 reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>1,245 students</span>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Course Progress</span>
                <span className="text-sm">45%</span>
              </div>
              <Progress value={45} showLabel={false} />
            </div>
            
            <Button variant="primary" className="w-full">
              Continue Learning
            </Button>
          </div>
        </div>
      </Card>
      
      <Tabs 
        tabs={[
          { id: 'overview', label: 'Overview', content: overviewTab },
          { id: 'lessons', label: 'Lessons', content: lessonsTab },
          { id: 'discussions', label: 'Discussions', content: discussionsTab },
        ]}
      />
    </div>
  );
}
