import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Student } from '../../types';

interface StudentFormProps {
  initialData?: Student;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const StudentForm: React.FC<StudentFormProps> = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    class: initialData?.class || '',
    age: initialData?.age || '',
    studentId: initialData?.studentId || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      age: Number(formData.age)
    });
  };

  return (
    <div className="fixed inset-0 bg-secondary/80 backdrop-blur-xl flex items-center justify-center p-6 z-[100]">
      <div className="bg-white w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden flex flex-col">
        <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-neutral">
          <div>
            <h2 className="text-4xl font-serif font-black text-secondary tracking-tighter italic">{initialData ? 'Update Profile' : 'Registry Entry'}</h2>
            <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mt-1.5 italic">Institutional Enrollment Session</p>
          </div>
          <button onClick={onClose} className="p-4 hover:bg-white text-slate-300 hover:text-primary transition-all border border-transparent hover:border-slate-100 shadow-sm">
            <X size={32} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-10 space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 italic">Legal Identity Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-8 py-5 bg-neutral border border-slate-100 focus:border-primary font-serif font-bold text-xl italic text-secondary transition-all outline-none"
              placeholder="e.g. Rajesh Kumar"
            />
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 italic">Academic Level</label>
              <input
                required
                type="text"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className="w-full px-8 py-5 bg-neutral border border-slate-100 focus:border-primary font-serif font-bold text-xl italic text-secondary transition-all outline-none"
                placeholder="Grade 5"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 italic">Age</label>
              <input
                required
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-8 py-5 bg-neutral border border-slate-100 focus:border-primary font-serif font-bold text-xl italic text-secondary transition-all outline-none"
                placeholder="10"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1 italic">Institutional ID Number</label>
            <input
              required
              type="text"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              className="w-full px-8 py-5 bg-neutral border border-slate-100 focus:border-primary font-serif font-bold text-xl italic text-secondary transition-all outline-none"
              placeholder="S1001"
            />
          </div>
          <button
            type="submit"
            className="w-full py-6 bg-secondary text-white font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-secondary/20 hover:brightness-110 active:scale-95 transition-all mt-6"
          >
            {initialData ? 'Synchronize Updates' : 'Complete Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
