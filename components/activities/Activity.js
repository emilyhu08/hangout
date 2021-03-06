import { CloseOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import AvatarGroup from 'components/styled/AvatorGroup';
import { deleteOne } from 'firebase-config';
import { useRouter } from 'next/router';
import { useState } from 'react';
import tw from 'tailwind-styled-components';
import ActivityDetail from './ActivityDetail';
import Image from 'next/image';

const Activity = ({ activity }) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const showModal = () => {
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const redirectToChat = () => {
    router.push(`/chat/${activity.userId}`);
    handleClose();
  };

  const handleJoin = () => {
    handleClose();
    message.success('Request Sent!');
  };

  // const redirectToMessage = () => {
  //   router.push('/message/' + activity.id);
  //   setSelected(activity);
  // };

  const handleDelete = () => {
    deleteOne('activities', activity.id)
  };

  return (
    <Wrapper>
      <div className='cursor-pointer'>
        <Image
          width={400}
          height={300}
          objectFit='cover'
          src={activity.imgUrls[0]}
          alt='activity image'
          onClick={showModal}
        ></Image>
      </div>

      <Title>{activity.activity}</Title>
      <Content>{activity.category}</Content>
      {/* <Content>Location: {activity.location}</Content> */}
      <div className='flex items-center justify-between'>
        <AvatarGroup activity={activity} />
        <Slots>2 slots left!</Slots>
      </div>
      {/* <Like>
        <HeartOutlined className={`hover:scale-110`} />
      </Like> */}
      <Delete>
        <CloseOutlined onClick={handleDelete} />
      </Delete>
      <Modal visible={isVisible} onCancel={handleClose} footer={null} centered>
        <ActivityDetail
          handleClose={handleClose}
          handleJoin={handleJoin}
          redirectToChat={redirectToChat}
          activity={activity}
        />
      </Modal>
    </Wrapper>
  );
};

export default Activity;

const Wrapper = tw.div`relative card rounded-md m-2 p-2 bg-white shadow-md hover:shadow-lg hover:scale-105`;

// const Image = tw.img`object-cover h-40 w-auto cursor-pointer`;

const Title = tw.div`text-lg mt-1 mb-1 truncate font-medium`;

const Content = tw.div`text-xs mt-2 mb-2`;

const Slots = tw.div`text-xs ml-3`;

const Delete = tw.div`absolute top-1 right-3 text-white drop-shadow-md hover:scale-110`;

const Like = tw.div`absolute bottom-2 right-3`;
