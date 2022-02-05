import { auth } from 'firebase-config';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import tw from 'tailwind-styled-components';
import SearchBar from './SearchBar';

const ProfileDropdown = dynamic(() => import('./ProfileDropdown'));
const Link = dynamic(() => import('next/link'));

const Nav = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const name = user?.displayName.split(' ');

  const handleLogin = () => {
    router.push('/login');
  };

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
          <ProfileDropdown user={user} auth={auth}/>
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

const Logo = tw.img`flex-none ml-3 w-20 cursor-pointer`;

const Avatar = tw.img`flex-none w-8 h-8 rounded-full mr-3`;

const Name = tw.p`flex-none mr-5 text-slate-700`;

const Login = tw.button`ml-3 mr-3 font-semibold`;

const Signup = tw.button`mr-3 font-semibold`;

const Title = tw.button`ml-5 text-xl font-semibold `;
