import { Divider, Modal } from 'antd';
import React from 'react';

import ModalFooter from '@/components/ModalFooter';
import PostAttachmentUploader from '@/features/cms/pages/posts/components/PostAttachmentUploader';

type Props = {
  open: boolean;
  data: any;
  onUploadComplete: (response: any) => void;
  onClose: () => void;
};

export default function UploadPostAttachmentModal({ open, data, onUploadComplete, onClose }: Props) {
  return (
    <React.Fragment>
      <Modal
        open={open}
        centered
        title="TẢI LÊN TỆP ĐÍNH KÈM"
        onCancel={() => {
          if (onClose && typeof onClose === 'function') {
            onClose();
          }
        }}
        footer={
          <ModalFooter
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
            <PostAttachmentUploader postId={data?.id} onUploadComplete={onUploadComplete} />
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}
