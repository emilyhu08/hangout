import { auth } from 'firebase-config';
import tw from 'tailwind-styled-components';

const ChatMessage = ({ message }) => {
  const { text, uid, photoURL, email } = message;

  const messageClass =
    auth.currentUser?.uid && (uid === auth.currentUser.uid ? 'sent' : 'received');

  return (
    <Wrapper>
      <Avatar
        src={photoURL || 'https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'}
        alt='avatar'></Avatar>
      <p>{text}</p>
    </Wrapper>
  );
};

export default ChatMessage;

const Wrapper = tw.div`flex items-center p-2 shadow-md mb-2 rounded-lg `;

const Name = tw.div`flex-none truncate`;

const Avatar = tw.img`flex-none w-8 h-8 rounded-full mr-3 cursor-pointer `;
