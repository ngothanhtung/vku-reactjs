import { z } from 'zod';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../libraries/api-client';
import { getTasksQueryOptions } from './getTasks';

import type { Task } from '../types';
import type { MutationConfig } from '../libraries/react-query';
// Dùng để tạo input cho việc tạo task
export const createTaskInputSchema = z.object({
  title: z.string().min(1, 'Required'),
});

// Dùng để tạo input cho việc tạo task
export type CreateTaskInput = z.infer<typeof createTaskInputSchema>;

export const createTask = ({ data }: { data: CreateTaskInput }): Promise<Task> => {
  return apiClient.post(`/workspaces/tasks`, data);
};

type UseCreateTaskOptions = {
  mutationConfig?: MutationConfig<typeof createTask>;
};

export const useCreateTask = ({ mutationConfig }: UseCreateTaskOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      // Làm tươi lại list
      queryClient.invalidateQueries({
        queryKey: getTasksQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: createTask,
  });
};
