import { queryOptions, useQuery } from '@tanstack/react-query';

import type { Task } from '../types';
import type { QueryConfig } from '../libraries/react-query';
import { apiClient } from '../libraries/api-client';

export const getTask = ({ taskId }: { taskId?: string | number }): Promise<{ data: Task }> => {
  return apiClient.get(`/workspaces/tasks/${taskId}`);
};

export const getTaskQueryOptions = (taskId?: string | number) => {
  return queryOptions({
    queryKey: ['task', taskId],
    queryFn: () => getTask({ taskId }),
  });
};

type UseTaskOptions = {
  taskId: string | number;
  queryConfig?: QueryConfig<typeof getTaskQueryOptions>;
};

export const useTask = ({ taskId, queryConfig }: UseTaskOptions) => {
  return useQuery({
    ...getTaskQueryOptions(taskId),
    ...queryConfig,
  });
};
