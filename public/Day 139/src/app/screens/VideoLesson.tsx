import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { Input, TextArea } from '../components/ui/Input';
import { Play, Pause, Volume2, Maximize, CheckCircle, Circle, FileText, MessageSquare } from 'lucide-react';

export function VideoLesson() {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const playlist = [
    { id: 1, title: 'Introduction to React', duration: '15:23', completed: true },
    { id: 2, title: 'Components and Props', duration: '22:15', completed: true },
    { id: 3, title: 'State and Lifecycle', duration: '28:45', completed: false, current: true },
    { id: 4, title: 'Hooks Deep Dive', duration: '35:20', completed: false },
  ];
  
  const notesTab = (
    <div className="space-y-4">
      <TextArea 
        placeholder="Take notes while watching..."
        rows={6}
      />
      <Button variant="primary">Save Notes</Button>
      
      <div className="mt-6">
        <h4 className="mb-3">Previous Notes</h4>
        <div className="space-y-3">
          {[
            { time: '05:32', note: 'Important: Always use key prop in lists' },
            { time: '12:15', note: 'Component lifecycle methods overview' },
          ].map((item, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-xl">
              <Badge variant="default" className="mb-2">{item.time}</Badge>
              <p className="text-sm text-gray-700">{item.note}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const resourcesTab = (
    <div className="space-y-3">
      {[
        { name: 'Lesson Slides.pdf', size: '2.4 MB' },
        { name: 'Code Examples.zip', size: '1.8 MB' },
        { name: 'Additional Reading.pdf', size: '850 KB' },
      ].map((resource) => (
        <div key={resource.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm">{resource.name}</p>
              <p className="text-xs text-gray-500">{resource.size}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">Download</Button>
        </div>
      ))}
    </div>
  );
  
  const discussionTab = (
    <div className="space-y-4">
      <div>
        <TextArea 
          placeholder="Ask a question or share your thoughts..."
          rows={4}
        />
        <Button variant="primary" className="mt-2">Post Comment</Button>
      </div>
      
      <div className="space-y-4 mt-6">
        {[
          { author: 'Sarah M.', time: '2 hours ago', comment: 'Great explanation! This really helped me understand state management.' },
          { author: 'Mike T.', time: '5 hours ago', comment: 'Could you elaborate on when to use useEffect vs useLayoutEffect?' },
        ].map((item, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm">{item.author}</p>
              <p className="text-xs text-gray-500">{item.time}</p>
            </div>
            <p className="text-gray-700">{item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 text-sm text-gray-600">
        <span>Advanced React Patterns</span>
        <span>•</span>
        <span>Module 2</span>
        <span>•</span>
        <Badge variant="info">Lesson 3</Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="relative bg-black rounded-2xl overflow-hidden aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-4 mx-auto">
                    {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
                  </div>
                  <p className="text-lg">State and Lifecycle</p>
                  <p className="text-sm text-gray-300">28:45</p>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <div className="w-full h-1 bg-white/30 rounded-full mb-4">
                  <div className="w-1/3 h-full bg-indigo-500 rounded-full"></div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-0.5" />}
                    </button>
                    <span className="text-white text-sm">9:32 / 28:45</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Volume2 className="w-5 h-5 text-white" />
                    </button>
                    <button className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Maximize className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <Card>
            <CardHeader>
              <h2>State and Lifecycle</h2>
              <p className="text-gray-600 mt-2">
                Learn how to manage component state and understand the React component lifecycle. 
                We'll cover useState, useEffect, and best practices for state management.
              </p>
            </CardHeader>
          </Card>
          
          <Tabs 
            tabs={[
              { id: 'notes', label: 'Notes', content: notesTab },
              { id: 'resources', label: 'Resources', content: resourcesTab },
              { id: 'discussion', label: 'Discussion', content: discussionTab },
            ]}
          />
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <h3>Course Content</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {playlist.map((item) => (
                  <div 
                    key={item.id}
                    className={`p-3 rounded-xl cursor-pointer transition-colors ${
                      item.current 
                        ? 'bg-indigo-50 border border-indigo-200' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {item.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : item.current ? (
                          <Play className="w-5 h-5 text-indigo-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm mb-1 ${item.current ? 'text-indigo-600' : ''}`}>
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500">{item.duration}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
