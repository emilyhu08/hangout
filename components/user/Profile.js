import { Descriptions } from 'antd';
import { db } from 'firebase-config';
import { collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Profile = () => {
  const router = useRouter();
  const id = router.query.id;
  const userRef = collection(db, 'users');
  const [users] = useCollectionData(userRef);
  const user =
    users &&
    users.find((user) => {
      return user.uid === id;
    });

  const userName = user?.displayName.split(' ');

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
