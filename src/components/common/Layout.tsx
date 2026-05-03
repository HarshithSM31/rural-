import React from 'react';
import BottomNav from './BottomNav';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogIn } from 'lucide-react';
import { cn } from '../../lib/utils';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, signIn, logout, loading } = useAuth();

  return (
    <div className="min-h-screen bg-neutral pb-24">
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          {/* Top rail */}
          <div className="flex justify-end pt-3 text-[10px] font-bold text-slate-400 gap-4 tracking-widest uppercase items-center">
             <div className="hidden sm:flex gap-4 border-r border-slate-100 pr-4 mr-4">
                <span>(800) 123 1234</span>
                <span>(800) 123 1235</span>
             </div>
             <div className="flex gap-3">
                <span className="hover:text-primary cursor-pointer">Login</span>
                <span className="hover:text-primary cursor-pointer">Register</span>
             </div>
          </div>
          
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center text-white font-serif text-2xl font-black italic shadow-lg">RL</div>
              <div>
                <h1 className="font-serif font-black text-2xl uppercase leading-none tracking-tighter text-secondary">Rural Learning</h1>
                <p className="text-[9px] text-primary font-black uppercase tracking-[0.2em] mt-1">Registry • Management • Analytics</p>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center gap-8 text-[11px] font-black uppercase tracking-widest text-slate-500">
              <NavLink 
                to="/" 
                className={({ isActive }) => cn("transition-colors hover:text-primary pb-1 border-b-2", isActive ? "text-secondary border-primary" : "border-transparent text-slate-500")}
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/students" 
                className={({ isActive }) => cn("transition-colors hover:text-primary pb-1 border-b-2", isActive ? "text-secondary border-primary" : "border-transparent text-slate-500")}
              >
                Students
              </NavLink>
              <NavLink 
                to="/reports" 
                className={({ isActive }) => cn("transition-colors hover:text-primary pb-1 border-b-2", isActive ? "text-secondary border-primary" : "border-transparent text-slate-500")}
              >
                Reports
              </NavLink>
              <NavLink 
                to="/add-activity" 
                className={({ isActive }) => cn("transition-colors hover:text-primary pb-1 border-b-2", isActive ? "text-secondary border-primary" : "border-transparent text-slate-500")}
              >
                Log Activity
              </NavLink>
            </nav>

            <div className="flex items-center gap-4">
              {!loading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-3">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm font-black text-secondary">{user.displayName}</p>
                        <button onClick={logout} className="text-[10px] text-primary uppercase font-black tracking-widest hover:underline">Sign Out</button>
                      </div>
                      <div className="w-12 h-12 rounded-full border-2 border-primary/20 shadow-sm overflow-hidden bg-slate-100">
                        <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} alt="User" />
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={signIn}
                      className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                      <LogIn size={16} />
                      <span>Staff Access</span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 pt-10">
        {user ? children : (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-12 bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-secondary/5">
            <div className="w-32 h-32 bg-primary/5 text-primary mb-10 rounded-[2.5rem] flex items-center justify-center animate-pulse">
               <LogIn size={64} />
            </div>
            <h2 className="text-5xl font-serif font-black text-secondary mb-6 tracking-tight leading-tight">Educational Excellence <br/>Through Data.</h2>
            <p className="text-slate-500 max-w-lg mb-12 font-medium text-xl leading-relaxed">Experience a sophisticated registry system tailored for rural institutions. Professional, precise, and collaborative.</p>
            <button 
              onClick={signIn}
              className="px-12 py-6 bg-secondary text-white rounded-full font-black text-xl shadow-2xl shadow-secondary/40 hover:bg-secondary/90 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest"
            >
              Enter Institutional Hub
            </button>
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default Layout;
