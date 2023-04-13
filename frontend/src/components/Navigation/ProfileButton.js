import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <i onClick={openMenu} className="fas fa-user-circle icon icon-large clickable" />
      <div className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="user-menu">
            <span className="greeting">Hello, {user.firstName}!</span>
            <span>{user.email}</span>
            <span
              className="manage-spots clickable"
              onClick={(e) => {
                history.push("/spots/current")
                closeMenu();
              }}
            >Manage Spots</span>
            <span
              className="manage-reviews clickable"
              onClick={(e) => {
                history.push("/reviews/current")
                closeMenu();
              }}
            >Manage Reviews</span>
            <span className="log-out clickable" onClick={logout}>
              Log Out
            </span>
          </div>
        ) : (
          <div className="non-user-menu">
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
