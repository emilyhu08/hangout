import { auth, db } from 'firebase-config';
import { collection, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import tw from 'tailwind-styled-components';
import getRecipientEmail from 'utils/getRecipientEmail';

const Room = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const userRef = collection(db, 'users');
  const queryUser = query(userRef, where('email', '==', getRecipientEmail(users, user)));
  const [recipientSnapshot] = useCollection(queryUser);

  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Wrapper onClick={enterChat}>
      <Avatar
        src={
          recipient?.photoURL ||
          'https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'
        }
        alt='avatar'
      ></Avatar>
      <Name>{recipient?.displayName}</Name>
    </Wrapper>
  );
};

export default Room;

const Wrapper = tw.div`flex items-center p-5 shadow-md mb-5 rounded-lg hover:shadow-lg hover:scale-105 cursor-pointer`;

const Name = tw.div`word-break`;

const Avatar = tw.img`flex w-8 h-8 rounded-full mr-3 cursor-pointer`;
