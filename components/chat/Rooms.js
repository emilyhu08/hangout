import { addOne, auth, db } from 'firebase-config';
import { collection, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import tw from 'tailwind-styled-components';
import Room from './Room';

const Rooms = () => {
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
      <Wrapper>
        <SideBar>
          {chatsSnapshot?.docs.map((chat) => {
            return <Room key={chat.id} id={chat.id} users={chat.data().users} />;
          })}
        </SideBar>
        <Main>
          <Chats>
            <button onClick={createChat}>Start Chat</button>
            <h1>HIIIIIII</h1>
          </Chats>
          <Input placeholder='enter your message here'></Input>
        </Main>
      </Wrapper>
    </>
  );
};

export default Rooms;

const Wrapper = tw.div`flex rounded-3xl`;

const SideBar = tw.div`flex-nowrap flex-col p-5 w-80 bg-white rounded-3xl`;

const Main = tw.div`ml-5 w-full rounded-3xl`;

const Input = tw.input`h-40 p-10 w-full mt-5 rounded-3xl self-baseline bg-white`;

const Chats = tw.div`h-80 p-10 rounded-3xl self-baseline bg-white`;
