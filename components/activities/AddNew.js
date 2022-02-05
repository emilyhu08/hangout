import { PlusCircleFilled } from '@ant-design/icons';
import { Modal, Tooltip } from 'antd';
import { useState } from 'react';
import tw from 'tailwind-styled-components';
import FormInputs from './FormInputs';

const AddNew = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Tooltip placement='top' title={'Add an Activity'}>
        <Add onClick={showModal}>
          <PlusCircleFilled />
        </Add>
      </Tooltip>
      <Modal
        visible={isModalVisible}
        onCancel={handleClose}
        title='Add An Activity'
        footer={null}
        destroyOnClose={true}
        centered
      >
        <FormInputs handleClose={handleClose} />
      </Modal>
    </div>
  );
};

export default AddNew;

const Add = tw.button`text-4xl fixed bottom-10 right-10 text-slate-700 hover:text-slate-200`;
