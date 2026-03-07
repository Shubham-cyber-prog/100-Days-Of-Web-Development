export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  profilePhoto: string;
  attendancePercentage: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  class: string;
  status: 'present' | 'absent' | 'late';
  timestamp: string;
  date: string;
}

export const students: Student[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    rollNumber: 'A001',
    class: 'Grade 10-A',
    profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    attendancePercentage: 95,
  },
  {
    id: '2',
    name: 'Liam Smith',
    rollNumber: 'A002',
    class: 'Grade 10-A',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    attendancePercentage: 88,
  },
  {
    id: '3',
    name: 'Olivia Williams',
    rollNumber: 'A003',
    class: 'Grade 10-A',
    profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    attendancePercentage: 92,
  },
  {
    id: '4',
    name: 'Noah Brown',
    rollNumber: 'A004',
    class: 'Grade 10-A',
    profilePhoto: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    attendancePercentage: 78,
  },
  {
    id: '5',
    name: 'Ava Davis',
    rollNumber: 'B001',
    class: 'Grade 10-B',
    profilePhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    attendancePercentage: 96,
  },
  {
    id: '6',
    name: 'Ethan Martinez',
    rollNumber: 'B002',
    class: 'Grade 10-B',
    profilePhoto: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
    attendancePercentage: 85,
  },
  {
    id: '7',
    name: 'Sophia Garcia',
    rollNumber: 'B003',
    class: 'Grade 10-B',
    profilePhoto: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop',
    attendancePercentage: 90,
  },
  {
    id: '8',
    name: 'Mason Rodriguez',
    rollNumber: 'B004',
    class: 'Grade 10-B',
    profilePhoto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    attendancePercentage: 82,
  },
  {
    id: '9',
    name: 'Isabella Wilson',
    rollNumber: 'C001',
    class: 'Grade 11-A',
    profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    attendancePercentage: 93,
  },
  {
    id: '10',
    name: 'James Anderson',
    rollNumber: 'C002',
    class: 'Grade 11-A',
    profilePhoto: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=150&h=150&fit=crop',
    attendancePercentage: 87,
  },
];

export const generateAttendanceRecords = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const today = new Date('2026-03-04');
  const statuses: Array<'present' | 'absent' | 'late'> = ['present', 'absent', 'late'];
  
  // Generate records for the last 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    students.forEach((student) => {
      // Higher probability of being present
      const rand = Math.random();
      let status: 'present' | 'absent' | 'late';
      
      if (rand > 0.85) {
        status = 'absent';
      } else if (rand > 0.75) {
        status = 'late';
      } else {
        status = 'present';
      }
      
      records.push({
        id: `${student.id}-${dateStr}`,
        studentId: student.id,
        studentName: student.name,
        rollNumber: student.rollNumber,
        class: student.class,
        status,
        timestamp: `${dateStr}T${8 + Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}:00`,
        date: dateStr,
      });
    });
  }
  
  return records;
};

export const attendanceRecords = generateAttendanceRecords();

export const classes = ['Grade 10-A', 'Grade 10-B', 'Grade 11-A'];
