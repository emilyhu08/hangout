import { addOne, auth, db } from 'firebase-config';
import { collection, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Room from './Room';

const SideBar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = collection(db, 'chats');

  const queryEmail = user && query(userChatRef, where('users', 'array-contains', user.email));

  const [chatsSnapshot] = useCollection(queryEmail);

  const createChat = () => {
    const input = prompt('enter email');

    if (!input) return null;
    if (!chatAlreadyExists(input) && input !== user.email) {
      addOne('chats', {
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) => {
    chatsSnapshot?.docs.find((chat) =>
      chat.data().users.find((user) => {
        return (user === recipientEmail)?.length > 0;
      })
    );
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
