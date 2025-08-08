import { z } from 'zod';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../libraries/api-client';
import { getTaskQueryOptions } from './getTask';

import type { MutationConfig } from '../libraries/react-query';
import type { Task } from '../types';
export const updateTaskInputSchema = z.object({
  title: z.string().min(1, 'Required'),
});

export type UpdateTaskInput = z.infer<typeof updateTaskInputSchema>;

export const updateTask = ({ taskId, task }: { taskId: string; task: UpdateTaskInput }): Promise<Task> => {
  return apiClient.patch(`/workspaces/tasks/${taskId}`, { ...task, id: undefined });
};

type UseUpdateTaskOptions = {
  mutationConfig?: MutationConfig<typeof updateTask>;
};

export const useUpdateTask = ({ mutationConfig }: UseUpdateTaskOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, ...args) => {
      queryClient.refetchQueries({
        queryKey: getTaskQueryOptions(data.id).queryKey,
      });
      onSuccess?.(data, ...args);
    },
    ...restConfig,
    mutationFn: updateTask,
  });
};
