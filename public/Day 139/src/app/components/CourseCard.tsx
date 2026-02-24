import React from 'react';
import { Card } from './ui/Card';
import { Progress } from './ui/Progress';
import { Clock, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CourseCardProps {
  title: string;
  instructor: string;
  progress?: number;
  imageQuery: string;
  duration?: string;
  lessons?: number;
  onClick?: () => void;
}

export function CourseCard({ title, instructor, progress, imageQuery, duration, lessons, onClick }: CourseCardProps) {
  return (
    <Card hover className="cursor-pointer" onClick={onClick}>
      <ImageWithFallback 
        src={`https://images.unsplash.com/photo-${imageQuery}?w=400&h=200&fit=crop`}
        alt={title}
        className="w-full h-40 object-cover rounded-t-2xl"
      />
      <div className="p-5">
        <h3 className="mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{instructor}</p>
        
        {progress !== undefined && (
          <div className="mb-4">
            <Progress value={progress} showLabel />
          </div>
        )}
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          {duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
          )}
          {lessons && (
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{lessons} lessons</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
