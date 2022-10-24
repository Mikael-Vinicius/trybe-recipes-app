import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';

export default function FavoriteRecipes({ history }) {
  return (
    <div>
      <Header history={ history }>
        Favorite Recipes
      </Header>
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape.isRequired,
};
