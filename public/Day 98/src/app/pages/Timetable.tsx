import { DashboardCard } from '../components/DashboardCard';
import { Badge } from '../components/ui/badge';
import { Clock, MapPin, User, Calendar } from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];

const schedule = {
  Monday: [
    { time: '9:00 AM', course: 'Data Structures', code: 'CS301', room: 'Lab 3', instructor: 'Dr. Smith', duration: 2 },
    { time: '2:00 PM', course: 'Database Systems', code: 'CS302', room: 'Room 201', instructor: 'Prof. Johnson', duration: 1 },
  ],
  Tuesday: [
    { time: '10:00 AM', course: 'Operating Systems', code: 'CS304', room: 'Room 305', instructor: 'Dr. Williams', duration: 2 },
    { time: '3:00 PM', course: 'Software Engineering', code: 'CS305', room: 'Room 102', instructor: 'Prof. Brown', duration: 1 },
  ],
  Wednesday: [
    { time: '9:00 AM', course: 'Computer Networks', code: 'CS303', room: 'Lab 2', instructor: 'Dr. Davis', duration: 2 },
    { time: '1:00 PM', course: 'Data Structures Lab', code: 'CS301L', room: 'Lab 3', instructor: 'Dr. Smith', duration: 2 },
  ],
  Thursday: [
    { time: '10:00 AM', course: 'Operating Systems', code: 'CS304', room: 'Room 305', instructor: 'Dr. Williams', duration: 2 },
    { time: '4:00 PM', course: 'Database Systems Lab', code: 'CS302L', room: 'Lab 1', instructor: 'Prof. Johnson', duration: 2 },
  ],
  Friday: [
    { time: '11:00 AM', course: 'Software Engineering', code: 'CS305', room: 'Room 102', instructor: 'Prof. Brown', duration: 2 },
    { time: '2:00 PM', course: 'Computer Networks Lab', code: 'CS303L', room: 'Lab 2', instructor: 'Dr. Davis', duration: 2 },
  ],
};

const todayClasses = [
  { time: '9:00 AM - 11:00 AM', course: 'Data Structures', code: 'CS301', room: 'Lab 3', instructor: 'Dr. Smith', status: 'completed' },
  { time: '2:00 PM - 3:00 PM', course: 'Database Systems', code: 'CS302', room: 'Room 201', instructor: 'Prof. Johnson', status: 'upcoming' },
];

export function Timetable() {
  const currentDay = 'Monday'; // In real app, this would be dynamic

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-secondary mb-2">Class Timetable</h1>
        <p className="text-muted-foreground">Your weekly class schedule</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard title="Today's Classes" className="lg:col-span-1">
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-medium text-secondary">{currentDay}, Feb 21</span>
            </div>
            {todayClasses.map((classItem, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl border ${
                  classItem.status === 'completed'
                    ? 'bg-muted border-border'
                    : 'bg-primary/5 border-primary/20'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge 
                    className={
                      classItem.status === 'completed'
                        ? 'bg-muted-foreground hover:bg-muted-foreground'
                        : 'bg-accent hover:bg-accent'
                    }
                  >
                    {classItem.status === 'completed' ? 'Completed' : 'Upcoming'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{classItem.code}</span>
                </div>
                <h4 className="font-medium text-secondary mb-3">{classItem.course}</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{classItem.room}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{classItem.instructor}</span>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Classes</span>
                <span className="font-semibold text-secondary">{todayClasses.length}</span>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard title="Weekly Schedule" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Header with days */}
              <div className="grid grid-cols-6 gap-2 mb-3">
                <div className="text-sm font-medium text-muted-foreground">Time</div>
                {days.map((day) => (
                  <div
                    key={day}
                    className={`text-sm font-medium text-center p-2 rounded-xl ${
                      day === currentDay
                        ? 'bg-primary text-white'
                        : 'text-secondary'
                    }`}
                  >
                    {day.slice(0, 3)}
                  </div>
                ))}
              </div>

              {/* Time slots */}
              <div className="space-y-1">
                {timeSlots.map((timeSlot) => (
                  <div key={timeSlot} className="grid grid-cols-6 gap-2">
                    <div className="text-xs text-muted-foreground py-2">{timeSlot}</div>
                    {days.map((day) => {
                      const classInSlot = schedule[day as keyof typeof schedule]?.find(
                        (c) => c.time === timeSlot
                      );
                      
                      return (
                        <div
                          key={`${day}-${timeSlot}`}
                          className={`min-h-[60px] rounded-xl border border-border ${
                            classInSlot
                              ? 'bg-primary/10 border-primary/30 p-2'
                              : 'bg-muted/30'
                          }`}
                        >
                          {classInSlot && (
                            <div className="h-full flex flex-col justify-between">
                              <div>
                                <p className="text-xs font-medium text-secondary truncate">
                                  {classInSlot.course}
                                </p>
                                <p className="text-xs text-muted-foreground">{classInSlot.code}</p>
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{classInSlot.room}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {days.map((day) => {
          const dayClasses = schedule[day as keyof typeof schedule] || [];
          return (
            <DashboardCard key={day} title={day}>
              <div className="space-y-2">
                {dayClasses.length > 0 ? (
                  <>
                    {dayClasses.map((classItem, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-xl bg-muted hover:bg-primary/10 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="outline" className="text-xs">{classItem.code}</Badge>
                        </div>
                        <p className="text-sm font-medium text-secondary truncate mb-2">
                          {classItem.course}
                        </p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{classItem.time}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{classItem.room}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-border text-center">
                      <span className="text-xs text-muted-foreground">
                        {dayClasses.length} {dayClasses.length === 1 ? 'class' : 'classes'}
                      </span>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No classes</p>
                )}
              </div>
            </DashboardCard>
          );
        })}
      </div>
    </div>
  );
}
