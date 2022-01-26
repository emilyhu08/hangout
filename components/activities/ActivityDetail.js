import moment from 'moment';
import React from 'react';
import tw from 'tailwind-styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ActivityDetail = ({ activity, handleClose, redirectToChat, handleJoin }) => {
  const router = useRouter();
  return (
    <Wrapper>
      <Image src={activity.imgUrls[0]} alt='activity image'></Image>
      <Info>
        <div>{activity.category}</div>
        <div>posted {moment(activity.postDate).fromNow()}</div>
        <Content>Event Date: {moment(activity.eventDate).format('L')}</Content>
        <Content>Event Time: {moment(activity.eventDate).format('LT')}</Content>

        <div>{activity.firstName}</div>
        <div>{activity.lastName}</div>

        <div className='flex items-center'>
          <Link href={`/user/${activity.userId}`} passHref>
            <Avatar
              src={
                activity.userAvatarUrl ||
                'https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'
              }
              alt='avatar'
            />
          </Link>
          <Link href={`/user/ + ${activity.userId}`} passHref>
            <Name>{activity.userName}</Name>
          </Link>
        </div>

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

const Avatar = tw.img`flex w-8 h-8 rounded-full mr-3 cursor-pointer`;

const Name = tw.div`flex font-sm cursor-pointer`;

const Info = tw.div`grid grid-cols-1`;

const Join = tw.button`bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded`;

const Message = tw.button`bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded`;

const Content = tw.article`text-xs`;
