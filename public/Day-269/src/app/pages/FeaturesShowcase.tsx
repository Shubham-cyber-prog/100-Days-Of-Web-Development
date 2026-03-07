import { QrCode, Bell, GitCompare, FileSpreadsheet, UserCircle } from 'lucide-react';

export default function FeaturesShowcase() {
  const features = [
    {
      icon: QrCode,
      title: 'QR Code Scanner',
      description: 'Scan student QR codes for instant attendance marking',
      color: 'purple',
      benefits: [
        'Quick and contactless attendance',
        'Real-time student verification',
        'Automatic timestamp recording',
        'Reduces manual entry errors',
      ],
    },
    {
      icon: Bell,
      title: 'Smart Alerts System',
      description: 'AI-powered alerts for attendance patterns and anomalies',
      color: 'orange',
      benefits: [
        'Low attendance warnings',
        'Declining pattern detection',
        'Late arrival notifications',
        'Consecutive absence alerts',
      ],
    },
    {
      icon: GitCompare,
      title: 'Comparison Tool',
      description: 'Compare attendance across time periods and classes',
      color: 'indigo',
      benefits: [
        'Time period comparisons',
        'Class-wise analysis',
        'Visual trend charts',
        'Performance insights',
      ],
    },
    {
      icon: FileSpreadsheet,
      title: 'Bulk Import/Export',
      description: 'Manage data in bulk using CSV and Excel files',
      color: 'pink',
      benefits: [
        'Import student data',
        'Export attendance records',
        'Multiple format support',
        'Data validation',
      ],
    },
    {
      icon: UserCircle,
      title: 'Parent Portal',
      description: "Parents can view their child's attendance and performance",
      color: 'blue',
      benefits: [
        'Real-time attendance updates',
        'Performance analytics',
        'Downloadable reports',
        'Historical data access',
      ],
    },
  ];

  const colorStyles: Record<string, { bg: string; text: string; border: string }> = {
    purple: { bg: 'from-purple-50 to-purple-100', text: 'text-purple-600', border: 'border-purple-200' },
    orange: { bg: 'from-orange-50 to-orange-100', text: 'text-orange-600', border: 'border-orange-200' },
    indigo: { bg: 'from-indigo-50 to-indigo-100', text: 'text-indigo-600', border: 'border-indigo-200' },
    pink: { bg: 'from-pink-50 to-pink-100', text: 'text-pink-600', border: 'border-pink-200' },
    blue: { bg: 'from-blue-50 to-blue-100', text: 'text-blue-600', border: 'border-blue-200' },
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">✨ New Features</h2>
        <p className="text-blue-100">
          Explore the latest additions to Smart Attendance Tracker
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          const styles = colorStyles[feature.color];

          return (
            <div
              key={index}
              className={`bg-gradient-to-br ${styles.bg} border ${styles.border} rounded-2xl p-6 hover:shadow-xl transition-all`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-4 bg-white rounded-xl shadow-md">
                  <Icon className={`w-8 h-8 ${styles.text}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm">{feature.description}</p>
                </div>
              </div>

              <div className="bg-white/50 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-slate-700 mb-3">Key Benefits:</h4>
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className={`${styles.text} mt-1`}>✓</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-slate-900 mb-4">How to Access Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6">
            <h4 className="font-semibold text-slate-900 mb-3">From Dashboard</h4>
            <p className="text-sm text-slate-600 mb-3">
              Access all new features from the quick action buttons on the main dashboard.
            </p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• QR Scanner button</li>
              <li>• Smart Alerts button</li>
              <li>• Compare button</li>
              <li>• Import/Export button</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6">
            <h4 className="font-semibold text-slate-900 mb-3">From Sidebar</h4>
            <p className="text-sm text-slate-600 mb-3">
              Navigate to the Parent Portal directly from the sidebar menu.
            </p>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Click "Parent Portal" in sidebar</li>
              <li>• View student performance</li>
              <li>• Download reports</li>
              <li>• Track attendance history</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8">
        <h3 className="text-2xl font-semibold text-slate-900 mb-4">Feature Highlights</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl">
            <div className="p-2 bg-purple-500 rounded-lg">
              <QrCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-1">QR Code Scanner</p>
              <p className="text-sm text-slate-600">
                Modern, contactless attendance marking with real-time student verification and automatic timestamp recording.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl">
            <div className="p-2 bg-orange-500 rounded-lg">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-1">Smart Alerts</p>
              <p className="text-sm text-slate-600">
                AI-powered system that detects attendance patterns and sends alerts for low attendance, consecutive absences, and frequent late arrivals.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-indigo-50 rounded-xl">
            <div className="p-2 bg-indigo-500 rounded-lg">
              <GitCompare className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-1">Comparison Tool</p>
              <p className="text-sm text-slate-600">
                Advanced analytics to compare attendance across different time periods and classes with visual charts and insights.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-pink-50 rounded-xl">
            <div className="p-2 bg-pink-500 rounded-lg">
              <FileSpreadsheet className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-1">Bulk Import/Export</p>
              <p className="text-sm text-slate-600">
                Efficiently manage large datasets with support for CSV, Excel, and PDF formats. Import student data or export attendance records in seconds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl">
            <div className="p-2 bg-blue-500 rounded-lg">
              <UserCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 mb-1">Parent Portal</p>
              <p className="text-sm text-slate-600">
                Dedicated portal for parents to track their child's attendance, view performance analytics, and download reports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
