import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default function DoneRecipes({ history }) {
  return (
    <div>
      <Header history={ history }>
        Done Recipes
      </Header>
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape.isRequired,
};
