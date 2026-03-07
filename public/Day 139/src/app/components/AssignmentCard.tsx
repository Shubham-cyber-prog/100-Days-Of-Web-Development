import React from 'react';
import { Card, CardContent } from './ui/Card';
import { Badge } from './ui/Badge';
import { Calendar, FileText } from 'lucide-react';

interface AssignmentCardProps {
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'overdue';
  grade?: string;
}

export function AssignmentCard({ title, course, dueDate, status, grade }: AssignmentCardProps) {
  const statusVariant = {
    pending: 'warning' as const,
    submitted: 'info' as const,
    graded: 'success' as const,
    overdue: 'danger' as const
  };
  
  const statusLabel = {
    pending: 'Pending',
    submitted: 'Submitted',
    graded: 'Graded',
    overdue: 'Overdue'
  };
  
  return (
    <Card hover className="cursor-pointer">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h4 className="mb-1">{title}</h4>
              <p className="text-sm text-gray-600">{course}</p>
            </div>
          </div>
          <Badge variant={statusVariant[status]}>{statusLabel[status]}</Badge>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Due {dueDate}</span>
          </div>
          {grade && <span className="text-indigo-600">{grade}</span>}
        </div>
      </CardContent>
    </Card>
  );
}
