import { z } from 'zod';

import { apiClient } from '@/libraries/api-client';
import { MutationConfig, queryClient } from '@/libraries/react-query';
import { useMutation } from '@tanstack/react-query';

import { getPostsQueryOptions } from './getPosts';

export const deletePostInputSchema = z.object({});

export type DeletePostInput = z.infer<typeof deletePostInputSchema>;

type Params = {
  id: string | number;
  category_id: number | string;
};
export const deletePost = async ({ id }: Params) => {
  return (await apiClient.delete(`/cms/posts/${id}`)) as any;
};

type UseDeletePostOptions = {
  mutationConfig?: MutationConfig<typeof deletePost>;
};

export const useDeletePost = ({ mutationConfig }: UseDeletePostOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      // queryClient.refetchQueries({ queryKey: getPostsQueryOptions({ categoryId: variables.category_id }).queryKey });
      // Update react-query-cached list of posts, don't refetch data from server
      queryClient.setQueryData(getPostsQueryOptions({ categoryId: variables.category_id }).queryKey, (old: any) => {
        if (!old) {
          return old;
        }
        // If posts are in an array, remove the matching one
        if (Array.isArray(old)) {
          return old.filter((x) => x.id !== data.id);
        }
        // If posts are in an object with a 'data' property (pagination)
        if (old.data && Array.isArray(old.data)) {
          return {
            ...old,
            data: old.data.filter((x: any) => x.id !== data.id),
          };
        }
        return old;
      });

      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    ...restConfig,
    mutationFn: deletePost,
  });
};
