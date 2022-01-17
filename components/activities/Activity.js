import { useRouter } from 'next/router';
import React from 'react';
import tw from 'tailwind-styled-components';

const Activity = ({ activity }) => {
  const router = useRouter();

  function showDetailsHandler() {
    router.push('/' + activity.id);
  }

  return (
    <Wrapper onClick={showDetailsHandler}>
      <Image src='https://picsum.photos/300/200' alt='activity image'></Image>
      <div>{activity.activity}</div>
      <div>{activity.category}</div>
      <div>{activity.postDate}</div>
      <div>{activity.eventDate}</div>
      <div>{activity.firstName}</div>
      <div>{activity.lastName}</div>
      <Avatar src='https://picsum.photos/50' alt='avatar'></Avatar>
      <address>{activity.location}</address>
      <div>{activity.description}</div>
    </Wrapper>
  );
};

export default Activity;

const Wrapper = tw.div`card rounded m-2 p-2 bg-white cursor-pointer shadow-md`;

const Image = tw.img`
object-cover`;

const Avatar = tw.img`w-10 h-10 rounded-full mr-4 p-px `;
