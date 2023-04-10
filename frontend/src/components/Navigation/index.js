import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import ProfileButton from './ProfileButton';
import './Navigation.css';



function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-bar'>
      <NavLink className='short-havens-title' exact to="/">Short Havens</NavLink>

        <div className='nav-bar-right'>
          {sessionUser && sessionUser.firstName !== 'Demo' ? // only render the 'Create a New Spot' if there is a current user
            <NavLink
              className='create-new-spot'
              to="/"
            >Create a New Spot</NavLink>
          : null}

          <div className='profile-options-container'>
            <div className='profile-nav'>
              {isLoaded && (
                <>
                  <i className="fa-solid fa-bars icon icon-large clickable" />
                  <span>
                    <ProfileButton user={sessionUser} />
                  </span>
                </>
              )}
            </div>
          </div>


        </div>

    </div>
  );
}

export default Navigation;
