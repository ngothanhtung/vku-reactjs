import { apiClient } from '@/libraries/api-client';
import { QueryConfig } from '@/libraries/react-query';
import { queryOptions, useQuery } from '@tanstack/react-query';
type Params = {
  categoryId: number | string;
};

export const getPosts = async ({ categoryId }: Params): Promise<any> => {
  return apiClient.get(`/cms/posts/category/${categoryId}`) as any;
};

export const getPostsQueryOptions = ({ categoryId }: Params) => {
  return queryOptions({
    queryKey: ['cms', 'posts', 'category', categoryId],
    queryFn: () => getPosts({ categoryId }),
  });
};

type UsePostsOptions = {
  // Dynamic parameter
  categoryId: number | string;

  // Template
  queryConfig?: QueryConfig<typeof getPostsQueryOptions>;
};

export const usePosts = ({ categoryId, queryConfig }: UsePostsOptions) => {
  return useQuery({
    ...getPostsQueryOptions({ categoryId }),
    ...queryConfig,
  });
};
