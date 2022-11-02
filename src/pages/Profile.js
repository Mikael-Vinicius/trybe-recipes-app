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
      <span data-testid="profile-email">{user ? user.email : ''}</span>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        onClick={ () => history.push('/favorite-recipes') }
        data-testid="profile-favorite-btn"
        type="button"
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ logoutFunction }
      >
        Logout
      </button>
      <Footer history={ history } />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape.isRequired,
};
