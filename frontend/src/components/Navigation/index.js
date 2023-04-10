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

        <div className='nav-bar-right'>

          <NavLink className='create-new-spot' to="/">Create a New Spot</NavLink>
          <div className='profile-options-container'>
            <div className='profile-nav'>
              {isLoaded && (
                <>
                  <i className="fa-solid fa-bars icon icon-large clickable" />
                  <a href=''>
                    <ProfileButton user={sessionUser} />
                  </a>
                </>
              )}
            </div>
          </div>


        </div>

    </div>
  );
}

export default Navigation;
