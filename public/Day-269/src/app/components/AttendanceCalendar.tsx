import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { attendanceRecords } from '../data/mockData';

interface AttendanceCalendarProps {
  onDateClick?: (date: string) => void;
}

export function AttendanceCalendar({ onDateClick }: AttendanceCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date('2026-03-04'));

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getAttendanceStatus = (dateStr: string) => {
    const dayRecords = attendanceRecords.filter((r) => r.date === dateStr);
    if (dayRecords.length === 0) return null;

    const present = dayRecords.filter((r) => r.status === 'present').length;
    const absent = dayRecords.filter((r) => r.status === 'absent').length;
    const late = dayRecords.filter((r) => r.status === 'late').length;

    // Return dominant status
    if (present >= absent && present >= late) return 'present';
    if (absent >= late) return 'absent';
    return 'late';
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const statusColors = {
    present: 'bg-green-500 hover:bg-green-600',
    absent: 'bg-red-500 hover:bg-red-600',
    late: 'bg-yellow-500 hover:bg-yellow-600',
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Attendance Calendar</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={previousMonth}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <span className="text-sm font-medium text-slate-700 min-w-[140px] text-center">
            {monthName}
          </span>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-slate-500 pb-2">
            {day}
          </div>
        ))}

        {Array.from({ length: startingDayOfWeek }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const status = getAttendanceStatus(dateStr);
          const isToday = dateStr === '2026-03-04';

          return (
            <button
              key={day}
              onClick={() => onDateClick?.(dateStr)}
              className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all ${
                status
                  ? `${statusColors[status]} text-white font-medium`
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              } ${isToday ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded" />
          <span className="text-xs text-slate-600">Present</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded" />
          <span className="text-xs text-slate-600">Absent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded" />
          <span className="text-xs text-slate-600">Late</span>
        </div>
      </div>
    </div>
  );
}
