import React, { useEffect } from 'react';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../../firebase-config';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox } from 'antd';

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/');
      }
    });
  }, [router]);

  return (
    <Wrapper>
      <Logo src='https://firebasestorage.googleapis.com/v0/b/hangout-28976.appspot.com/o/logos%2Fhangout_lg.svg?alt=media&token=ce17a0a7-f490-4cc8-8175-2501b0bae2d1' alt='logo' />
      <LoginButton onClick={() => signInWithPopup(auth, provider)}>Sign In With Google</LoginButton>
    </Wrapper>
  );
};

export default Login;

const Wrapper = tw.div`grid place-items-center h-screen w-screen`;

const LoginButton = tw.button`text-3xl`;

const Logo = tw.img`w-60`;
