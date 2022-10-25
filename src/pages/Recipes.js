import PropTypes from 'prop-types';
import React from 'react';
import Drinks from './Drinks';
import Meals from './Meals';

export default function Recipes({ history }) {
  return (
    <div>
      {history.location.pathname === '/meals'
        ? <Meals history={ history } />
        : <Drinks history={ history } />}
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape.isRequired,
};
