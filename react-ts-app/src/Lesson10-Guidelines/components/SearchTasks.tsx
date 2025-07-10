import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IFormInput {
  status: string;
  priority: string;
}

type Props = {
  onSearch?: (filters: IFormInput) => void;
};

export default function SearchTasks({ onSearch }: Props) {
  // react form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      status: '',
      priority: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: IFormInput) => {
    if (onSearch && typeof onSearch === 'function') {
      onSearch(data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="status">Status:</label>
          <select {...register('status')} id="status" name="status">
            <option value="">All Statuses</option>
            <option value="to_do">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
          {errors.status && <p className="error">{errors.status.message}</p>}
        </div>

        <div>
          <label htmlFor="priority">Priority:</label>
          <select {...register('priority')} id="priority" name="priority">
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && <p className="error">{errors.priority.message}</p>}
        </div>
        <div>
          <button type="submit">Search</button>
        </div>
      </form>
    </div>
  );
}
