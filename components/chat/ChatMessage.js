import { auth } from 'firebase-config';
import tw from 'tailwind-styled-components';

const ChatMessage = ({ message }) => {
  const { text, uid, photoURL } = message;

  const messageClass =
    auth.currentUser?.uid && (uid === auth.currentUser.uid ? 'sent' : 'received');

  return (
    <Wrapper>
      <div className={`message ${messageClass}`}>
        <Avatar
          src={photoURL || 'https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'}
          alt='alt'
        />
        <p>{text}</p>
      </div>
    </Wrapper>
  );
};

export default ChatMessage;

const Wrapper = tw.div`flex`;

const Avatar = tw.img`flex w-8 h-8 rounded-full`;
