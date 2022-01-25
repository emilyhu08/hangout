import { Badge, Descriptions } from 'antd';
import { doc } from 'firebase/firestore';
import { db } from 'firebase-config';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';

const Profile = () => {
  const router = useRouter();
  const path = router.asPath.split('/');
  const id = path[path.length - 1];
  const [user, loading, error, snapshot] = useDocumentData(doc(db, 'users', id));
  const userName = user?.name.split(' ');

  return (
    <>
      <Descriptions layout='vertical' bordered>
        <Descriptions.Item label='First Name'>{user && userName[0]}</Descriptions.Item>
        <Descriptions.Item label='Last Name'>{user && userName[1]}</Descriptions.Item>
        <Descriptions.Item label='Email'>{user && user.email}</Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default Profile;
