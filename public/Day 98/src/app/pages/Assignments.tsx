import { DashboardCard } from '../components/DashboardCard';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { FileText, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const assignments = [
  {
    id: 1,
    title: 'Data Structures - Binary Trees Implementation',
    subject: 'Computer Science',
    dueDate: 'Feb 24, 2026',
    status: 'pending',
    priority: 'high',
    description: 'Implement binary search tree with insert, delete, and search operations',
  },
  {
    id: 2,
    title: 'Calculus Problem Set Chapter 5',
    subject: 'Mathematics',
    dueDate: 'Feb 26, 2026',
    status: 'pending',
    priority: 'medium',
    description: 'Complete exercises 1-20 from chapter 5',
  },
  {
    id: 3,
    title: 'Research Paper on Renewable Energy',
    subject: 'English',
    dueDate: 'Feb 28, 2026',
    status: 'in-progress',
    priority: 'high',
    description: 'Write a 2000-word research paper with at least 5 citations',
  },
  {
    id: 4,
    title: 'Circuit Analysis Lab Report',
    subject: 'Electronics',
    dueDate: 'Mar 2, 2026',
    status: 'in-progress',
    priority: 'medium',
    description: 'Submit lab report for RC circuit experiment',
  },
  {
    id: 5,
    title: 'Quantum Mechanics Problem Set',
    subject: 'Physics',
    dueDate: 'Mar 5, 2026',
    status: 'pending',
    priority: 'low',
    description: 'Solve problems 1-10 from chapter 3',
  },
  {
    id: 6,
    title: 'Database Design Project',
    subject: 'Computer Science',
    dueDate: 'Feb 20, 2026',
    status: 'submitted',
    priority: 'high',
    description: 'Design and implement a library management system database',
  },
];

const stats = [
  { label: 'Total Assignments', value: '12', icon: FileText, color: 'bg-primary' },
  { label: 'Pending', value: '3', icon: Clock, color: 'bg-muted-foreground' },
  { label: 'In Progress', value: '2', icon: AlertCircle, color: 'bg-accent' },
  { label: 'Submitted', value: '7', icon: CheckCircle2, color: 'bg-accent' },
];

export function Assignments() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-secondary mb-2">Assignments</h1>
        <p className="text-muted-foreground">Manage and track your assignments</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <DashboardCard key={stat.label} title={stat.label}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.color}/10 rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color === 'bg-primary' ? 'text-primary' : stat.color === 'bg-accent' ? 'text-accent' : 'text-muted-foreground'}`} />
                </div>
                <span className="text-3xl font-semibold text-secondary">{stat.value}</span>
              </div>
            </DashboardCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {assignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white rounded-xl border border-border p-6 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {assignment.subject}
                  </Badge>
                  {assignment.priority === 'high' && (
                    <Badge className="bg-destructive hover:bg-destructive text-xs">
                      High Priority
                    </Badge>
                  )}
                </div>
                <h3 className="text-secondary mb-2">{assignment.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{assignment.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Due: {assignment.dueDate}</span>
              </div>
              
              <Badge
                className={
                  assignment.status === 'submitted'
                    ? 'bg-accent hover:bg-accent'
                    : assignment.status === 'in-progress'
                    ? 'bg-primary hover:bg-primary'
                    : 'bg-muted hover:bg-muted text-muted-foreground'
                }
              >
                {assignment.status === 'submitted'
                  ? 'Submitted'
                  : assignment.status === 'in-progress'
                  ? 'In Progress'
                  : 'Pending'}
              </Badge>
            </div>

            {assignment.status !== 'submitted' && (
              <div className="mt-4 flex gap-2">
                <Button className="flex-1 bg-primary hover:bg-primary/90 rounded-xl">
                  Start Working
                </Button>
                <Button variant="outline" className="rounded-xl">
                  View Details
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
