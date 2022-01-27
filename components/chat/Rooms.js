import { addOne, auth, db } from 'firebase-config';
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Room from './Room';

const SideBar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userChatRef = collection(db, 'chats');

  const queryEmail =
    user && query(userChatRef, where('users', 'array-contains', auth.currentUser.email));

  const recipientId = router.query.id;

  const recipientRef = recipientId && doc(db, 'users', recipientId);

  const [chatsSnapshot] = useCollection(queryEmail);

  useEffect(() => {
    recipientRef &&
      getDoc(recipientRef).then((snap) => {
        if (snap.exists()) {
          let recipientEmail = snap.data().email;
          recipientEmail &&
            chatExists(recipientEmail).then((exist) => {
              console.log(exist);
              if (
                (exist === 0 || exist === undefined) &&
                recipientEmail !== auth.currentUser.email
              ) {
                addOne('chats', {
                  users: [auth.currentUser.email, recipientEmail],
                });
              }
            });
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

  const chatExists = async (email) => {
    let count = 0;

    let res = () => {
      chatsSnapshot?.docs.forEach((chat) => {
        chat.data().users.forEach((userEmail) => {
          if (userEmail === email) {
            count++;
          }
        });
      });
    };

    return count;
  };

  return (
    <>
      <>
        <button onClick={createChat}>Start Chat</button>
      </>
      {chatsSnapshot?.docs.map((chat) => {
        return <Room key={chat.id} id={chat.id} users={chat.data().users} />;
      })}
    </>
  );
};

export default SideBar;
