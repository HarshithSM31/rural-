import React from 'react';
import ActivityForm from '../components/activities/ActivityForm';

const AddActivity = () => {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-4">
        <div className="h-0.5 w-12 bg-primary"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Activities & Attendance</span>
      </div>
      <h2 className="text-5xl font-serif font-black text-secondary tracking-tighter leading-tight italic">Daily Log <br/>Sync.</h2>
      <ActivityForm />
    </div>
  );
};

export default AddActivity;
