import 'antd/dist/antd.css';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React from 'react';
import tw from 'tailwind-styled-components';
import { auth, db, provider } from '/firebase-config';

const Login = () => {
  const router = useRouter();

  const handleRedirect = () => {
    signInWithPopup(auth, provider).then((result) => {
      if (result.user) {
        const usersRef = doc(db, 'users', result.user.uid);
        setDoc(
          usersRef,
          {
            name: result.user.displayName,
            photoURL: result.user.photoURL,
            email: result.user.email,
          },
          { merge: true }
        );
        router.push('/');
      }
    });
  };

  return (
    <div
      className='grid place-items-center h-screen w-screen bg-repeat'
      style={{
        backgroundImage: `url(
          'https://firebasestorage.googleapis.com/v0/b/hangout-28976.appspot.com/o/activities%2Fwowpatterns-export%20(3).png?alt=media&token=d323db7b-ce6b-45a0-b9f2-723e0ff4c7c4'
        )`,
        backgroundSize: '200px 200px',
        backgroundColor: '#374151',
      }}>
      <Box>
        <Logo
          src='https://firebasestorage.googleapis.com/v0/b/hangout-28976.appspot.com/o/logos%2Fhangout_lg.svg?alt=media&token=ce17a0a7-f490-4cc8-8175-2501b0bae2d1'
          alt='logo'
        />
        <LoginButton onClick={handleRedirect}>Sign In With Google</LoginButton>
      </Box>
    </div>
  );
};

export default Login;

const Box = tw.div`grid content-center p-20 shadow-md mb-20 rounded-xl bg-white`;

const Logo = tw.img`w-60 mb-5 `;

const LoginButton = tw.button`text-xl mt-5 bg-transparent hover:bg-slate-500 text-slate-700 font-semibold hover:text-white py-2 px-4 border border-slate-700 hover:border-transparent rounded`;
