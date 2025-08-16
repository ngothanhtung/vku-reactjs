import { queryOptions, useQuery } from '@tanstack/react-query';

import { apiClient } from '../libraries/api-client';

import type { QueryConfig } from '../libraries/react-query';
import type { Task } from '../types';

export const getAllTasks = (): Promise<Task[]> => {
  return apiClient.get(`/workspaces/tasks`);
};

export const getTasksQueryOptions = () => {
  return queryOptions({
    queryKey: ['getTasks'] as const,
    queryFn: getAllTasks,
  });
};

type UseTasksOptions = {
  queryConfig?: QueryConfig<typeof getTasksQueryOptions>;
};

export const useTasks = ({ queryConfig }: UseTasksOptions = {}) => {
  return useQuery({
    ...getTasksQueryOptions(),
    ...queryConfig,
  });
};
