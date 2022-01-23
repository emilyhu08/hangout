import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import tw from 'tailwind-styled-components';
import { auth } from 'firebase-config';
import { useStateValue } from 'store/StateProvider';
import Search from './Search';

const Nav = () => {
  const [{ userInfo }, dispatch] = useStateValue();
  const router = useRouter();

  function showProfileHandler() {
    router.push('/user/' + '22');
  }

  return (
    <Wrapper>
      <Link href='/' passHref>
        <Logo
          src='https://firebasestorage.googleapis.com/v0/b/hangout-28976.appspot.com/o/logos%2Fhangout_lg.svg?alt=media&token=ce17a0a7-f490-4cc8-8175-2501b0bae2d1'
          alt='logo'
        />
      </Link>
      <Search />
      <Avatar
        src={userInfo && userInfo.photoUrl}
        alt='avatar'
        onClick={showProfileHandler}></Avatar>
      <button onClick={() => signOut(auth)}>Signout</button>
    </Wrapper>
  );
};

export default Nav;

const Wrapper = tw.div`flex justify-between items-center mt-3 mb-6`;

const Logo = tw.img`ml-3 w-20 cursor-pointer`;

const Name = tw.div`text-1xl`;

const Avatar = tw.img`w-9 h-9 rounded-full border border-grey-200 mr-3 `;
