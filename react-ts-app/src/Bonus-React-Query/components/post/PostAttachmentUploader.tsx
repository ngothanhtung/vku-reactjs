// Example usage of the updated uploadPostAttachment function with chunked upload

import { Button, message, Progress, Typography, Upload } from 'antd';
import React, { useState } from 'react';

import { uploadPostAttachment } from '@/features/cms/api/posts/uploadPostAttachment';
import { FileOutlined, UploadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

type ChunkedUploadProps = {
  postId: string | number;
  onUploadComplete?: (response: any) => void;
};

const PostAttachmentUploader: React.FC<ChunkedUploadProps> = ({ postId, onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  React.useEffect(() => {
    setUploadedFiles([]);
  }, [postId]);

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    setProgress(0);

    try {
      const response = await uploadPostAttachment({
        postId,
        files: {
          fileList: [
            {
              uid: file.name + Date.now(),
              name: file.name,
              originFileObj: file,
            },
          ],
        },
        onProgress: (progressValue) => {
          setProgress(progressValue);
        },
      });

      message.success(`Tệp "${file.name}" đã được tải lên thành công!`);
      setUploadedFiles((prev) => [...prev, { name: file.name, response }]);
      if (onUploadComplete) {
        onUploadComplete(response);
      }
    } catch (error) {
      message.error(`Quá trình tải lên thất bại: ${(error as Error).message}`);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      handleFileUpload(file);
      return false; // Prevent default upload
    },
    disabled: uploading,
    accept: '*', // Accept all file types
    showUploadList: false,
    maxCount: 1,
    multiple: false,
  };

  return (
    <div style={{ paddingInline: 24 }}>
      <div style={{ margin: '20px 0' }}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />} loading={uploading} disabled={uploading} type="primary">
            {uploading ? 'Đang tải lên ...' : 'Chọn tệp để tải lên'}
          </Button>
        </Upload>
      </div>

      {uploading && (
        <div style={{ margin: '20px 0' }}>
          <Text strong>Tiến trình tải lên:</Text>
          <Progress percent={progress} status={progress === 100 ? 'success' : 'active'} />
          <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
            Tệp sẽ được tải lên từng phần 5MB để tối ưu hóa hiệu suất và độ tin cậy.
          </Text>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <Title level={5}>Các tệp đã tải lên:</Title>
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid #f0f0f0',
              }}
            >
              <FileOutlined style={{ marginRight: 8, color: '#52c41a' }} />
              <Text>{file.name}</Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostAttachmentUploader;
