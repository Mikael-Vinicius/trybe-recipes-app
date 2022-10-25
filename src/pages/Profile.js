import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile({ history }) {
  return (
    <div>
      <Header history={ history }>
        Profile
      </Header>
      <Footer history={ history } />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape.isRequired,
};
