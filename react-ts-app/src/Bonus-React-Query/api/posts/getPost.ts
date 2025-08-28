import { apiClient } from '@/libraries/api-client';
import { QueryConfig } from '@/libraries/react-query';
import { queryOptions, useQuery } from '@tanstack/react-query';

type Params = {
  postId: string | number;
};

export const getPost = async ({ postId }: Params): Promise<any> => {
  return apiClient.get(`/cms/posts/${postId}`) as any;
};

export const getPostQueryOptions = ({ postId }: Params) => {
  return queryOptions({
    queryKey: ['cms', 'post', postId],
    queryFn: () => getPost({ postId }),
  });
};

type UsePostOptions = {
  postId: string | number;
  queryConfig?: QueryConfig<typeof getPostQueryOptions>;
};

export const usePost = ({ postId, queryConfig }: UsePostOptions) => {
  return useQuery({
    ...getPostQueryOptions({ postId }),
    ...queryConfig,
  });
};
