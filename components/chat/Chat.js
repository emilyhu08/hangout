import { auth, db } from 'firebase-config';
import { addDoc, collection, limit, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import tw from 'tailwind-styled-components';
import { v4 as uuidv4 } from 'uuid';
import ChatMessage from './ChatMessage';
import Rooms from './Rooms';

const Chat = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const dummy = useRef();
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, orderBy('createdAt'), limit(25));

  //const [messages] = useCollectionData(q, { idField: 'id' });

  const [messages] = useCollectionData(q);

  const [formValue, setFormValue] = useState('');

  const redirectToHome = () => {
    router.push('/');
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = user;

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Wrapper>
      <SideBar>
        <Rooms />
      </SideBar>
      <Main>
        <Chats>
          {messages && messages.map((msg) => <ChatMessage key={uuidv4()} message={msg} />)}
          <span ref={dummy}></span>
        </Chats>
        <form onSubmit={sendMessage}>
          <Input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder='enter your message here'></Input>
        </form>
      </Main>
    </Wrapper>
  );
};

export default Chat;

const Wrapper = tw.div`flex rounded-3xl`;

const SideBar = tw.div`flex-nowrap flex-col p-5 w-80 bg-white rounded-3xl`;

const Main = tw.div`ml-5 w-full rounded-3xl truncate `;

const Input = tw.input`h-40 p-10 w-full mt-5 rounded-3xl self-baseline bg-white`;

const Chats = tw.div`h-80 p-10 rounded-3xl self-baseline bg-white overflow-y-scroll`;
