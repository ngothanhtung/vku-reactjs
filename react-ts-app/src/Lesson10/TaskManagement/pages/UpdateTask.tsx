import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { getTaskById, updateTask } from '../services';

import type { Task } from '../types';
// Form data interface (excluding auto-generated fields)
interface TaskFormData {
  title: string;
  start_date: string;
  due_date?: string;
  description?: string;
  status: 'to_do' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee_id?: number | string;
}

// Yup validation schema
const validationSchema: yup.ObjectSchema<TaskFormData> = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  start_date: yup
    .string()
    .required('Start date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date'),
  due_date: yup
    .string()
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date')
    .test('due_date-after-start_date', 'Due date must be after start date', function (value) {
      if (!value) return true;
      const { start_date } = this.parent;
      return new Date(value) >= new Date(start_date);
    }),
  description: yup.string().optional().max(500, 'Description must be less than 500 characters'),
  status: yup
    .mixed<'to_do' | 'in_progress' | 'done'>()
    .required('Status is required')
    .oneOf(['to_do', 'in_progress', 'done'], 'Please select a valid status'),
  priority: yup
    .mixed<'low' | 'medium' | 'high'>()
    .required('Priority is required')
    .oneOf(['low', 'medium', 'high'], 'Please select a valid priority'),
  assignee_id: yup.number().optional().min(1, 'Assignee ID must be a positive number'),
});

export default function UpdateTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = React.useState<Task | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
    reset,
  } = useForm<TaskFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    const fetchTask = async () => {
      if (id !== undefined) {
        try {
          const data = await getTaskById(id);
          if (!data) {
            throw new Error('Task not found');
          }
          // Convert Task to TaskFormData for reset
          reset({
            title: data.title || '',
            start_date: data.start_date ? new Date(data.start_date).toISOString().split('T')[0] : '',
            due_date: data.due_date ? new Date(data.due_date).toISOString().split('T')[0] : '',
            description: data.description || '',
            status: data.status,
            priority: data.priority,
            assignee_id: data.assignee_id ?? '',
          });
          setTask(data);
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      }
    };

    fetchTask();
  }, [id, reset]);

  const onSubmit = async (data: TaskFormData): Promise<void> => {
    try {
      // Convert form data to updated Task object
      if (!task || !task.id || !task.created_time) {
        throw new Error('Task data is incomplete.');
      }
      const updatedTask: Task = {
        ...task,
        id: task.id,
        title: data.title,
        start_date: new Date(data.start_date),
        due_date: data.due_date ? new Date(data.due_date) : undefined,
        description: data.description || undefined,
        status: data.status,
        priority: data.priority,
        assignee_id: data.assignee_id ? Number(data.assignee_id) : undefined,
        completed_date: data.status === 'done' ? new Date() : undefined,
      };

      // Call the updateTask service
      await updateTask(updatedTask);

      navigate('/tasks'); // Redirect to tasks list after update
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  return (
    <div className="max-w-screen mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Task</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            {...register('title')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.title
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : !errors.title && dirtyFields.title
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Enter task title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Start Date and Due Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Date */}
          <div>
            <label htmlFor="start_date" className="block text-sm font-bold text-gray-700 mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="start_date"
              {...register('start_date')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                errors.start_date
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : !errors.start_date && dirtyFields.start_date
                  ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
            {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date.message}</p>}
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="due_date" className="block text-sm font-bold text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              id="due_date"
              {...register('due_date')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                errors.due_date
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : !errors.due_date && dirtyFields.due_date
                  ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
            {errors.due_date && <p className="text-red-500 text-sm mt-1">{errors.due_date.message}</p>}
          </div>
        </div>

        {/* Status and Priority Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-bold text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              {...register('status')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                errors.status
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : !errors.status && dirtyFields.status
                  ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            >
              <option value="to_do">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
          </div>

          {/* Priority */}
          <div>
            <label htmlFor="priority" className="block text-sm font-bold text-gray-700 mb-2">
              Priority <span className="text-red-500">*</span>
            </label>
            <select
              id="priority"
              {...register('priority')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                errors.priority
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : !errors.priority && dirtyFields.priority
                  ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>}
          </div>
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            {...register('description')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors resize-none ${
              errors.description
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : !errors.description && dirtyFields.description
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Enter task description (optional)"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Assignee ID Field */}
        <div>
          <label htmlFor="assignee_id" className="block text-sm font-bold text-gray-700 mb-2">
            Assignee ID
          </label>
          <input
            type="text"
            id="assignee_id"
            {...register('assignee_id')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.assignee_id
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : !errors.assignee_id && dirtyFields.assignee_id
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Enter assignee ID (optional)"
          />
          {errors.assignee_id && <p className="text-red-500 text-sm mt-1">{errors.assignee_id.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              isSubmitting || !isValid
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isSubmitting ? 'Updating...' : 'Update Task'}
          </button>
        </div>

        {/* Form Status */}
        <div className="text-center">
          <p className={`text-sm ${isValid ? 'text-green-500' : 'text-red-500'}`}>
            {isValid ? 'Form is valid ✓' : 'Please fill in all required fields correctly'}
          </p>
        </div>
      </form>
    </div>
  );
}
