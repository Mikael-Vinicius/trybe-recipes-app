import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile({ history }) {
  const user = JSON.parse(localStorage.getItem('user'));

  const logoutFunction = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header history={ history }>Profile</Header>
      <span data-testid="profile-email" className='text-xl m-1'>{user ? user.email : ''}</span>
      <div className='flex flex-col gap-32 mt-16 mx-2'>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
        className="btn btn-outline btn-primary"
      >
        Done Recipes
      </button>
      <button
        onClick={ () => history.push('/favorite-recipes') }
        data-testid="profile-favorite-btn"
        type="button"
        className="btn btn-outline btn-primary"
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ logoutFunction }
        className="btn btn-outline btn-primary"
      >
        Logout
      </button>
      </div>
      <Footer history={ history } />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape.isRequired,
};
