import Link from 'next/link';
import React from 'react';
import tw from 'tailwind-styled-components';

const Nav = () => {
  return (
    <Wrapper>
      <Link href='/' className='cursor-pointer'>
        <Logo>hangout</Logo>
      </Link>
      <Avatar src='https://picsum.photos/50' alt='avatar'></Avatar>
    </Wrapper>
  );
};

export default Nav;

const Wrapper = tw.div`flex justify-between item-center`;

const Logo = tw.div`text-3xl p-2`;

const Avatar = tw.img`w-10 h-10 rounded-full mr-4 border border-grey-200 p-px`;
