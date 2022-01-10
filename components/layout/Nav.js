import React from 'react';
import tw from 'tailwind-styled-components';

const Nav = () => {
  return (
    <Wrapper>
      <Logo>hangout</Logo>
      <Avatar></Avatar>
    </Wrapper>
  );
};

export default Nav;

const Wrapper = tw.div``;

const Logo = tw.div``;

const Avatar = tw.img``;
