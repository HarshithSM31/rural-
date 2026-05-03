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
    <div className="fixed inset-0 bg-secondary/40 backdrop-blur-md flex items-center justify-center p-6 z-[100]">
      <div className="bg-white rounded-[3rem] w-full max-w-md p-10 shadow-full shadow-blue-900/20 animate-in fade-in zoom-in-95 duration-300 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black text-secondary tracking-tight">{initialData ? 'Update Profile' : 'New Identity'}</h2>
            <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">Registry Enrollment</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-50 text-slate-300 hover:text-primary rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Identity Name</label>
            <input
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-6 py-4 rounded-2xl bg-blue-50 border-none focus:ring-4 focus:ring-primary/10 font-bold text-secondary transition-all outline-none"
              placeholder="e.g. Rajesh Kumar"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Level/Class</label>
              <input
                required
                type="text"
                value={formData.class}
                onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-blue-50 border-none focus:ring-4 focus:ring-primary/10 font-bold text-secondary transition-all outline-none"
                placeholder="Grade 5"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Age</label>
              <input
                required
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full px-6 py-4 rounded-2xl bg-blue-50 border-none focus:ring-4 focus:ring-primary/10 font-bold text-secondary transition-all outline-none"
                placeholder="10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">System ID / Roll</label>
            <input
              required
              type="text"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              className="w-full px-6 py-4 rounded-2xl bg-blue-50 border-none focus:ring-4 focus:ring-primary/10 font-bold text-secondary transition-all outline-none"
              placeholder="S1001"
            />
          </div>
          <button
            type="submit"
            className="w-full py-5 bg-primary text-white rounded-full font-black text-lg shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-95 mt-4"
          >
            {initialData ? 'Sync Updates' : 'Confirm Registration'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;
