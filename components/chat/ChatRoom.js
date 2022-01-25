import { auth, db } from 'firebase-config';
import { addDoc, collection, limit, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
import { useStateValue } from 'store/StateProvider';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

const ChatRoom = () => {
  const [{ userInfo }, dispatch] = useStateValue();
  const router = useRouter();
  const dummy = useRef();
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, orderBy('createdAt'), limit(25));

  //const [messages] = useCollectionData(q, { idField: 'id' });

  const [messages] = useCollectionData(messagesRef);

  const [formValue, setFormValue] = useState('');

  const redirectToHome = () => {
    router.push('/');
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = userInfo;

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
      <Main>
        {messages && messages.map((msg) => <ChatMessage key={uuidv4()} message={msg} />)}
        <span ref={dummy}></span>
      </Main>

      <RoomList></RoomList>
      <InputChat>
        <form onSubmit={sendMessage}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder='say something nice'
          />

          <button type='submit' disabled={!formValue}>
            🕊️
          </button>
        </form>
      </InputChat>
    </Wrapper>
  );
};

export default ChatRoom;

const Wrapper = tw.div`flex`;

const Main = tw.div``;

const RoomList = tw.div`flex-1`;

const Chats = tw.div`flex-1`;

const InputChat = tw.div`flex-1`;
