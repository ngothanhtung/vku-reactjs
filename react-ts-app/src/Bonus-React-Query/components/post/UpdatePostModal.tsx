import { Divider, FormInstance, message, Modal } from 'antd';
import React from 'react';

import DynamicForm from '@/components/DynamicForm';
import ModalFooter from '@/components/ModalFooter';
import { usePost } from '@/features/cms/api/posts/getPost';
import { useUpdatePost } from '@/features/cms/api/posts/updatePost';
import { uploadPostImage } from '@/features/cms/api/posts/uploadPostImage';

import formData from '../form.data';

type Props = {
  open: boolean;
  data: any;
  onOk: () => void;
  onClose: () => void;
};

export default function UpdatePostModal({ open, data, onOk, onClose }: Props) {
  // Memoize the form data to prevent unnecessary re-renders and form resets
  const memoizedFormData = React.useMemo(
    () => ({
      ...formData,
      formFields: formData.formFields.map((field) => {
        // Add any field modifications here if needed
        return field;
      }),
    }),
    []
  ); // Empty dependency array since formData is static

  let updateForm: FormInstance<any> | null = null;

  const { data: post } = usePost({
    postId: data?.id,
    queryConfig: {
      enabled: !!data?.id && open,
    },
  });

  const mutationUpdate = useUpdatePost({
    mutationConfig: {
      onError: () => {
        message.error('Cập nhật bài viết thất bại');
      },
    },
  });

  const onUpdate = async (values: any) => {
    await mutationUpdate.mutateAsync(
      { id: data?.id, data: values },
      {
        async onSuccess(data, variables, context) {
          // Upload files
          const id = data?.id || null;
          await uploadPostImage({ postId: id, files: values.files });

          // Reset form
          updateForm?.resetFields();

          // Show success message
          message.success('Cập nhật dữ liệu thành công', 1.5);
          // Close modal
          if (onOk && typeof onOk === 'function') {
            onOk();
          }
        },
      }
    );
  };

  return (
    <React.Fragment>
      <Modal
        open={open}
        width={'100%'}
        centered
        title="CẬP NHẬT THÔNG TIN BÀI VIẾT"
        onCancel={() => {
          if (onClose && typeof onClose === 'function') {
            onClose();
          }
        }}
        footer={
          <ModalFooter
            onSubmit={() => {
              updateForm?.submit();
            }}
            onClose={() => {
              if (onClose && typeof onClose === 'function') {
                onClose();
              }
            }}
          />
        }
      >
        <div style={{ minHeight: 300, maxHeight: 'calc(100vh - 220px)', overflowY: 'auto', overflowX: 'hidden' }}>
          <div style={{ margin: 0, marginLeft: -24, marginRight: -24, marginTop: -8 }}>
            <Divider />
          </div>
          <DynamicForm
            name={`update-post-form-${data?.id}`}
            showSubmitButton={false}
            showCardContainer={false}
            initialFormData={{
              ...memoizedFormData,
              header: undefined,
            }}
            initialValues={{
              ...post,
            }}
            getFormInstance={(form) => {
              updateForm = form;
            }}
            onSubmit={onUpdate}
          />
        </div>
      </Modal>
    </React.Fragment>
  );
}
