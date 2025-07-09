/**
 * Task filtering utilities
 *
 * This module provides utility functions for filtering tasks based on various criteria.
 * It handles date comparisons, string matching, and filter validation.
 */

import type { Task } from '../types';
import type { FilterCriteria } from '../components/TaskFilterForm';

/**
 * Resets time to start of day for date comparison
 */
export const resetTimeToStartOfDay = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

/**
 * Resets time to end of day for date comparison
 */
export const resetTimeToEndOfDay = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};

/**
 * Checks if a task matches the given filter criteria
 */
export const taskMatchesFilters = (task: Task, filters: FilterCriteria): boolean => {
  // Status filter
  if (filters.status && task.status !== filters.status) {
    return false;
  }

  // Priority filter
  if (filters.priority && task.priority !== filters.priority) {
    return false;
  }

  // Due date from filter
  if (filters.dueDateFrom && task.dueDate) {
    const taskDueDate = resetTimeToStartOfDay(new Date(task.dueDate));
    const fromDate = resetTimeToStartOfDay(new Date(filters.dueDateFrom));
    if (taskDueDate < fromDate) {
      return false;
    }
  }

  // Due date to filter
  if (filters.dueDateTo && task.dueDate) {
    const taskDueDate = resetTimeToStartOfDay(new Date(task.dueDate));
    const toDate = resetTimeToStartOfDay(new Date(filters.dueDateTo));
    if (taskDueDate > toDate) {
      return false;
    }
  }

  // Assignee filter (partial match, case-insensitive)
  if (filters.assigneeId && filters.assigneeId.trim() !== '') {
    const assigneeSearch = filters.assigneeId.toLowerCase().trim();
    if (!task.assigneeId || !task.assigneeId.toLowerCase().includes(assigneeSearch)) {
      return false;
    }
  }

  return true;
};

/**
 * Filters an array of tasks based on the given filter criteria
 */
export const filterTasks = (tasks: Task[], filters: FilterCriteria): Task[] => {
  return tasks.filter((task) => taskMatchesFilters(task, filters));
};

/**
 * Counts the number of tasks that match the given filter criteria
 */
export const countFilteredTasks = (tasks: Task[], filters: FilterCriteria): number => {
  return filterTasks(tasks, filters).length;
};

/**
 * Checks if any filters are active
 */
export const hasActiveFilters = (filters: FilterCriteria): boolean => {
  return Object.keys(filters).some((key) => {
    const value = filters[key as keyof FilterCriteria];
    return value !== undefined && value !== null && value !== '';
  });
};
