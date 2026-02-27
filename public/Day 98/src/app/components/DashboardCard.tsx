import { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function DashboardCard({ title, children, className = '' }: DashboardCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-border p-6 ${className}`}>
      <h3 className="text-secondary mb-4">{title}</h3>
      {children}
    </div>
  );
}
