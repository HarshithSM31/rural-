import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: 'orange' | 'magenta' | 'navy' | 'slate';
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, trend, color = 'orange' }) => {
  const colorClasses = {
    orange: "text-primary",
    magenta: "text-accent",
    navy: "text-secondary",
    slate: "text-slate-400"
  };

  return (
    <div className="bg-white p-6 shadow-2xl shadow-secondary/5 border border-slate-100 group hover:border-primary transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-neutral text-secondary group-hover:bg-primary group-hover:text-white transition-all">
          <Icon size={20} />
        </div>
        {trend && (
          <span className={cn("text-[10px] font-black uppercase tracking-widest italic", colorClasses[color])}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{label}</p>
        <span className="text-4xl font-serif font-black text-secondary tracking-tighter">{value}</span>
      </div>
    </div>
  );
};

export default StatCard;
