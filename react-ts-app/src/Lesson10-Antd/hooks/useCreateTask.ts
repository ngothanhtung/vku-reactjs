import { useState } from 'react';
import { message } from 'antd';
import type { Task } from '../types';
import { createTask } from '../services';

export default function useCreateTask() {
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async (taskData: Omit<Task, 'id'>): Promise<boolean> => {
    setLoading(true);
    try {
      await createTask(taskData);
      message.success('Task created successfully!');
      return true;
    } catch (error) {
      console.error('Failed to create task:', error);
      message.error('Failed to create task. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createTask: handleCreateTask,
    loading,
  };
}
