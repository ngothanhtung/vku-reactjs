import type { Filter, Task } from '../types';

export const searchTasks = (tasks: Task[], filters: Filter): Task[] => {
  return tasks.filter((task) => {
    // Apply status filter
    if (filters.status && task.status !== filters.status) {
      return false;
    }

    // Apply priority filter
    if (filters.priority && task.priority !== filters.priority) {
      return false;
    }

    return true;
  });
};
