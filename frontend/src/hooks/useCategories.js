import { useState, useEffect } from 'react';
import { categoryAPI, handleAPIError } from '../services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await categoryAPI.getCategories();
        setCategories(data);
      } catch (err) {
        const errorInfo = handleAPIError(err);
        setError(errorInfo.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};