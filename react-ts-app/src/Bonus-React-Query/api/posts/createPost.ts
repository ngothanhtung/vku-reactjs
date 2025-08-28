import { z } from 'zod';

import { apiClient } from '@/libraries/api-client';
import { MutationConfig, queryClient } from '@/libraries/react-query';
import { useMutation } from '@tanstack/react-query';

import { getPostsQueryOptions } from './getPosts';

export const createPostInputSchema = z.object({
  // title: z.string().min(1, 'Tiêu đề không được để trống'),
  // description: z.string().optional(),
  // content: z.string().optional(),
  // category_id: z.number().min(1, 'Vui lòng chọn danh mục'),
  // files: z.any().optional(),
});

export type CreatePostInput = z.infer<typeof createPostInputSchema>;

export const createPost = async (data: CreatePostInput) => {
  // try {
  //   createPostInputSchema.parse(data);
  // } catch (error) {
  //   return Promise.reject(error);
  // }
  return (await apiClient.post(`/cms/posts`, data)) as any;
};

type UseCreatePostOptions = {
  mutationConfig?: MutationConfig<typeof createPost>;
};

export const useCreatePost = ({ mutationConfig }: UseCreatePostOptions = {}) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    onSuccess: (data, variables, context) => {
      const queryKey = getPostsQueryOptions({ categoryId: variables.category_id }).queryKey;
      queryClient.refetchQueries({ queryKey });
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
    ...restConfig,
    mutationFn: createPost,
  });
};
