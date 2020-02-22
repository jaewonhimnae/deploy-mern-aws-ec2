/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Tooltip } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from '../../../../_actions/user_actions';

function RightMenu(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  const logoutHandler = () => {

    dispatch(logoutUser())
      .then(response => {
        if (response.payload.success) {
          window.location.reload();
        } else {
          alert('Failed to log out')
        }
      })
  };
  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu
      >
        <Menu.Item key="login" style={{ maxWidth: '120px' }}>
          <Tooltip title="Sign In">
            <a href="/login">Log in</a>
          </Tooltip>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <>
        <Menu
        >
          <Menu.Item key="logout">
            <Tooltip title="Log Out">
              <a onClick={logoutHandler}> Log Out</a>
            </Tooltip>
          </Menu.Item>
        </Menu>
      </>
    )
  }
}

export default RightMenu;

