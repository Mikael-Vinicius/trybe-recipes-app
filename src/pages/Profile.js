import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default function Profile({ history }) {
  return (
    <div>
      <Header history={ history }>
        Profile
      </Header>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape.isRequired,
};
