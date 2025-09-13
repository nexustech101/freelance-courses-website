import { useState, useEffect } from 'react';
import { statsAPI, handleAPIError } from '../services/api';

export const useStats = () => {
  const [stats, setStats] = useState({
    total_students: 0,
    total_courses: 0,
    satisfaction_rate: 0,
    avg_rating: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await statsAPI.getStats();
        setStats(data);
      } catch (err) {
        const errorInfo = handleAPIError(err);
        setError(errorInfo.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};