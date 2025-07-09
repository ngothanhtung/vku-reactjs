import type { Task } from '../types';
import type { Filter } from '../components/TaskFilterForm';

export const filterTasks = (tasks: Task[], filters: Filter): Task[] => {
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
