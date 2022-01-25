import ChatRoom from 'components/chat/ChatRoom';
import { v4 as uuidv4 } from 'uuid';

const index = () => {
  return <ChatRoom key={uuidv4()} />;
};

export default index;
