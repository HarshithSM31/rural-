import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, PlusCircle, FileBarChart } from 'lucide-react';
import { cn } from '../../lib/utils';

const BottomNav = () => {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/students', icon: Users, label: 'Students' },
    { to: '/add-activity', icon: PlusCircle, label: 'Activities' },
    { to: '/reports', icon: FileBarChart, label: 'Reports' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-24 bg-white border-t border-slate-100 flex items-center justify-around z-50 shadow-[0_-10px_40px_rgba(44,62,80,0.05)]">
      <div className="max-w-md mx-auto w-full flex justify-around items-center px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            id={`nav-${item.label.toLowerCase()}`}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 transition-all group px-4 py-2",
                isActive ? "opacity-100" : "opacity-40 hover:opacity-100"
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300",
                  isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-secondary bg-neutral"
                )}>
                  <item.icon size={22} />
                </div>
                <span className={cn(
                  "text-[9px] font-black uppercase tracking-[0.2em] mt-1",
                  isActive ? "text-primary" : "text-secondary"
                )}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
