import { DashboardCard } from '../components/DashboardCard';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

const attendanceData = [
  { id: 1, subject: 'Computer Science', date: 'Feb 18, 2026', status: 'Present' },
  { id: 2, subject: 'Mathematics', date: 'Feb 18, 2026', status: 'Present' },
  { id: 3, subject: 'Physics', date: 'Feb 17, 2026', status: 'Absent' },
  { id: 4, subject: 'English', date: 'Feb 17, 2026', status: 'Present' },
  { id: 5, subject: 'Electronics', date: 'Feb 16, 2026', status: 'Present' },
  { id: 6, subject: 'Computer Science', date: 'Feb 15, 2026', status: 'Present' },
  { id: 7, subject: 'Mathematics', date: 'Feb 15, 2026', status: 'Late' },
  { id: 8, subject: 'Physics', date: 'Feb 14, 2026', status: 'Present' },
];

const subjectStats = [
  { subject: 'Computer Science', percentage: 92, total: 24, present: 22 },
  { subject: 'Mathematics', percentage: 88, total: 24, present: 21 },
  { subject: 'Physics', percentage: 79, total: 24, present: 19 },
  { subject: 'English', percentage: 95, total: 20, present: 19 },
  { subject: 'Electronics', percentage: 83, total: 18, present: 15 },
];

export function Attendance() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-secondary mb-2">Attendance Overview</h1>
        <p className="text-muted-foreground">Track your attendance across all subjects</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard title="Overall Attendance" className="bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-5xl font-semibold text-secondary mb-2">87%</div>
              <p className="text-sm text-muted-foreground">Total Classes Attended</p>
            </div>
            <Progress value={87} className="h-3" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">96 of 110 classes</span>
              <span className="text-accent font-medium">On Track</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="This Month">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Present</span>
              <span className="font-semibold text-accent">18 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Absent</span>
              <span className="font-semibold text-destructive">2 days</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Late</span>
              <span className="font-semibold text-muted-foreground">1 day</span>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Status">
          <div className="space-y-4">
            <div className="p-4 bg-accent/10 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Minimum Required</p>
              <p className="text-2xl font-semibold text-secondary">75%</p>
            </div>
            <div className="p-4 bg-primary/10 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">Current Status</p>
              <p className="text-2xl font-semibold text-primary">12% Above</p>
            </div>
          </div>
        </DashboardCard>
      </div>

      <DashboardCard title="Subject-wise Attendance">
        <div className="space-y-4">
          {subjectStats.map((stat) => (
            <div key={stat.subject} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-secondary">{stat.subject}</span>
                <span className="text-sm text-muted-foreground">
                  {stat.present}/{stat.total} classes
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={stat.percentage} className="flex-1 h-2" />
                <span className="font-semibold text-secondary w-12 text-right">{stat.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </DashboardCard>

      <DashboardCard title="Recent Attendance">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.subject}</TableCell>
                  <TableCell className="text-muted-foreground">{record.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={record.status === 'Present' ? 'default' : 'outline'}
                      className={
                        record.status === 'Present' 
                          ? 'bg-accent hover:bg-accent' 
                          : record.status === 'Absent'
                          ? 'text-destructive border-destructive'
                          : 'text-muted-foreground'
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DashboardCard>
    </div>
  );
}
