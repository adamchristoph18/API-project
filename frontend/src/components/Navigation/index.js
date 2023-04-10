import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-bar'>
      <NavLink className='short-havens-title' exact to="/">Short Havens</NavLink>
        <div className='profile-options-container'>
          <div className='profile-nav'>
            {/* <a>
              <NavLink exact to="/">Home</NavLink>
            </a> */}
            {isLoaded && (
              <>
                <i className="fa-solid fa-bars icon icon-large clickable" />
                <a>
                  <ProfileButton user={sessionUser} />
                </a>
              </>
            )}
          </div>
          </div>
    </div>
  );
}

export default Navigation;
