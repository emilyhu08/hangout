import { Menu, Dropdown, Avatar, message } from 'antd';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';

const ProfileDropdown = ({ user, auth }) => {
  const router = useRouter();
  const handleRedirect = () => {
    if (user) router.push('/chat/0');
    else router.push('/login');
  };

  const handleProfile = () => {
    router.push('/user/' + user.uid);
  };

  const handleSignOut = () => {
    message.success('Signed Out!');
    signOut(auth);
    router.push('/');
  };

  const menu = (
    <Menu>
      <Menu.Item key='1' onClick={handleProfile}>
        Profile
      </Menu.Item>
      <Menu.Item key='2' onClick={handleRedirect}>
        Messages
      </Menu.Item>
      <Menu.Item key='3' onClick={handleSignOut}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu}>
        <Avatar
          src={
            user?.photoURL ||
            'https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'
          }
          alt='avatar'
          className='cursor-pointer'
        />
      </Dropdown>
    </div>
  );
};

export default ProfileDropdown;
