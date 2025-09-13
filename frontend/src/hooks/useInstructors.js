import { useState, useEffect } from 'react';
import { instructorAPI, handleAPIError } from '../services/api';

export const useInstructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await instructorAPI.getInstructors();
        setInstructors(data);
      } catch (err) {
        const errorInfo = handleAPIError(err);
        setError(errorInfo.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstructors();
  }, []);

  return { instructors, loading, error };
};