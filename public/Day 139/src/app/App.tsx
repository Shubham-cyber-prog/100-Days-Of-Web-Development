import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { StudentDashboard } from './screens/StudentDashboard';
import { CourseDetail } from './screens/CourseDetail';
import { VideoLesson } from './screens/VideoLesson';
import { InstructorDashboard } from './screens/InstructorDashboard';
import { AdminPanel } from './screens/AdminPanel';
import { Button } from './components/ui/Button';
import { Badge } from './components/ui/Badge';

function App() {
  const [userRole, setUserRole] = useState<'student' | 'instructor' | 'admin'>('student');
  
  const userName = {
    student: 'Alex Morgan',
    instructor: 'Dr. Sarah Chen',
    admin: 'Admin User'
  }[userRole];
  
  const userRoleLabel = {
    student: 'Student' as const,
    instructor: 'Instructor' as const,
    admin: 'Admin' as const
  }[userRole];
  
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        <Sidebar role={userRole} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar userName={userName} userRole={userRoleLabel} />
          
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto p-6">
              {/* Role Switcher - Demo Only */}
              <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="mb-1">Demo Mode - Switch User Role</h4>
                    <p className="text-sm text-gray-600">Toggle between different user perspectives</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={userRole === 'student' ? 'primary' : 'secondary'}
                      onClick={() => setUserRole('student')}
                      size="sm"
                    >
                      Student View
                    </Button>
                    <Button 
                      variant={userRole === 'instructor' ? 'primary' : 'secondary'}
                      onClick={() => setUserRole('instructor')}
                      size="sm"
                    >
                      Instructor View
                    </Button>
                    <Button 
                      variant={userRole === 'admin' ? 'primary' : 'secondary'}
                      onClick={() => setUserRole('admin')}
                      size="sm"
                    >
                      Admin View
                    </Button>
                  </div>
                </div>
              </div>
              
              <Routes>
                {/* Student Routes */}
                <Route path="/" element={<StudentDashboard />} />
                <Route path="/course-detail" element={<CourseDetail />} />
                <Route path="/video-lesson" element={<VideoLesson />} />
                
                {/* Instructor Routes */}
                <Route path="/instructor" element={<InstructorDashboard />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminPanel />} />
                
                {/* Fallback */}
                <Route path="*" element={<StudentDashboard />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
