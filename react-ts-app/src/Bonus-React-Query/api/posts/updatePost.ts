import { z } from 'zod';

import { apiClient } from '@/libraries/api-client';
import { MutationConfig, queryClient } from '@/libraries/react-query';
import { useMutation } from '@tanstack/react-query';

import { getPostsQueryOptions } from './getPosts';
import { getPostQueryOptions } from './getPost';

export const updatePostInputSchema = z.object({});

export type UpdatePostInput = z.infer<typeof updatePostInputSchema>;

export const updatePost = async ({ id, data }: { id: string; data: UpdatePostInput }) => {
  return (await apiClient.patch(`/cms/posts/${id}`, data)) as any;
};

type UseUpdatePostOptions = {
  mutationConfig?: MutationConfig<typeof updatePost>;
};

export const useUpdatePost = ({ mutationConfig }: UseUpdatePostOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      // Update single folder cache
      queryClient.setQueryData(getPostQueryOptions({ postId: data.id }).queryKey, data);

      // queryClient.refetchQueries({ queryKey: getPostsQueryOptions({ categoryId: data.category_id }).queryKey });
      // Update folders list cache if present
      queryClient.setQueryData(getPostsQueryOptions({ categoryId: data.category_id }).queryKey, (old: any) => {
        if (!old) {
          return old;
        }
        // If folders are in an array, update the matching one
        if (Array.isArray(old)) {
          return old.map((x) => (x.id === data.id ? data : x));
        }
        // If folders are in an object with a 'data' property (pagination)
        if (old.data && Array.isArray(old.data)) {
          return {
            ...old,
            data: old.data.map((x: any) => (x.id === data.id ? data : x)),
          };
        }
        return old;
      });

      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    ...restConfig,
    mutationFn: updatePost,
  });
};
