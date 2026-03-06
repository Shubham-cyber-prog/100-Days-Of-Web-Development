import { DashboardCard } from '../components/DashboardCard';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { TrendingUp, Award, Target } from 'lucide-react';

const currentSemester = {
  name: 'Spring 2026',
  courses: [
    { id: 1, code: 'CS301', name: 'Data Structures & Algorithms', credits: 4, grade: 'A', points: 3.7, percentage: 92 },
    { id: 2, code: 'CS302', name: 'Database Management Systems', credits: 3, grade: 'A-', points: 3.7, percentage: 88 },
    { id: 3, code: 'CS303', name: 'Computer Networks', credits: 3, grade: 'B+', points: 3.3, percentage: 85 },
    { id: 4, code: 'CS304', name: 'Operating Systems', credits: 4, grade: 'A', points: 4.0, percentage: 94 },
    { id: 5, code: 'CS305', name: 'Software Engineering', credits: 3, grade: 'A-', points: 3.7, percentage: 89 },
  ],
  gpa: 3.72,
};

const previousSemesters = [
  {
    id: 1,
    name: 'Fall 2025',
    gpa: 3.65,
    credits: 16,
    courses: [
      { code: 'CS201', name: 'Data Structures', grade: 'A-', credits: 4 },
      { code: 'MATH201', name: 'Calculus II', grade: 'B+', credits: 3 },
      { code: 'PHY101', name: 'Physics I', grade: 'A', credits: 4 },
      { code: 'ENG201', name: 'Technical Writing', grade: 'A', credits: 3 },
      { code: 'CS202', name: 'Discrete Mathematics', grade: 'A-', credits: 2 },
    ],
  },
  {
    id: 2,
    name: 'Spring 2025',
    gpa: 3.85,
    credits: 15,
    courses: [
      { code: 'CS101', name: 'Programming Fundamentals', grade: 'A', credits: 4 },
      { code: 'MATH101', name: 'Calculus I', grade: 'A-', credits: 3 },
      { code: 'ENG101', name: 'English Composition', grade: 'A', credits: 3 },
      { code: 'CS102', name: 'Computer Architecture', grade: 'A', credits: 3 },
      { code: 'PHIL101', name: 'Logic & Reasoning', grade: 'B+', credits: 2 },
    ],
  },
];

const gradeScale = [
  { grade: 'A', range: '93-100', points: 4.0 },
  { grade: 'A-', range: '90-92', points: 3.7 },
  { grade: 'B+', range: '87-89', points: 3.3 },
  { grade: 'B', range: '83-86', points: 3.0 },
  { grade: 'B-', range: '80-82', points: 2.7 },
  { grade: 'C+', range: '77-79', points: 2.3 },
  { grade: 'C', range: '73-76', points: 2.0 },
];

export function Grades() {
  const cumulativeGPA = 3.74;
  const totalCredits = 48;

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-secondary mb-2">Grades & Results</h1>
        <p className="text-muted-foreground">Track your academic performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Cumulative GPA" className="bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-secondary">{cumulativeGPA}</span>
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <Progress value={cumulativeGPA * 25} className="h-2" />
            <p className="text-sm text-muted-foreground">Out of 4.0</p>
          </div>
        </DashboardCard>

        <DashboardCard title="Current Semester">
          <div className="space-y-3">
            <div className="text-4xl font-semibold text-primary">{currentSemester.gpa}</div>
            <p className="text-sm text-muted-foreground">{currentSemester.name}</p>
          </div>
        </DashboardCard>

        <DashboardCard title="Total Credits">
          <div className="space-y-3">
            <div className="text-4xl font-semibold text-secondary">{totalCredits}</div>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
        </DashboardCard>

        <DashboardCard title="Class Rank">
          <div className="space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-semibold text-accent">Top 15%</span>
            </div>
            <p className="text-sm text-muted-foreground">In your batch</p>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DashboardCard title={`Current Semester - ${currentSemester.name}`}>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Code</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead className="text-center">Credits</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                    <TableHead className="text-center">Percentage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentSemester.courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.code}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell className="text-center">{course.credits}</TableCell>
                      <TableCell className="text-center">
                        <Badge 
                          className={
                            course.grade.startsWith('A')
                              ? 'bg-accent hover:bg-accent'
                              : 'bg-primary hover:bg-primary'
                          }
                        >
                          {course.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center text-muted-foreground">
                        {course.percentage}%
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
              <span className="font-medium text-secondary">Semester GPA</span>
              <span className="text-2xl font-semibold text-primary">{currentSemester.gpa}</span>
            </div>
          </DashboardCard>

          {previousSemesters.map((semester) => (
            <DashboardCard key={semester.id} title={semester.name}>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Semester GPA</p>
                    <p className="text-2xl font-semibold text-secondary">{semester.gpa}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Credits</p>
                    <p className="text-2xl font-semibold text-secondary">{semester.credits}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {semester.courses.map((course) => (
                    <div
                      key={course.code}
                      className="flex items-center justify-between p-3 rounded-xl bg-muted"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-secondary text-sm truncate">{course.code}</p>
                        <p className="text-xs text-muted-foreground truncate">{course.name}</p>
                      </div>
                      <Badge variant="outline">{course.grade}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </DashboardCard>
          ))}
        </div>

        <div className="space-y-6">
          <DashboardCard title="Grade Scale">
            <div className="space-y-2">
              {gradeScale.map((item) => (
                <div
                  key={item.grade}
                  className="flex items-center justify-between p-3 rounded-xl border border-border"
                >
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary hover:bg-primary">{item.grade}</Badge>
                    <span className="text-sm text-muted-foreground">{item.range}%</span>
                  </div>
                  <span className="font-medium text-secondary">{item.points}</span>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Academic Goals">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-accent/10">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-accent" />
                  <span className="font-medium text-secondary">Target GPA</span>
                </div>
                <div className="text-3xl font-semibold text-accent mb-1">3.8</div>
                <p className="text-sm text-muted-foreground">End of semester goal</p>
              </div>

              <div className="p-4 rounded-xl bg-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span className="font-medium text-secondary">Dean's List</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Requires 3.5+ GPA
                </div>
                <Badge className="bg-accent hover:bg-accent mt-2">Achieved ✓</Badge>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Performance Trend">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Spring 2025</span>
                <span className="font-semibold text-secondary">3.85</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Fall 2025</span>
                <span className="font-semibold text-secondary">3.65</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Spring 2026</span>
                <span className="font-semibold text-primary">3.72</span>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-2 text-accent">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Improving trend</span>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
