import { auth, db } from 'firebase-config';
import { addDoc, collection, limit, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
import { useStateValue } from 'store/StateProvider';
import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';

const ChatRoom = () => {
  const [{ userInfo }, dispatch] = useStateValue();
  const router = useRouter();
  const dummy = useRef();
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, orderBy('createdAt'), limit(25));

  const [messages] = useCollectionData(q, { idField: 'id' });

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
      <main>
        {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </main>

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
    </Wrapper>
  );
};

export default ChatRoom;

const Wrapper = tw.div`flex`;

const RoomList = tw.div``;

const Chats = tw.div``;

const InputChat = tw.div``;
