import { useState, useEffect } from 'react';
import type { Task } from '../types';
import { getTasks } from '../services';

export default function useTasks() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await getTasks();
        setData(result);
      } catch (error) {
        setData([]);
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return [data, loading] as const;
}
