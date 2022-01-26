import { v4 as uuidv4 } from 'uuid';
import Chat from 'components/chat/Chat';

const index = () => {
  return <Chat key={uuidv4()} />;
};

export default index;

// export async function getServerSideProps(context) {
//   const ref = collection(db, 'chats').doc(context.query.id);
//   const messagesRes = await ref.collection('messages').order('timestamp', 'asc').get();
// }
