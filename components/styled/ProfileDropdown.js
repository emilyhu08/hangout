import { Button, Dropdown, Menu, Space } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import './index.css';

const menu = (
  <Menu>
    <Menu.Item>
      <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
        Profile
      </a>
    </Menu.Item>
    <Menu.Item>
      <button target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
        Sign Out
      </button>
    </Menu.Item>
  </Menu>
);

const ProfileDropdown = () => {
  return (
    <>
      <Space direction='vertical'>
        <Space wrap>
          <Dropdown overlay={menu} placement='bottomCenter'>
            <Button>bottomCenter</Button>
          </Dropdown>
        </Space>
      </Space>
    </>
  );
};
