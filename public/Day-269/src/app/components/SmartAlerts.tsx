import { AlertTriangle, TrendingDown, Clock, UserX, Bell, X } from 'lucide-react';
import { students, attendanceRecords } from '../data/mockData';

interface SmartAlertsProps {
  onClose?: () => void;
}

export function SmartAlerts({ onClose }: SmartAlertsProps) {
  // Generate smart alerts based on attendance patterns
  const alerts = [
    {
      id: 1,
      type: 'critical',
      icon: AlertTriangle,
      student: students[3], // Noah Brown - 78%
      title: 'Low Attendance Alert',
      message: 'Attendance dropped below 80% threshold',
      action: 'Contact Parent',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'warning',
      icon: TrendingDown,
      student: students[5], // Ethan Martinez - 85%
      title: 'Declining Attendance Pattern',
      message: 'Missed 3 out of last 5 days',
      action: 'Review History',
      time: '5 hours ago',
    },
    {
      id: 3,
      type: 'info',
      icon: Clock,
      student: students[1], // Liam Smith
      title: 'Frequent Late Arrivals',
      message: 'Late 4 times this week',
      action: 'Send Reminder',
      time: '1 day ago',
    },
    {
      id: 4,
      type: 'critical',
      icon: UserX,
      student: students[7], // Mason Rodriguez
      title: 'Consecutive Absences',
      message: 'Absent for 2 consecutive days',
      action: 'Immediate Action',
      time: '3 hours ago',
    },
  ];

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'critical':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: 'bg-red-500',
          text: 'text-red-600',
          button: 'bg-red-500 hover:bg-red-600',
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: 'bg-yellow-500',
          text: 'text-yellow-600',
          button: 'bg-yellow-500 hover:bg-yellow-600',
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'bg-blue-500',
          text: 'text-blue-600',
          button: 'bg-blue-500 hover:bg-blue-600',
        };
    }
  };

  return (
    <div className="space-y-4">
      {alerts.map((alert) => {
        const Icon = alert.icon;
        const styles = getAlertStyle(alert.type);

        return (
          <div
            key={alert.id}
            className={`${styles.bg} border ${styles.border} rounded-xl p-4 hover:shadow-md transition-all`}
          >
            <div className="flex items-start gap-4">
              <div className={`${styles.icon} p-3 rounded-lg flex-shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-900 mb-1">{alert.title}</h4>
                    <p className="text-sm text-slate-600">{alert.message}</p>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap">{alert.time}</span>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <img
                    src={alert.student.profilePhoto}
                    alt={alert.student.name}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{alert.student.name}</p>
                    <p className="text-xs text-slate-600">
                      {alert.student.rollNumber} • {alert.student.class}
                    </p>
                  </div>
                  <button
                    className={`${styles.button} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors`}
                  >
                    {alert.action}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function SmartAlertsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-8 h-8" />
              <div>
                <h2 className="text-2xl font-semibold">Smart Alerts</h2>
                <p className="text-orange-50">AI-powered attendance insights</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 rounded-xl p-4 border border-red-200">
              <p className="text-sm text-slate-600 mb-1">Critical</p>
              <p className="text-3xl font-bold text-red-600">2</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
              <p className="text-sm text-slate-600 mb-1">Warnings</p>
              <p className="text-3xl font-bold text-yellow-600">1</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="text-sm text-slate-600 mb-1">Info</p>
              <p className="text-3xl font-bold text-blue-600">1</p>
            </div>
          </div>

          <SmartAlerts />
        </div>
      </div>
    </div>
  );
}
