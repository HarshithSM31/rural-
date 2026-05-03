import React, { useState, useEffect } from 'react';
import { User, ClipboardList, Target, Calendar, Award } from 'lucide-react';
import { studentService } from '../services/studentService';
import { activityService, calculateProgress } from '../services/activityService';
import { Student, Activity, StudentStats } from '../types';
import StatCard from '../components/dashboard/StatCard';
import Charts from '../components/dashboard/Charts';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

const Reports = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [loading, setLoading] = useState(true);

  const subjects = ['All', ...Array.from(new Set(activities.map(a => a.lessonName || 'General')))];

  useEffect(() => {
    const loadStudents = async () => {
      const data = await studentService.getStudents();
      setStudents(data);
      if (data.length > 0) setSelectedStudentId(data[0].id);
      setLoading(false);
    };
    loadStudents();
  }, []);

  useEffect(() => {
    if (!selectedStudentId) return;
    
    const loadStudentData = async () => {
      const aData = await activityService.getActivitiesForStudent(selectedStudentId);
      setActivities(aData);
      setStats(calculateProgress(aData));
      setSelectedSubject('All');
    };
    loadStudentData();
  }, [selectedStudentId]);

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  const filteredActivities = selectedSubject === 'All' 
    ? activities 
    : activities.filter(a => (a.lessonName || 'General') === selectedSubject);

  const performanceData = filteredActivities.slice(0, 15).reverse().map(a => ({
    name: format(new Date(a.date), 'MMM dd'),
    score: a.score,
    subject: a.lessonName || 'General'
  }));

  const selectedStudent = students.find(s => s.id === selectedStudentId);

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-black text-secondary tracking-tight">Analytics Hub</h2>
        <p className="text-[12px] text-primary font-bold uppercase tracking-widest">In-depth student performance analysis</p>
      </div>

      <div className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-secondary/5">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2 italic">Student Profile Selection</label>
        <div className="flex flex-nowrap overflow-x-auto gap-3 no-scrollbar pb-2">
          {students.map(s => (
            <button
              key={s.id}
              onClick={() => setSelectedStudentId(s.id)}
              className={cn(
                "whitespace-nowrap px-8 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all",
                selectedStudentId === s.id 
                  ? "bg-secondary text-white shadow-xl shadow-secondary/30 scale-105" 
                  : "bg-neutral text-slate-400 hover:bg-slate-50"
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {selectedStudent && stats && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-2xl shadow-secondary/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 rounded-[2rem] bg-neutral text-secondary flex items-center justify-center font-serif font-black text-4xl shadow-xl border border-slate-100">
                {selectedStudent.name[0]}
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-4xl font-serif font-black text-secondary tracking-tighter leading-none mb-2">{selectedStudent.name}</h3>
                <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] italic">{selectedStudent.class} • ID: {selectedStudent.studentId}</p>
              </div>
            </div>
            <div className="text-center md:text-right bg-secondary text-white px-10 py-6 rounded-2xl shadow-2xl shadow-secondary/20">
              <div className="text-5xl font-serif font-black italic tracking-tighter leading-none mb-1">
                {stats.progressScore}%
              </div>
              <p className="text-[9px] uppercase font-black text-white/60 tracking-[0.2em] italic">Progression Index</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard label="Avg. Score" value={`${stats.averageScore}%`} icon={Award} color="orange" />
            <StatCard label="Attendance" value={`${stats.attendancePercentage}%`} icon={Calendar} color="navy" />
            <StatCard label="LogsCount" value={stats.lessonsCompleted} icon={ClipboardList} color="magenta" />
            <StatCard label="Target" value="90%" icon={Target} color="slate" trend="Excellence" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 bg-white p-10 shadow-2xl shadow-secondary/5 border border-slate-100">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
                <h3 className="font-serif font-black text-secondary text-2xl uppercase tracking-tighter italic flex items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-xl">
                    <TrendingUp size={24} />
                  </div>
                  Subject Progression
                </h3>
                
                <div className="flex flex-wrap gap-2">
                  {subjects.map(sub => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubject(sub)}
                      className={cn(
                        "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em] transition-all border",
                        selectedSubject === sub 
                          ? "bg-primary border-primary text-white shadow-lg shadow-primary/20" 
                          : "bg-white border-slate-200 text-slate-400 hover:border-primary hover:text-primary"
                      )}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              {performanceData.length > 0 ? (
                <div className="space-y-4">
                  <Charts data={performanceData} type="line" dataKey="score" color="#f89406" />
                  <div className="flex items-center justify-center gap-8 mt-6">
                     <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-primary shadow-lg shadow-primary/20"></div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic underline underline-offset-4 decoration-primary/30">Academic Score (%)</span>
                     </div>
                  </div>
                </div>
              ) : (
                <div className="h-72 flex flex-col items-center justify-center text-slate-300 border-4 border-dashed border-neutral rounded-[2.5rem]">
                  <p className="text-sm font-black uppercase tracking-[0.2em] italic">No Subject Logs Found</p>
                </div>
              )}
            </div>

            <div className="md:col-span-4 space-y-6">
              <h3 className="font-serif font-black text-secondary text-lg uppercase tracking-tight italic border-b border-primary/20 pb-2 mb-6">Recent Logged Activities</h3>
              <div className="space-y-4">
                {(selectedSubject === 'All' ? activities : filteredActivities).slice(0, 8).map(a => (
                  <div key={a.id} className="bg-white p-6 shadow-xl shadow-secondary/5 border border-slate-50 flex justify-between items-center group hover:border-primary transition-all">
                    <div>
                      <h4 className="font-serif font-bold text-secondary text-base italic group-hover:text-primary transition-colors">{a.lessonName || 'Roll Call'}</h4>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] mt-1.5">{format(new Date(a.date), 'MMMM do, yyyy')}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {a.attendance === 'present' && (
                        <span className="text-2xl font-serif font-black text-primary italic tracking-tighter">{a.score}</span>
                      )}
                      <div className={cn(
                        "px-3 py-1 text-[8px] font-black uppercase tracking-widest border italic",
                        a.attendance === 'present' ? "bg-accent/5 border-accent/10 text-accent" : "bg-red-50 border-red-100 text-red-500"
                      )}>
                        {a.attendance}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Simple icon for internal use if missing from imports
const TrendingUp = ({ size, className }: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} height={size} 
    viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

export default Reports;
