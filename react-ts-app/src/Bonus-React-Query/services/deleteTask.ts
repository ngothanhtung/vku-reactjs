import { useMutation, useQueryClient } from '@tanstack/react-query';

import { apiClient } from '../libraries/api-client';
import { getTasksQueryOptions } from './getTasks';

import type { MutationConfig } from '../libraries/react-query';
import type { Task } from '../types';

export const deleteTask = ({ taskId }: { taskId: string }): Promise<Task> => {
  return apiClient.delete(`/workspaces/tasks/${taskId}`);
};

type UseDeleteTaskOptions = {
  mutationConfig?: MutationConfig<typeof deleteTask>;
};

export const useDeleteTask = ({ mutationConfig }: UseDeleteTaskOptions = {}) => {
  const queryClient = useQueryClient();

  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getTasksQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteTask,
  });
};
