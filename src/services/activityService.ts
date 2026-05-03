import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Activity } from '../types';
import { handleFirestoreError, OperationType } from './errorHandler';

const COLLECTION_NAME = 'activities';

export const activityService = {
  async addActivity(activityData: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...activityData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return { id: docRef.id, ...activityData };
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, COLLECTION_NAME);
    }
  },

  async getActivitiesForStudent(studentId: string): Promise<Activity[]> {
    try {
      const q = query(
        collection(db, COLLECTION_NAME), 
        where('studentId', '==', studentId)
      );
      const querySnapshot = await getDocs(q);
      const activities = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Activity));
      
      // Sort in memory to avoid needing a composite index
      return activities.sort((a, b) => b.date.localeCompare(a.date));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
      return [];
    }
  },

  async getAllActivities(): Promise<Activity[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Activity));
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, COLLECTION_NAME);
      return [];
    }
  }
};

export const calculateProgress = (activities: Activity[]) => {
  if (activities.length === 0) return { averageScore: 0, attendancePercentage: 0, lessonsCompleted: 0, progressScore: 0 };

  const totalScore = activities.reduce((sum, a) => sum + a.score, 0);
  const averageScore = totalScore / activities.length;
  
  const presentCount = activities.filter(a => a.attendance === 'present').length;
  const attendancePercentage = (presentCount / activities.length) * 100;
  
  const lessonsCompleted = activities.length;
  const completionRate = Math.min(100, (lessonsCompleted / 10) * 100); // Assuming 10 lessons is a target

  const progressScore = (averageScore + attendancePercentage + completionRate) / 3;

  return {
    averageScore: Math.round(averageScore),
    attendancePercentage: Math.round(attendancePercentage),
    lessonsCompleted,
    progressScore: Math.round(progressScore)
  };
};
