/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
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
      <Menu mode={props.mode}>
      <Menu.Item key="mail">
        <a href="/login">Signin</a>
      </Menu.Item>
      <Menu.Item key="app">
        <a href="/register">Signup</a>
      </Menu.Item>
    </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default RightMenu;

