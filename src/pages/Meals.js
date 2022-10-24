import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default function Meals({ history }) {
  return (
    <div>
      <Header history={ history }>
        Meals
      </Header>
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape.isRequired,
};
