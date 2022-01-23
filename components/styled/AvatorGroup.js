import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import tw from 'tailwind-styled-components';

export default function AvatarGroup({ activity }) {
  const randomColor = () => {
    return Math.floor(Math.random() * 255);
  };

  return (
    <Wrapper>
      <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
        <Avatar src={activity.user?.photoUrl} alt={activity.user?.name[0]} />
        <Avatar
          style={{ backgroundColor: `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})` }}>
          {activity.user?.name[0]}
        </Avatar>
        <Tooltip title='Ant User' placement='top'>
          <Avatar
            style={{ backgroundColor: `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})` }}
            icon={<UserOutlined />}
          />
        </Tooltip>
        <Avatar
          style={{ backgroundColor: `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})` }}
          icon={<AntDesignOutlined />}
        />
      </Avatar.Group>
    </Wrapper>
  );
}

const Wrapper = tw.div`saturate-100`;
