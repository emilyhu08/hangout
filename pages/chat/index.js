import ChatRoom from 'components/chat/ChatRoom';
import { v4 as uuidv4 } from 'uuid';
import Room from 'components/chat/Room';

const index = () => {
  return <Room key={uuidv4()} />;
};

export default index;
