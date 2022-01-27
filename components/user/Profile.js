import { Descriptions } from 'antd';
import { db } from 'firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Profile = () => {
  const router = useRouter();
  const id = router.query.id;
  const userRef = id && doc(db, 'users', id);

  const [user, setUser] = useState();

  useEffect(() => {
    userRef &&
      getDoc(userRef).then((user) => {
        if (user.exists()) {
          setUser(user.data());
        }
      });
  }, [id]);

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
