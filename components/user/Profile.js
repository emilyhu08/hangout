import { Badge, Descriptions } from 'antd';
import { useStateValue } from 'store/StateProvider';

const Profile = () => {
  const [{ userInfo }, dispatch] = useStateValue();
  let name = userInfo.displayName.split(' ');

  return (
    <>
      <Descriptions layout='vertical' bordered>
        <Descriptions.Item label='First Name'>{name[0]}</Descriptions.Item>
        <Descriptions.Item label='Last Name'>{name[1]}</Descriptions.Item>
        <Descriptions.Item label='Email'>{auth.currentUser.email}</Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default Profile;
