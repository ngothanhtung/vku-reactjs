import { apiClient } from '@/libraries/api-client';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

const uploadFileInChunks = async (file: File, postId: string | number, onProgress?: (progress: number) => void) => {
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  const originalName = file.name;

  // If file is smaller than chunk size, upload directly
  if (totalChunks === 1) {
    const formData = new FormData();
    formData.append('file', file, originalName);
    formData.append('original_name', originalName);
    formData.append('total_chunks', '1');
    formData.append('chunk_index', '0');

    const response = await apiClient.post(`/cms/posts/${postId}/upload-attachment`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (onProgress) onProgress(100);
    return response;
  }

  // Upload file in chunks
  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const start = chunkIndex * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const chunk = file.slice(start, end);

    const formData = new FormData();
    formData.append('file', chunk, `${originalName}_chunk_${chunkIndex}`);
    formData.append('original_name', originalName);
    formData.append('total_chunks', totalChunks.toString());
    formData.append('chunk_index', chunkIndex.toString());

    const response = await apiClient.post(`/cms/posts/${postId}/upload-attachment`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Update progress
    if (onProgress) {
      const progress = Math.round(((chunkIndex + 1) / totalChunks) * 100);
      onProgress(progress);
    }

    // If this is the last chunk, return the final response
    if (chunkIndex === totalChunks - 1) {
      return response;
    }
  }
};

export const uploadPostAttachment = async ({ postId, files, onProgress }: { postId: string | number; files: any; onProgress?: (progress: number) => void }) => {
  const id = postId;

  // Upload file
  if (files && files.fileList && files.fileList.length > 0) {
    const results = [];

    for (let i = 0; i < files.fileList.length; i++) {
      const fileInfo = files.fileList[i];
      if (fileInfo.originFileObj) {
        const fileProgress = (fileIndex: number, progress: number) => {
          if (onProgress) {
            const totalProgress = (fileIndex * 100 + progress) / files.fileList.length;
            onProgress(Math.round(totalProgress));
          }
        };

        const response = await uploadFileInChunks(fileInfo.originFileObj, id, (progress) => fileProgress(i, progress));
        results.push(response);
      }
    }

    return Promise.resolve(results.length === 1 ? results[0] : results);
  } else {
    console.log('No files to upload');
    return Promise.resolve(null);
  }
};
