import { addOne, auth, db } from 'firebase-config';
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Room from './Room';
import { useStateValue } from '../../store/StateProvider';

const SideBar = () => {
  const [user] = useAuthState(auth);
  const [{ emailState }, dispatch] = useStateValue();
  const router = useRouter();
  const userChatRef = collection(db, 'chats');

  const queryEmail =
    user && query(userChatRef, where('users', 'array-contains', auth.currentUser.email));

  const recipientId = router.query.id;

  const recipientRef = recipientId && doc(db, 'users', recipientId);

  const [chatsSnapshot] = useCollection(queryEmail);

  const chatExists = (email) =>
    !!email &&
    chatsSnapshot?.docs.find(
      (chat) => chat.data().users.find((user) => user === email)?.length > 0
    );

  const addRoom = () => {
    if (emailState && !chatExists(emailState) && emailState !== auth.currentUser.email) {
      addOne('chats', {
        users: [auth.currentUser.email, emailState],
      });
      dispatch({
        type: 'ADD_TO_EMAIL',
        item: null,
      });
    }
  };

  const createChat = () => {
    const input = prompt('enter email');
    if (!input) return null;
    if (!chatExists(input) && input !== auth.currentUser.email) {
      addOne('chats', {
        users: [auth.currentUser.email, input],
      });
    }
  };

  return (
    <>
      <>
        <button onClick={createChat}>Start Chat</button>
        <button onClick={addRoom}>Add Room</button>
      </>
      {chatsSnapshot?.docs.map((chat) => {
        return <Room key={chat.id} id={chat.id} users={chat.data().users} />;
      })}
    </>
  );
};

export default SideBar;
