import { Dropdown, Menu } from 'antd';
import { auth } from 'firebase-config';
import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useStateValue } from 'store/StateProvider';
import tw from 'tailwind-styled-components';
import SearchBar from './SearchBar';
import { SearchOutlined } from '@ant-design/icons';

const Nav = () => {
  const router = useRouter();
  const [{ userInfo }, dispatch] = useStateValue();
  const name = userInfo?.displayName.split(' ');

  const handleRedirect = () => {
    if (userInfo) router.push('/chat');
    else router.push('/login');
  };

  const handleSignOut = () => {
    signOut(auth);
    dispatch({
      type: 'UPDATE_USER',
      item: null,
    });
    router.push('/');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleProfile = () => {
    router.push('/user/' + userInfo.uid);
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

  const menuSignup = (
    <Menu>
      <Menu.Item key='4' onClick={handleLogin}>
        Login
      </Menu.Item>
      <Menu.Item key='5'>Sign Up</Menu.Item>
    </Menu>
  );

  return (
    <Wrapper>
      <Link href='/' passHref>
        <Logo
          src='https://firebasestorage.googleapis.com/v0/b/hangout-28976.appspot.com/o/logos%2Fhangout_lg.svg?alt=media&token=ce17a0a7-f490-4cc8-8175-2501b0bae2d1'
          alt='logo'
        />
      </Link>
      {router.asPath === '/' ? (
        <>
          <SearchBar />
        </>
      ) : null}

      {userInfo ? (
        <UserInfo>
          <Name>Hi, {name[0]}</Name>
          <Dropdown overlay={menu}>
            <Avatar
              src={
                (userInfo && userInfo.photoURL) ||
                'https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'
              }
              alt='avatar'
            />
          </Dropdown>
        </UserInfo>
      ) : (
        <>
          <Dropdown overlay={menuSignup}>
            <Avatar
              src='https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'
              alt='avatar'></Avatar>
          </Dropdown>
        </>
      )}
    </Wrapper>
  );
};

export default Nav;

const Wrapper = tw.div`flex justify-between items-center mt-3 mb-6`;

const UserInfo = tw.div`flex justify-between items-center`;

const Logo = tw.img`flex-none w-20 cursor-pointer`;

const Search = tw.input`basis-1/4 h-8 w-100 border rounded-full`;

const Avatar = tw.img`flex w-8 h-8 rounded-full`;

const Name = tw.p`mr-5 text-slate-700`;
