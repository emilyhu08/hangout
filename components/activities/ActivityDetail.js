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
        <Date>Event Date: {moment(activity.eventDate).format('LL')}</Date>
        <Date>Event Time: {moment(activity.eventDate).format('LT')}</Date>
        <Description>Description: {activity.description}</Description>
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
        <Ago>posted {moment(activity.postDate).fromNow()}</Ago>
      </Info>
      <Message onClick={redirectToChat}>Message Host</Message>
      <Join onClick={handleJoin}>Request To Join</Join>
    </Wrapper>
  );
};

export default ActivityDetail;

const Wrapper = tw.div`grid grid-cols-2 gap-4 `;

const Image = tw.img`grid grid-cols-1 object-cover h-40 w-auto`;

const Avatar = tw.img`flex w-5 h-5 rounded-full mr-3 cursor-pointer`;

const Name = tw.div`flex text-xs cursor-pointer`;

const Info = tw.div`grid grid-cols-1`;

const Join = tw.button`bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded`;

const Message = tw.button`bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded`;

const Date = tw.div`text-xs`;

const Description = tw.div`text-xs`;

const Ago = tw.div`text-xs`;
