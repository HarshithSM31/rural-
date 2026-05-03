import React, { useState, useEffect } from 'react';
import { Users, CalendarCheck, TrendingUp, Award, Clock } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import Charts from '../components/dashboard/Charts';
import { studentService } from '../services/studentService';
import { activityService, calculateProgress } from '../services/activityService';
import { Student, Activity } from '../types';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [sData, aData] = await Promise.all([
        studentService.getStudents(),
        activityService.getAllActivities()
      ]);
      setStudents(sData);
      setActivities(aData);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" /></div>;

  const today = new Date().toISOString().split('T')[0];
  const todayAttendance = activities.filter(a => a.date === today && a.attendance === 'present').length;
  const progressData = activities.length > 0 ? calculateProgress(activities) : { progressScore: 0, averageScore: 0 };
  const avgProgress = progressData.progressScore;

  // Class performance data
  const classes = [...new Set(students.map(s => s.class))];
  const classPerformance = (classes as string[]).map(cls => {
    const classStudents = students.filter(s => s.class === cls).map(s => s.id);
    const classActivities = activities.filter(a => classStudents.includes(a.studentId));
    const score = calculateProgress(classActivities).progressScore;
    return { name: cls.split(' ').pop() || cls, score, color: score > 75 ? '#10b981' : score > 50 ? '#f59e0b' : '#ef4444' };
  });

  // Weekly trend
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return format(d, 'yyyy-MM-dd');
  }).reverse();

  const weeklyTrend = last7Days.map(date => {
    const dayActivities = activities.filter(a => a.date === date);
    const score = dayActivities.length > 0 ? calculateProgress(dayActivities).averageScore : 0;
    return { name: format(new Date(date), 'EEE'), score };
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Colorful Sidebar Blocks */}
        <div className="lg:col-span-4 flex flex-col">
          <Link to="/students" className="bg-primary text-white p-8 flex flex-col gap-4 group hover:brightness-110 transition-all">
            <div className="flex items-center gap-4">
               <Users size={32} />
               <h3 className="font-serif text-2xl font-black uppercase tracking-tight">Student <br/>Enrollment</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed border-t border-white/20 pt-4">This registry maintains broad institutional records and programs with students based in 12 districts.</p>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] mt-4 group-hover:translate-x-2 transition-transform italic">Explore Registry →</span>
          </Link>
          
          <Link to="/reports" className="bg-accent text-white p-8 flex flex-col gap-4 group hover:brightness-110 transition-all">
            <div className="flex items-center gap-4">
               <TrendingUp size={32} />
               <h3 className="font-serif text-2xl font-black uppercase tracking-tight">Learning <br/>Analytics</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed border-t border-white/20 pt-4">This is a convenient way to gain knowledge that will help you track and take a higher view of performance.</p>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] mt-4 group-hover:translate-x-2 transition-transform italic">Visual Reports →</span>
          </Link>
          
          <Link to="/add-activity" className="bg-secondary text-white p-8 flex flex-col gap-4 group grow hover:brightness-110 transition-all">
            <div className="flex items-center gap-4">
               <CalendarCheck size={32} />
               <h3 className="font-serif text-2xl font-black uppercase tracking-tight">Activity <br/>Logs</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed border-t border-white/20 pt-4">Operates a broad network of classroom logs representing the interests of students, educators and parents.</p>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] mt-4 group-hover:translate-x-2 transition-transform italic">Live Tracking Active →</span>
          </Link>
        </div>

        {/* Hero Welcome Area */}
        <div className="lg:col-span-8 flex flex-col justify-center py-12 lg:py-0 px-4">
          <div className="space-y-6 max-w-xl">
             <div className="flex items-center gap-4 mb-8">
                <div className="h-0.5 w-12 bg-primary"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Academic Excellence</span>
             </div>
             <h2 className="text-7xl font-serif font-black text-secondary leading-[0.9] tracking-tighter">Only Patience <br/>& Persistence <br/><span className="text-primary italic">Give Results.</span></h2>
             <p className="text-slate-500 font-medium text-lg leading-relaxed pt-8">The university maintains broad institutional records and programs with students based all over the world. Our online system works 24 hours per day, efficiently and without interruption.</p>
             
             <div className="flex gap-4 pt-8">
                <Link to="/add-activity" className="bg-secondary text-white px-8 py-4 font-black uppercase text-[11px] tracking-widest shadow-xl shadow-secondary/20 hover:scale-105 active:scale-95 transition-all">
                  Log Activity
                </Link>
                <div className="border border-slate-200 px-8 py-4 font-black uppercase text-[11px] tracking-widest text-slate-400">
                  Calendar 2026
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <StatCard label="Enrollment" value={students.length} icon={Users} color="orange" trend="+12 New" />
        <StatCard label="Attendance" value={todayAttendance} icon={CalendarCheck} color="magenta" trend="94.2%" />
        <StatCard label="Hub Score" value={`${avgProgress}%`} icon={Award} color="navy" trend="Avg" />
        <StatCard label="Worksheets" value={activities.length} icon={Clock} color="slate" trend="Total" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12">
        <div className="md:col-span-12 lg:col-span-7 bg-white p-1 shadow-2xl shadow-secondary/5 border border-slate-100 overflow-hidden flex flex-col">
          <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-serif font-black text-secondary text-xl uppercase tracking-tighter italic">Class Progress Map</h3>
            <span className="text-[10px] font-black text-primary uppercase tracking-widest border border-primary/20 px-4 py-1.5 rounded-full">Live Analytics</span>
          </div>
          <div className="p-8">
            <Charts data={classPerformance} type="bar" dataKey="score" color="#f89406" />
          </div>
        </div>

        <div className="md:col-span-12 lg:col-span-5 bg-secondary text-white p-10 flex flex-col justify-between relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
           <div>
              <h3 className="font-serif font-black text-3xl mb-8 leading-tight">View our <br/>Registry <br/>Calendar <br/><span className="text-primary italic">2026</span></h3>
              <p className="text-white/60 text-sm leading-relaxed mb-10">Thousands of students from around the world give preference to our university, so more than 50-year history has developed its own academic traditions.</p>
           </div>
           <Link to="/students" className="self-end border border-white/20 px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-secondary transition-all">
             Click Here →
           </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
