import React, { useState, useEffect } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.css';
import useReactRouter from 'use-react-router';


import {
  BarsOutlined
} from '@ant-design/icons';


function NavBar() {
  const [visible, setVisible] = useState(false)
  const { location } = useReactRouter();
  const { pathname } = location
  // const [NavVisible, setNavVisible] = useState(true)
  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 5, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">Starter</a>
      </div>
      <div className="menu__container">
        <div className="menu_left">
          <LeftMenu mode="horizontal" pathname={pathname} />
        </div>
        <div className="menu_rigth">
          <RightMenu mode="horizontal" pathname={pathname} />
        </div>
        <Button
          className="menu__mobile-button"
          onClick={showDrawer}
        >
          <BarsOutlined />
        </Button>
        <Drawer
          title="Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  )

}

export default NavBar