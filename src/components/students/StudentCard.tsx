import React from 'react';
import { User, Trash2, Edit2, GraduationCap } from 'lucide-react';
import { Student } from '../../types';
import { cn } from '../../lib/utils';

interface StudentCardProps {
  student: Student;
  onDelete: (id: string) => void;
  onEdit: (student: Student) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onDelete, onEdit }) => {
  const initials = student.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  
  return (
    <div id={`student-${student.id}`} className="bg-white p-5 rounded-[2rem] border border-blue-50 shadow-xl shadow-blue-900/5 flex items-center justify-between hover:bg-white hover:scale-[1.01] transition-all group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-secondary flex items-center justify-center font-black text-sm uppercase group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
          {initials}
        </div>
        <div>
          <h3 className="text-base font-black text-secondary tracking-tight">{student.name}</h3>
          <p className="text-[10px] uppercase font-black text-slate-400 tracking-widest mt-0.5">
            {student.class} • ID: {student.studentId}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onEdit(student)}
          className="p-2 text-slate-300 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
        >
          <Edit2 size={18} />
        </button>
        <button 
          onClick={() => onDelete(student.id)}
          className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
