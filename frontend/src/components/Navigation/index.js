import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-bar'>
      <h1 className='short-havens-title'>Short Havens</h1>
        <ul>
          <li>
            <NavLink exact to="/">Home</NavLink>
          </li>
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </ul>
    </div>
  );
}

export default Navigation;
