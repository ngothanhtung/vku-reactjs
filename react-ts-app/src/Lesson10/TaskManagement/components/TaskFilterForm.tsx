import { useForm } from 'react-hook-form';
import type { Task } from '../types';

// Filter form data interface
interface TaskFilterData {
  status: string;
  priority: string;
  dueDateFrom: string;
  dueDateTo: string;
  assigneeId: string;
}

// Filter criteria interface for parent component
export interface FilterCriteria {
  status?: Task['status'];
  priority?: Task['priority'];
  dueDateFrom?: Date;
  dueDateTo?: Date;
  assigneeId?: string;
}

type Props = {
  onFilterChange: (filters: FilterCriteria) => void;
  onClearFilters: () => void;
  initialFilters?: FilterCriteria;
};

export default function TaskFilterForm({ onFilterChange, onClearFilters, initialFilters }: Props) {
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    watch,
    handleSubmit,
  } = useForm<TaskFilterData>({
    mode: 'onChange',
    defaultValues: {
      status: initialFilters?.status || '',
      priority: initialFilters?.priority || '',
      dueDateFrom: initialFilters?.dueDateFrom?.toISOString().split('T')[0] || '',
      dueDateTo: initialFilters?.dueDateTo?.toISOString().split('T')[0] || '',
      assigneeId: initialFilters?.assigneeId || '',
    },
  });

  // Watch for form changes to determine if there are active filters
  const watchedValues = watch();

  // Handle form submission to apply filters
  const onSubmit = async (data: TaskFilterData) => {
    // Convert form data to filter criteria
    const filters: FilterCriteria = {};

    if (data.status && data.status !== '') {
      filters.status = data.status as Task['status'];
    }

    if (data.priority && data.priority !== '') {
      filters.priority = data.priority as Task['priority'];
    }

    if (data.dueDateFrom) {
      filters.dueDateFrom = new Date(data.dueDateFrom);
    }

    if (data.dueDateTo) {
      filters.dueDateTo = new Date(data.dueDateTo);
    }

    if (data.assigneeId && data.assigneeId.trim() !== '') {
      filters.assigneeId = data.assigneeId.trim();
    }

    // Small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 200));

    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    reset({
      status: '',
      priority: '',
      dueDateFrom: '',
      dueDateTo: '',
      assigneeId: '',
    });
    onClearFilters();
  };

  const hasActiveFilters =
    watchedValues.status !== '' ||
    watchedValues.priority !== '' ||
    watchedValues.dueDateFrom !== '' ||
    watchedValues.dueDateTo !== '' ||
    watchedValues.assigneeId !== '';

  return (
    <div className="bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Filter Tasks</h3>
          <p className="text-sm text-gray-600 mt-1">Set your filters and click Search to apply them</p>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-sm px-3 py-1 bg-gray-100 text-blue-600 hover:text-blue-800 hover:bg-gray-200 rounded-md transition-colors"
          >
            Clear All Filters
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Status and Priority Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Status Filter */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              {...register('status')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">All Statuses</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
          </div>

          {/* Priority Filter */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              id="priority"
              {...register('priority')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && <p className="text-red-500 text-sm mt-1">{errors.priority.message}</p>}
          </div>
        </div>

        {/* Due Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Due Date Range</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* From Date */}
            <div>
              <label htmlFor="dueDateFrom" className="block text-xs text-gray-500 mb-1">
                From (mm/dd/yyyy)
              </label>
              <input
                type="date"
                id="dueDateFrom"
                {...register('dueDateFrom')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              {errors.dueDateFrom && <p className="text-red-500 text-sm mt-1">{errors.dueDateFrom.message}</p>}
            </div>

            {/* To Date */}
            <div>
              <label htmlFor="dueDateTo" className="block text-xs text-gray-500 mb-1">
                To (mm/dd/yyyy)
              </label>
              <input
                type="date"
                id="dueDateTo"
                {...register('dueDateTo')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              {errors.dueDateTo && <p className="text-red-500 text-sm mt-1">{errors.dueDateTo.message}</p>}
            </div>
          </div>
        </div>

        {/* Assignee Filter */}
        <div>
          <label htmlFor="assigneeId" className="block text-sm font-medium text-gray-700 mb-2">
            Assignee
          </label>
          <input
            type="text"
            id="assigneeId"
            {...register('assigneeId')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Enter assignee ID or name"
          />
          {errors.assigneeId && <p className="text-red-500 text-sm mt-1">{errors.assigneeId.message}</p>}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            Clear Filters
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </span>
            ) : (
              'Search'
            )}
          </button>
        </div>

        {/* Filter Summary */}
        {hasActiveFilters && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800 font-medium mb-2">Current Filter Values:</p>
            <div className="flex flex-wrap gap-2">
              {watchedValues.status && watchedValues.status !== '' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Status:{' '}
                  {watchedValues.status === 'todo'
                    ? 'To Do'
                    : watchedValues.status === 'in-progress'
                    ? 'In Progress'
                    : 'Done'}
                </span>
              )}
              {watchedValues.priority && watchedValues.priority !== '' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Priority: {watchedValues.priority.charAt(0).toUpperCase() + watchedValues.priority.slice(1)}
                </span>
              )}
              {watchedValues.dueDateFrom && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  From: {new Date(watchedValues.dueDateFrom).toLocaleDateString()}
                </span>
              )}
              {watchedValues.dueDateTo && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  To: {new Date(watchedValues.dueDateTo).toLocaleDateString()}
                </span>
              )}
              {watchedValues.assigneeId && watchedValues.assigneeId.trim() !== '' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Assignee: {watchedValues.assigneeId}
                </span>
              )}
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
