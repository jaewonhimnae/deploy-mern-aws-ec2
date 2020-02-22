import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

function LeftMenu() {
  return (
    <Menu>
      <Menu.Item key="home">
        <Link to="/">Main</Link>
      </Menu.Item>
    </Menu>
  )
}

export default LeftMenu