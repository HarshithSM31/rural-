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
    <div className="bg-white p-5 shadow-2xl shadow-secondary/5 border border-slate-100 flex items-center justify-between hover:bg-neutral hover:scale-[1.01] transition-all group">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 bg-secondary text-white flex items-center justify-center font-serif font-black text-xl italic shadow-lg">
          {initials}
        </div>
        <div>
          <h3 className="text-xl font-serif font-black text-secondary tracking-tighter italic">{student.name}</h3>
          <p className="text-[9px] uppercase font-black text-primary tracking-[0.2em] mt-1.5 italic">
            {student.class} • SID: {student.studentId}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => onEdit(student)}
          className="p-3 text-slate-300 hover:text-primary hover:bg-primary/5 transition-all border border-transparent hover:border-primary/20"
        >
          <Edit2 size={20} />
        </button>
        <button 
          onClick={() => onDelete(student.id)}
          className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
