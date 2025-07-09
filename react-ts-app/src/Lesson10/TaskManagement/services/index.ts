import type { Task } from '../types';
import { apiBaseUrl, defaultHeaders } from '../constants';

/**
 * Creates a new task
 * @param task - The task object to create
 * @returns Promise that resolves to the created task
 * @throws Error if the request fails
 */
export const createTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${apiBaseUrl}`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return await response.json();
};

/**
 * Retrieves all tasks
 * @returns Promise that resolves to an array of tasks
 * @throws Error if the request fails
 */
export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${apiBaseUrl}`, {
    method: 'GET',
    headers: defaultHeaders,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return await response.json();
};

/**
 * Updates an existing task
 * @param task - The task object with updated data
 * @returns Promise that resolves to the updated task
 * @throws Error if the request fails
 */
export const updateTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${apiBaseUrl}/${task.id}`, {
    method: 'PATCH',
    headers: defaultHeaders,
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return await response.json();
};

/**
 * Deletes a task by its ID
 * @param taskId - The ID of the task to delete
 * @returns Promise that resolves when the task is deleted
 * @throws Error if the request fails
 */
export const deleteTask = async (taskId: string): Promise<void> => {
  const response = await fetch(`${apiBaseUrl}/${taskId}`, {
    method: 'DELETE',
    headers: defaultHeaders,
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};

/**
 * Retrieves a specific task by its ID
 * @param taskId - The ID of the task to retrieve
 * @returns Promise that resolves to the task object
 * @throws Error if the request fails
 */
export const getTaskById = async (taskId: string): Promise<Task> => {
  const response = await fetch(`${apiBaseUrl}/${taskId}`, {
    method: 'GET',
    headers: defaultHeaders,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch task');
  }
  return await response.json();
};

/**
 * Retrieves tasks filtered by status
 * @param status - The status to filter tasks by ('todo', 'in-progress', or 'done')
 * @returns Promise that resolves to an array of tasks with the specified status
 * @throws Error if the request fails
 */
export const getTasksByStatus = async (status: 'todo' | 'in-progress' | 'done'): Promise<Task[]> => {
  const response = await fetch(`${apiBaseUrl}?status=${status}`, {
    method: 'GET',
    headers: defaultHeaders,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tasks by status');
  }
  return await response.json();
};

/**
 * Retrieves tasks assigned to a specific user
 * @param assigneeId - The ID of the user to get tasks for
 * @returns Promise that resolves to an array of tasks assigned to the user
 * @throws Error if the request fails
 */
export const getTasksByAssignee = async (assigneeId: string): Promise<Task[]> => {
  const response = await fetch(`${apiBaseUrl}?assigneeId=${assigneeId}`, {
    method: 'GET',
    headers: defaultHeaders,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tasks by assignee');
  }
  return await response.json();
};

/**
 * Retrieves tasks with a specific due date
 * @param dueDate - The due date to filter tasks by (ISO string format)
 * @returns Promise that resolves to an array of tasks with the specified due date
 * @throws Error if the request fails
 */
export const getTasksByDueDate = async (dueDate: string): Promise<Task[]> => {
  const response = await fetch(`${apiBaseUrl}?dueDate=${dueDate}`, {
    method: 'GET',
    headers: defaultHeaders,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tasks by due date');
  }
  return await response.json();
};

/**
 * Retrieves tasks filtered by priority level
 * @param priority - The priority level to filter tasks by ('low', 'medium', or 'high')
 * @returns Promise that resolves to an array of tasks with the specified priority
 * @throws Error if the request fails
 */
export const getTasksByPriority = async (priority: 'low' | 'medium' | 'high'): Promise<Task[]> => {
  const response = await fetch(`${apiBaseUrl}?priority=${priority}`, {
    method: 'GET',
    headers: defaultHeaders,
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tasks by priority');
  }
  return await response.json();
};
