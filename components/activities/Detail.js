import React from 'react';
import tw from 'tailwind-styled-components';

const Detail = ({ selected }) => {
  return (
    <Wrapper>
      <Image src={selected.activityImgUrl} alt='activity image'></Image>
      <div>{selected.activity}</div>
      <div>{selected.category}</div>
      <div>{selected.postDate}</div>
      <div>{selected.eventDate}</div>
      <div>{selected.firstName}</div>
      <div>{selected.lastName}</div>
      <Avatar src={selected.userAvatarUrl} alt='avatar'></Avatar>
      <address>{selected.location}</address>
      <div>{selected.description}</div>
    </Wrapper>
  );
};

export default Detail;

const Wrapper = tw.div`card rounded m-2 p-2 bg-white `;

const Image = tw.img`
h-50 w-50 object-cover`;

const Avatar = tw.img`w-10 h-10 rounded-full mr-4 border border-grey-200 p-px`;
