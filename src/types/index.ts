export interface Student {
  id: string;
  name: string;
  class: string;
  age: number;
  studentId: string;
  createdAt: any;
  updatedAt: any;
}

export interface Activity {
  id: string;
  studentId: string;
  lessonName: string;
  date: string; // YYYY-MM-DD
  score: number;
  attendance: 'present' | 'absent';
  createdAt: any;
  updatedAt: any;
}

export interface StudentStats {
  averageScore: number;
  attendancePercentage: number;
  lessonsCompleted: number;
  progressScore: number;
}
