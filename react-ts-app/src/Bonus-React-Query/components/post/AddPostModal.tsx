import { Button, FormInstance, message, Modal } from 'antd';
import React from 'react';
import { BiTask } from 'react-icons/bi';

import DynamicForm from '@/components/DynamicForm';
import ModalBody from '@/components/ModalBody';
import ModalFooter from '@/components/ModalFooter';
import { useCreatePost } from '@/features/cms/api/posts/createPost';
import { uploadPostImage } from '@/features/cms/api/posts/uploadPostImage';
import { useAuthStore } from '@/store/auth/useAuthStore';

import formData from '../form.data';

type Props = {
  buttonText?: string;
  onOK?: () => void;
};

export default function AddPostModal({ buttonText = 'Tạo mới bài viết', onOK }: Props) {
  const { loggedInUser } = useAuthStore();

  let createForm: FormInstance<any> | null = null;
  const [openCreateModal, setOpenCreateModal] = React.useState<boolean>(false);

  // Memoize the form data to prevent unnecessary re-renders and form resets
  const memoizedFormData = React.useMemo(
    () => ({
      ...formData,
      formFields: formData.formFields.map((field) => {
        // Add any field modifications here if needed
        return field;
      }),
    }),
    [],
  ); // Empty dependency array since formData is static

  const mutationCreate = useCreatePost({
    mutationConfig: {
      onError: (error) => {
        // Handle error here - DO NOT reset form or close modal
        console.error('Error creating post:', error);
        message.error('Có lỗi xảy ra khi thêm mới dữ liệu', 1.5);
        // Keep the modal open and form data intact so user can retry
      },
    },
  });

  const onSubmit = async (values: any) => {
    await mutationCreate.mutateAsync(values, {
      async onSuccess(data) {
        const id = data?.id || null;

        // Upload files
        await uploadPostImage({ postId: id, files: values.files });
        // Reset form
        createForm?.resetFields();
        // Close modal
        setOpenCreateModal(false);
        // Show success message
        message.success('Thêm mới dữ liệu thành công', 1.5);
        // Call onOK callback if provided
        // Close modal
        if (onOK && typeof onOK === 'function') {
          onOK();
        }
      },
    });
  };

  return (
    <React.Fragment>
      <Button
        type="primary"
        icon={<BiTask size={16} />}
        onClick={() => {
          setOpenCreateModal(true);
        }}
      >
        {buttonText}
      </Button>
      <Modal
        open={openCreateModal}
        width={'100%'}
        centered
        title={buttonText.toUpperCase()}
        style={{ position: 'relative' }}
        onCancel={() => {
          setOpenCreateModal(false);
        }}
        footer={
          <ModalFooter
            onSubmit={() => {
              createForm?.submit();
            }}
            onClose={() => {
              setOpenCreateModal(false);
            }}
          />
        }
      >
        <ModalBody>
          <DynamicForm
            name={`add-post-form`}
            initialFormData={memoizedFormData}
            onSubmit={onSubmit}
            showSubmitButton={false}
            showCardContainer={false}
            getFormInstance={(form) => {
              createForm = form;
            }}
          />
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}
