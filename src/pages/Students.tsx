import React, { useState, useEffect } from 'react';
import { Plus, Search, UserPlus } from 'lucide-react';
import StudentCard from '../components/students/StudentCard';
import StudentForm from '../components/students/StudentForm';
import { studentService } from '../services/studentService';
import { Student } from '../types';

const Students = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studentService.getStudents();
      setStudents(data);
    } catch (err) {
      setError('Failed to load students.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddOrEdit = async (data: any) => {
    try {
      setError(null);
      if (editingStudent) {
        await studentService.updateStudent(editingStudent.id, data);
      } else {
        await studentService.addStudent(data);
      }
      setIsFormOpen(false);
      setEditingStudent(undefined);
      loadData();
    } catch (err: any) {
      setError('Error saving student info. Check permissions or ID format.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);
      await studentService.deleteStudent(id);
      loadData();
    } catch (err: any) {
      console.error("Delete error:", err);
      setError('Error deleting student. Details logged to console.');
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-black text-secondary tracking-tight">Registry Hub</h2>
          <p className="text-[12px] text-primary font-bold uppercase tracking-widest">{students.length} Active Profiles</p>
        </div>
        <button 
          onClick={() => { setEditingStudent(undefined); setIsFormOpen(true); }}
          className="w-14 h-14 bg-primary text-white rounded-2xl shadow-xl shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-110 active:scale-90 flex items-center justify-center border-4 border-white"
        >
          <UserPlus size={24} />
        </button>
      </div>

      <div className="relative group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary group-focus-within:scale-110 transition-transform">
          <Search size={22} />
        </div>
        <input 
          type="text"
          placeholder="Search identity or class..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-16 pr-6 py-5 rounded-[2rem] bg-white border border-blue-100 shadow-xl shadow-blue-900/5 focus:ring-4 focus:ring-primary/10 transition-all outline-none font-bold text-secondary"
        />
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 text-rose-500 rounded-2xl text-xs font-bold uppercase tracking-widest text-center shadow-sm animate-in fade-in slide-in-from-top-2">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center p-12"><div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" /></div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <StudentCard 
                key={student.id} 
                student={student} 
                onDelete={handleDelete}
                onEdit={(s) => { setEditingStudent(s); setIsFormOpen(true); }}
              />
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-blue-100 shadow-inner">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No Profiles Found</p>
            </div>
          )}
        </div>
      )}

      {isFormOpen && (
        <StudentForm 
          initialData={editingStudent}
          onSubmit={handleAddOrEdit} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}
    </div>
  );
};

export default Students;
