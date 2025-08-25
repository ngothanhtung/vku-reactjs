import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createTaskInputSchema, type CreateTaskInput } from '../services/createTask';

export default function CreateTask() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskInputSchema),
    mode: 'all', // Validate on change for better UX
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (data: CreateTaskInput): Promise<void> => {
    try {
      console.log('Form data:', data);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <div className="p-4">
      <strong>Create Task</strong>
      <hr />
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div>
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register('title')}
            className={`w-full mt-2 p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
              errors.title
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : !errors.title && dirtyFields.title
                ? 'border-green-500 focus:border-green-500 focus:ring-green-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
          />

          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg mt-4" disabled={isSubmitting || !isValid}>
          {isSubmitting ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
}
