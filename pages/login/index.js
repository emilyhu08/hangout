import 'antd/dist/antd.css';
import { signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/router';
import React from 'react';
import { useStateValue } from 'store/StateProvider';
import tw from 'tailwind-styled-components';
import { auth, provider } from '/firebase-config';

const Login = () => {
  const [{ userInfo }, dispatch] = useStateValue();
  const router = useRouter();

  const handleRedirect = () => {
    signInWithPopup(auth, provider).then((result) => {
      if (result.user) {
        dispatch({
          type: 'UPDATE_USER',
          item: result.user,
        });
        router.push('/');
      }
    });
  };

  return (
    <Wrapper>
      <Logo
        src='https://firebasestorage.googleapis.com/v0/b/hangout-28976.appspot.com/o/logos%2Fhangout_lg.svg?alt=media&token=ce17a0a7-f490-4cc8-8175-2501b0bae2d1'
        alt='logo'
      />
      <LoginButton onClick={handleRedirect}>Sign In With Google</LoginButton>
    </Wrapper>
  );
};

export default Login;

const Wrapper = tw.div`grid place-items-center h-screen w-screen`;

const LoginButton = tw.button`text-3xl`;

const Logo = tw.img`w-60`;
