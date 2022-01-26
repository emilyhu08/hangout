import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Tooltip } from 'antd';
import tw from 'tailwind-styled-components';

export default function AvatarGroup({ activity }) {
  return (
    <Wrapper>
      <Avatar.Group
        maxCount={2}
        maxStyle={{
          color: '#f56a00',
          backgroundColor: '#fde3cf',
        }}>
        <Avatar
          src={
            (activity && activity.userAvatarUrl) ||
            'https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max'
          }
          alt='avatar'
        />
        <Avatar
          style={{
            backgroundColor: '#f56a00',
          }}>
          K
        </Avatar>
        <Tooltip title='Ant User' placement='top'>
          <Avatar
            style={{
              backgroundColor: '#87d068',
            }}
            icon={<UserOutlined />}
          />
        </Tooltip>
        <Avatar
          style={{
            backgroundColor: '#1890ff',
          }}
          icon={<AntDesignOutlined />}
        />
      </Avatar.Group>
    </Wrapper>
  );
}

const Wrapper = tw.div`saturate-100`;
