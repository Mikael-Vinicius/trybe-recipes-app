import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default function Drinks({ history }) {
  return (
    <div>
      <Header history={ history }>
        Drinks
      </Header>
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape.isRequired,
};
