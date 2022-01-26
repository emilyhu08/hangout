import { auth, db, addOne } from 'firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import Chat from './Chat';
import tw from 'tailwind-styled-components';

const Room = () => {
  const [user] = useAuthState(auth);
  const userChatRef = collection(db, 'chats');

  const queryEmail = query(userChatRef, where('users', 'array-contains', user.email));

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
      <Wrapper>
        <Side>
          {chatsSnapshot?.docs.map((chat) => {
            return <Chat key={chat.id} id={chat.id} users={chat.data().users} />;
          })}
        </Side>
        <Main>
          <button onClick={createChat}>Start Chat</button>
        </Main>
      </Wrapper>
    </>
  );
};

export default Room;

const Wrapper = tw.div`flex`;

const Main = tw.div`flex-1`;

const Side = tw.div`flex-1`;
