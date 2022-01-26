import ChatRoom from 'components/chat/ChatRoom';
import { v4 as uuidv4 } from 'uuid';
import Rooms from 'components/chat/Rooms';

const index = () => {
  return <Rooms key={uuidv4()} />;
};

export default index;
