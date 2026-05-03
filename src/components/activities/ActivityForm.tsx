import React, { useState, useEffect } from 'react';
import { Check, ClipboardList, Calendar, Award, Users } from 'lucide-react';
import { Student } from '../../types';
import { studentService } from '../../services/studentService';
import { activityService } from '../../services/activityService';
import { cn } from '../../lib/utils';

const ActivityForm = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [formData, setFormData] = useState({
    studentId: '',
    lessonName: '',
    date: new Date().toISOString().split('T')[0],
    score: 0,
    attendance: 'present' as 'present' | 'absent'
  });

  useEffect(() => {
    const loadStudents = async () => {
      const data = await studentService.getStudents();
      setStudents(data);
      if (data.length > 0) {
        setFormData(prev => ({ ...prev, studentId: data[0].id }));
      }
      setLoading(false);
    };
    loadStudents();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId) return;

    setSubmitting(true);
    setStatus(null);

    try {
      await activityService.addActivity(formData);
      setStatus({ type: 'success', message: 'Activity recorded successfully!' });
      // Reset some fields
      setFormData(prev => ({ ...prev, lessonName: '', score: 0 }));
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to save activity.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="flex justify-center p-12"><div className="animate-spin h-8 w-8 border-4 border-emerald-500 border-t-transparent rounded-full" /></div>;

  if (students.length === 0) return (
    <div className="bg-white rounded-3xl p-8 text-center border border-dashed border-gray-300">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
        <Users size={32} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No Students Found</h3>
      <p className="text-gray-500">You need to register students before adding activities.</p>
    </div>
  );

  return (
    <div className="bg-white p-1 shadow-2xl shadow-secondary/5 border border-slate-100 overflow-hidden">
      <div className="p-10 border-b border-slate-100 flex items-center gap-6">
        <div className="w-16 h-16 bg-primary text-white flex items-center justify-center font-serif text-3xl font-black italic shadow-xl">RL</div>
        <div>
          <h2 className="text-3xl font-serif font-black text-secondary tracking-tighter italic">Institutional Log</h2>
          <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mt-1 italic">Registry Update Session</p>
        </div>
      </div>
      
      <div className="p-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          {status && (
            <div className={cn(
              "px-8 py-4 text-[10px] font-black uppercase tracking-widest border italic animate-in fade-in slide-in-from-top-4",
              status.type === 'success' ? "bg-accent/5 border-accent/10 text-accent" : "bg-red-50 border-red-100 text-red-500"
            )}>
              {status.message}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 italic">Focus Student</label>
              <select
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="w-full px-8 py-5 bg-neutral border border-slate-100 focus:border-primary font-serif font-bold text-secondary transition-all outline-none italic text-lg"
              >
                <option value="">Select from Registry...</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} • {s.class}</option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 italic">Session Date</label>
              <input
                required
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-8 py-5 bg-neutral border border-slate-100 focus:border-primary font-serif font-bold text-secondary transition-all outline-none italic text-lg"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 italic">Attendance Status</label>
            <div className="grid grid-cols-2 gap-0 overflow-hidden border border-slate-100">
              {(['present', 'absent'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData({ ...formData, attendance: type })}
                  className={cn(
                    "py-5 text-[10px] font-black uppercase tracking-widest transition-all",
                    formData.attendance === type 
                      ? (type === 'present' ? "bg-primary text-white" : "bg-red-600 text-white") 
                      : "bg-white text-slate-400 hover:bg-neutral"
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {formData.attendance === 'present' && (
            <div className="space-y-12 animate-in slide-in-from-top-4 duration-500">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 italic">Subject Division / Lesson</label>
                <input
                  required
                  type="text"
                  value={formData.lessonName}
                  onChange={(e) => setFormData({ ...formData, lessonName: e.target.value })}
                  className="w-full px-8 py-5 bg-neutral border border-slate-100 focus:border-primary font-serif font-bold text-secondary transition-all outline-none italic text-lg"
                  placeholder="e.g. Mathematics - Algebra"
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 italic">Academic Performance Score</label>
                  <span className="text-4xl font-serif font-black text-primary italic tracking-tighter">{formData.score}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.score}
                  onChange={(e) => setFormData({ ...formData, score: Number(e.target.value) })}
                  className="w-full accent-primary h-2 bg-neutral appearance-none cursor-pointer border border-slate-100"
                />
                <div className="flex justify-between text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] italic">
                  <span>Below Average</span>
                  <span className="text-primary/40">Proficient</span>
                  <span>Distinction</span>
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-6 bg-secondary text-white font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-secondary/20 hover:brightness-110 transition-all disabled:opacity-50"
            >
              {submitting ? 'Authenticating Sync...' : 'Finalize Log Entry'}
            </button>
            <div className="flex items-center justify-center gap-4 text-[9px] font-black text-slate-300 uppercase tracking-widest italic">
               <div className="w-8 h-px bg-slate-100"></div>
               Secure Institutional Link
               <div className="w-8 h-px bg-slate-100"></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;
