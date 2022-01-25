import { CloseOutlined, HeartOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { deleteOne } from 'firebase-config';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import tw from 'tailwind-styled-components';
import ActivityDetail from './ActivityDetail';
import { message, Button, Space } from 'antd';

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
    router.push('/chat/');
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
    deleteOne('activities', activity.id);
  };

  return (
    <Wrapper>
      <Title>{activity.activity}</Title>
      <Image src={activity.imgUrls[0]} alt='activity image' onClick={showModal}></Image>
      <Content>{activity.category}</Content>
      <Content>{activity.eventDate}</Content>
      <Content>{activity.location}</Content>
      <Like>
        <HeartOutlined className={`hover:scale-110`} />
      </Like>
      <Delete>
        <CloseOutlined onClick={handleDelete} />
      </Delete>
      <Modal
        visible={isVisible}
        onCancel={handleClose}
        title={activity.activity}
        footer={null}
        centered>
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

const Wrapper = tw.div`relative card rounded m-2 p-2 bg-white  shadow-md  hover:shadow-lg hover:scale-105`;

const Image = tw.img`object-cover h-40 w-auto cursor-pointer`;

const Title = tw.div`text-xl`;

const Content = tw.article`prose prose-sm`;

const Delete = tw.div`absolute top-1 right-3 text-white drop-shadow-md hover:scale-110`;

const Like = tw.div`absolute bottom-2 right-3`;
