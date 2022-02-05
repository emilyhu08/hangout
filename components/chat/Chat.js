import { auth, db } from 'firebase-config';
import {
  addDoc,
  collection,
  limit,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import tw from 'tailwind-styled-components';
import getRecipientEmail from 'utils/getRecipientEmail';
import { v4 as uuidv4 } from 'uuid';
import ChatMessage from './ChatMessage';
import Rooms from './Rooms';

const Chat = () => {
  const [user] = useAuthState(auth);
  const userChatRef = collection(db, 'chats');

  const queryEmail = user && query(userChatRef, where('users', 'array-contains', user.email));

  const [chatsSnapshot] = useCollection(queryEmail);

  const users = chatsSnapshot?.docs.map((chat) => chat.data().users);

  const recipientEmail = getRecipientEmail(users, user);

  const dummy = useRef();
  const messagesRef = collection(db, 'messages');
  const q =
    user &&
    recipientEmail &&
    query(
      messagesRef,
      // where('email', 'in', [user.email, recipientEmail]),
      orderBy('createdAt'),
      limit(25)
    );

  const [messages] = useCollectionData(q);

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL, email } = user;

    await addDoc(
      messagesRef,
      {
        text: formValue,
        createdAt: serverTimestamp(),
        email,
        uid,
        photoURL,
      },
      { merge: true }
    );

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
            placeholder='enter your message here'
          ></Input>
        </form>
      </Main>
    </Wrapper>
  );
};

export default Chat;

const Wrapper = tw.div`flex rounded-3xl`;

const SideBar = tw.div`flex-none flex-col p-5 w-80 bg-white rounded-3xl overflow-y-scroll`;

const Main = tw.div`ml-5 w-full rounded-3xl truncate `;

const Input = tw.input`h-40 p-10 w-full mt-5 rounded-3xl self-baseline bg-white hover:border-sky-500`;

const Chats = tw.div`h-80 p-10 rounded-3xl self-baseline bg-white overflow-y-scroll`;
