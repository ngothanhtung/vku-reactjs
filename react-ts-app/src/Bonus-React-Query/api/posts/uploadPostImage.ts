import { apiClient } from '@/libraries/api-client';

export const uploadPostImage = async ({ postId, files }: { postId: string; files: any }) => {
  const id = postId;
  // Upload file
  if (files && files.fileList && files.fileList.length > 0) {
    const formData = new FormData();

    files.fileList.forEach((fileInfo: any) => {
      if (fileInfo.originFileObj) {
        formData.append('file', fileInfo.originFileObj, fileInfo.name);
      }
    });

    formData.append('id', id);

    const response = await apiClient.post(`/cms/posts/${id}/upload-image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return Promise.resolve(response);
  } else {
    console.log('No files to upload');
    return Promise.resolve(null);
  }
};
