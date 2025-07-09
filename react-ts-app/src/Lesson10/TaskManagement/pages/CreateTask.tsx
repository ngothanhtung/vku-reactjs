import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import type { Task } from '../types';

type Props = {
  onTaskCreated?: (task: Task) => void;
};

// Form data interface (excluding auto-generated fields)
interface TaskFormData {
  title: string;
  startDate: string;
  dueDate?: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  tags?: string;
  assigneeId?: string;
}

// Yup validation schema
const validationSchema: yup.ObjectSchema<TaskFormData> = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  startDate: yup
    .string()
    .required('Start date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date'),
  dueDate: yup
    .string()
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date')
    .test('dueDate-after-startDate', 'Due date must be after start date', function (value) {
      if (!value) return true;
      const { startDate } = this.parent;
      return new Date(value) >= new Date(startDate);
    }),
  description: yup.string().optional().max(500, 'Description must be less than 500 characters'),
  status: yup
    .mixed<'todo' | 'in-progress' | 'done'>()
    .required('Status is required')
    .oneOf(['todo', 'in-progress', 'done'], 'Please select a valid status'),
  priority: yup
    .mixed<'low' | 'medium' | 'high'>()
    .required('Priority is required')
    .oneOf(['low', 'medium', 'high'], 'Please select a valid priority'),
  tags: yup.string().optional().max(200, 'Tags must be less than 200 characters'),
  assigneeId: yup.string().optional().min(1, 'Assignee ID cannot be empty if provided'),
});

export default function CreateTask({ onTaskCreated }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
    reset,
  } = useForm<TaskFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      startDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      tags: '',
      assigneeId: '',
    },
  });

  const onSubmit = async (data: TaskFormData): Promise<void> => {
    try {
      // Convert form data to Task object
      const taskData: Task = {
        id: crypto.randomUUID(), // Generate unique ID
        title: data.title,
        startDate: new Date(data.startDate),
        dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
        description: data.description || undefined,
        status: data.status,
        priority: data.priority,
        tags: data.tags
          ? data.tags
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean)
          : undefined,
        assigneeId: data.assigneeId || undefined,
        completed: data.status === 'done',
        completedAt: data.status === 'done' ? new Date() : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      console.log('Task created:', taskData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call parent callback if provided
      if (onTaskCreated) {
        onTaskCreated(taskData);
      }

      // Reset form
      reset();
      alert('Task created successfully!');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
    }
  };

  return (
    <div className="max-w-screen mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Task</h2>

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
            <label htmlFor="startDate" className="block text-sm font-bold text-gray-700 mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="startDate"
              {...register('startDate')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                errors.startDate
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : !errors.startDate && dirtyFields.startDate
                  ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
            {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate.message}</p>}
          </div>

          {/* Due Date */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-bold text-gray-700 mb-2">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              {...register('dueDate')}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                errors.dueDate
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                  : !errors.dueDate && dirtyFields.dueDate
                  ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
            {errors.dueDate && <p className="text-red-500 text-sm mt-1">{errors.dueDate.message}</p>}
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
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
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

        {/* Tags Field */}
        <div>
          <label htmlFor="tags" className="block text-sm font-bold text-gray-700 mb-2">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            {...register('tags')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.tags
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : !errors.tags && dirtyFields.tags
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Enter tags separated by commas (e.g., urgent, frontend, bug)"
          />
          {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
        </div>

        {/* Assignee ID Field */}
        <div>
          <label htmlFor="assigneeId" className="block text-sm font-bold text-gray-700 mb-2">
            Assignee ID
          </label>
          <input
            type="text"
            id="assigneeId"
            {...register('assigneeId')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.assigneeId
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : !errors.assigneeId && dirtyFields.assigneeId
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            placeholder="Enter assignee ID (optional)"
          />
          {errors.assigneeId && <p className="text-red-500 text-sm mt-1">{errors.assigneeId.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => reset()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`px-6 py-2 rounded-md font-medium transition-colors ${
              isSubmitting || !isValid
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isSubmitting ? 'Creating...' : 'Create Task'}
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
