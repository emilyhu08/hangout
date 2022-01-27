import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import tw from 'tailwind-styled-components';

const ActivityDetail = ({ activity, handleClose, redirectToChat, handleJoin }) => {
  return (
    <>
      <Title>{activity.activity}</Title>
      <HR />
      <Wrapper>
        <Image src={activity.imgUrls[0]} alt='activity image'></Image>
        <Info>
          <div>{activity.category}</div>
          <Date>
            <Semi>Event Date: </Semi>
            {moment(activity.eventDate).format('LL')}
          </Date>
          <Date>
            <Semi>Event Time: </Semi>
            {moment(activity.eventDate).format('LT')}
          </Date>
          <>
            <Semi>Description: </Semi>
          </>
          <Description>{activity.description}</Description>
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
            <div>
              <Link href={`/user/ + ${activity.userId}`} passHref>
                <Name>{activity.userName}</Name>
              </Link>
              <Ago>posted {moment(activity.postDate).fromNow()}</Ago>
            </div>
          </div>
        </Info>
        <Message onClick={redirectToChat}>Message Host</Message>
        <Join onClick={handleJoin}>Request To Join</Join>
      </Wrapper>
    </>
  );
};

export default ActivityDetail;

const Wrapper = tw.div`grid grid-cols-2 gap-4 `;

const Image = tw.img`grid grid-cols-1 object-cover h-40 w-auto`;

const Avatar = tw.img`flex w-8 h-8 rounded-full mr-3 cursor-pointer`;

const Name = tw.div`flex text-s cursor-pointer`;

const Info = tw.div`flex flex-col`;

const Join = tw.button`bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded`;

const Message = tw.button`bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded`;

const Date = tw.div`flex text-s font-light`;

const Description = tw.div`flex-none font-light h-10 text-s mb-3 overflow-y-scroll`;

const Ago = tw.div`text-xs font-light`;

const Title = tw.div`text-xl mb-1 font-medium`;

const HR = tw.hr`mb-5`;

const Semi = tw.div`font-medium`;
