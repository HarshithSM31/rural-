import React from 'react';
import ActivityForm from '../components/activities/ActivityForm';

const AddActivity = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold text-gray-900">Daily Log</h2>
        <p className="text-sm text-gray-500">Document student progress and attendance for today</p>
      </div>
      <ActivityForm />
    </div>
  );
};

export default AddActivity;
