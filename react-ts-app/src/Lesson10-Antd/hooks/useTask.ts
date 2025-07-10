import { useState, useEffect } from 'react';
import type { Task } from '../types';
import { getTaskById } from '../services';

export default function useTask(taskId: number = 0) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await getTaskById(taskId);
        setData(result);
      } catch (error) {
        setData(null);
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [taskId]);

  return [data, loading] as const;
}
