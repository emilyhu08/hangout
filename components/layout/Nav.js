import { Dropdown, Menu } from 'antd';
import { auth } from 'firebase-config';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useStateValue } from 'store/StateProvider';
import tw from 'tailwind-styled-components';
import SearchBar from './SearchBar';
import { useAuthState } from 'react-firebase-hooks/auth';

const Nav = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const name = user?.displayName.split(' ');

  const handleRedirect = () => {
    if (user) router.push('/chat/0');
    else router.push('/login');
  };

  const handleSignOut = () => {
    signOut(auth);
    router.push('/');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleProfile = () => {
    router.push('/user/' + user.uid);
  };

  const menu = (
    <Menu>
      <Menu.Item key='1' onClick={handleProfile}>
        Profile
      </Menu.Item>
      <Menu.Item key='2' onClick={handleRedirect}>
        Messages
      </Menu.Item>
      <Menu.Item key='3' onClick={handleSignOut}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Wrapper>
      <div className='flex'>
        <Link href='/' passHref>
          <Logo
            src='https://firebasestorage.googleapis.com/v0/b/hangout-28976.appspot.com/o/logos%2Fhangout_lg.svg?alt=media&token=ce17a0a7-f490-4cc8-8175-2501b0bae2d1'
            alt='logo'
          />
        </Link>
        <Link href='/' passHref>
          <Title>hangout</Title>
        </Link>
      </div>
      {router.asPath === '/' ? (
        <>
          <SearchBar />
        </>
      ) : null}

      {user ? (
        <UserInfo>
          <Name>Hi, {name[0]}</Name>
          <Dropdown overlay={menu}>
            <Avatar
              src={
                (user && user.photoURL) ||
                'https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'
              }
              alt='avatar'
            />
          </Dropdown>
        </UserInfo>
      ) : (
        <>
          {/* <Dropdown overlay={menuSignup}>
            <Avatar
              src='https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'
              alt='avatar'></Avatar>
          </Dropdown> */}
          <div>
            <Signup>Sign up</Signup>
            <Login onClick={handleLogin}>Log in</Login>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Nav;

const Wrapper = tw.div`flex justify-between items-center mt-3 mb-6`;

const UserInfo = tw.div`flex justify-between items-center`;

const Logo = tw.img`flex ml-3 w-20 cursor-pointer`;

const Search = tw.input`basis-1/4 h-8 w-100 border rounded-full`;

const Avatar = tw.img`flex w-8 h-8 rounded-full mr-3`;

const Name = tw.p`mr-5 text-slate-700`;

const Login = tw.button`ml-3 mr-3 font-semibold`;

const Signup = tw.button`mr-3 font-semibold`;

const Title = tw.button`ml-5 text-xl font-semibold `;
