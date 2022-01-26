import { addOne, auth, db } from 'firebase-config';
import { collection, query, where, getDoc, doc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';
import Room from './Room';
import { useEffect } from 'react';

const SideBar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userChatRef = collection(db, 'chats');

  const queryEmail =
    user && query(userChatRef, where('users', 'array-contains', auth.currentUser.email));

  const recipientId = router.query.id;

  const recipientRef = recipientId && doc(db, 'users', recipientId);

  // const recipientSnap =
  //   recipientRef &&
  //   getDoc(recipientRef).then((snap) => {
  //     if (snap.exists()) {
  //       return snap.data().email;
  //     }
  //   });

  const [chatsSnapshot] = useCollection(queryEmail);

  useEffect(() => {
    recipientRef &&
      getDoc(recipientRef).then((snap) => {
        if (snap.exists()) {
          let recipientEmail = snap.data().email;

          console.log(!chatAlreadyExists(recipientEmail));

          if (
            !chatAlreadyExists(recipientEmail) &&
            recipientEmail &&
            recipientEmail !== auth.currentUser.email
          ) {
            console.log('added');
            addOne('chats', {
              users: [auth.currentUser.email, recipientEmail],
            });
          }
        }
      });
  }, [recipientId]);

  const createChat = () => {
    const input = prompt('enter email');

    if (!input) return null;
    if (!chatAlreadyExists(input) && input !== user.email) {
      addOne('chats', {
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (email) =>
    !!email &&
    chatsSnapshot?.docs.find(
      (chat) => chat.data().users.find((user) => user === email)?.length > 0
    );

  return (
    <>
      <>
        <button>Start Chat</button>
      </>
      {chatsSnapshot?.docs.map((chat) => {
        return <Room key={chat.id} id={chat.id} users={chat.data().users} />;
      })}
    </>
  );
};

export default SideBar;
