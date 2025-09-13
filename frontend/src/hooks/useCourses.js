import { useState, useEffect } from 'react';
import { courseAPI, handleAPIError } from '../services/api';

export const useCourses = (filters = {}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await courseAPI.getCourses(filters);
        setCourses(data);
      } catch (err) {
        const errorInfo = handleAPIError(err);
        setError(errorInfo.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [JSON.stringify(filters)]);

  return { courses, loading, error, refetch: () => fetchCourses() };
};

export const useFeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await courseAPI.getFeaturedCourses();
        setCourses(data);
      } catch (err) {
        const errorInfo = handleAPIError(err);
        setError(errorInfo.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCourses();
  }, []);

  return { courses, loading, error };
};

export const useCourse = (courseId) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await courseAPI.getCourse(courseId);
        setCourse(data);
      } catch (err) {
        const errorInfo = handleAPIError(err);
        setError(errorInfo.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  return { course, loading, error };
};