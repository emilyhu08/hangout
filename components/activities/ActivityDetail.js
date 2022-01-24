import moment from 'moment';
import React from 'react';
import tw from 'tailwind-styled-components';

const ActivityDetail = ({ activity, handleClose, redirectToChat, handleJoin }) => {
  return (
    <Wrapper>
      <Image src={activity.imgUrls[0]} alt='activity image'></Image>
      <Info>
        <div>{activity.category}</div>
        <div>posted {moment(activity.postDate).fromNow()}</div>
        <div>{activity.eventDate}</div>
        <div>{activity.firstName}</div>
        <div>{activity.lastName}</div>
        <Avatar src={activity.userAvatarUrl} alt='avatar'></Avatar>
        <address>{activity.location}</address>
        <div>{activity.description}</div>
      </Info>
      <Message onClick={redirectToChat}>Message Host</Message>
      <Join onClick={handleJoin}>Request To Join</Join>
    </Wrapper>
  );
};

export default ActivityDetail;

const Wrapper = tw.div`grid grid-cols-2 gap-4 `;

const Image = tw.img`grid grid-cols-1 object-cover h-40 w-auto`;

const Avatar = tw.img``;

const Info = tw.div`grid grid-cols-1`;

const Join = tw.button`bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded`;

const Message = tw.button`bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded`;
