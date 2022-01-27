import { auth } from 'firebase-config';
import { useRouter } from 'next/router';
import tw from 'tailwind-styled-components';

const ChatMessage = ({ message }) => {
  const router = useRouter();
  const { text, uid, photoURL, email } = message;

  const handleProfile = () => {
    router.push('/user/' + uid);
  };

  return (
    auth.currentUser?.email &&
    (email === auth.currentUser.email ? (
      <div className='flex justify-end mb-3'>
        <Wrapper className='bg-lime-400'>
          <p>{text}</p>
        </Wrapper>
        <Avatar
          className='ml-3'
          onClick={handleProfile}
          src={photoURL || 'https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'}
          alt='avatar'></Avatar>
      </div>
    ) : (
      <div className='flex items-center mb-3'>
        <Avatar
          className='mr-3'
          onClick={handleProfile}
          src={photoURL || 'https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'}
          alt='avatar'></Avatar>
        <Wrapper>
          <p>{text}</p>
        </Wrapper>
      </div>
    ))
  );
};

export default ChatMessage;

const Wrapper = tw.div`inline-block items-center p-2 shadow-md rounded-lg `;

const Avatar = tw.img`flex-none w-8 h-8 rounded-full cursor-pointer `;
