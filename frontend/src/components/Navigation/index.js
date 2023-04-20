import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';



function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav-bar'>
      <div>
        <NavLink className='short-havens-title' exact to="/">Short Havens</NavLink>
        <img
          className='site-logo'
          src="./apple-touch-icon.png"
          alt='short-havens-logo'/>
      </div>

        <div className='nav-bar-right'>
          {sessionUser ? // only render the 'Create a New Spot' if there is a current user
            <NavLink
              className='create-new-spot'
              to="/spots/new"
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
