import { useState, useEffect } from 'react';
import { fetchUserProgress, toggleStepCompletion, enrollInPath } from '../services/progressService';
import { useAuth } from './useAuth';

export const useProgress = () => {
  const { user } = useAuth();
  const [progressData, setProgressData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProgress = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const data = await fetchUserProgress();
      setProgressData(data);
    } catch (err) {
      console.error('Error fetching progress:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProgress();
  }, [user]);

  const handleToggleStep = async (stepId) => {
    try {
      const result = await toggleStepCompletion(stepId);
      await loadProgress();
      return result;
    } catch (err) {
      console.error('Failed to toggle step:', err);
      throw err;
    }
  };

  const handleEnroll = async (pathId) => {
    try {
      const result = await enrollInPath(pathId);
      await loadProgress();
      return result;
    } catch (err) {
      console.error('Failed to enroll in path:', err);
      throw err;
    }
  };

  return { progressData, loading, loadProgress, handleToggleStep, handleEnroll };
};
