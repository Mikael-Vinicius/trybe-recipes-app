import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function FavoriteRecipes({ history }) {
  const { copyLink, setCopyLink } = useContext(AppContext);
  const [favoriteRecipes,
    setFavoritesRecipes] = useState(JSON.parse(localStorage.getItem('favoriteRecipes')));

  const unFavoriteRecipe = (id) => {
    const favoritesStorage = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    if (favoritesStorage.some((e) => e.id === id)) {
      const removedItems = favoritesStorage.filter((e) => e.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(removedItems));
      setFavoritesRecipes(removedItems);
    }
  };
  useEffect(() => {}, [favoriteRecipes]);

  return (
    <div>
      <Header history={ history }>
        Favorite Recipes
      </Header>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {favoriteRecipes?.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            src={ recipe.image }
            data-testid={ `${index}-horizontal-image` }
            alt="recipe"
            width="250px"
          />
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.alcoholicOrNot}`}
          </p>
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          {copyLink && <div>Link copied!</div>}
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => {
              copy(
                window.location.href.replace(
                  '/favorite-recipes',
                  recipe.type === 'meal'
                    ? `/meals/${recipe.id}`
                    : `/drinks/${recipe.id}`,
                ),
              );
              setCopyLink(!copyLink);
            } }
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            onClick={ () => unFavoriteRecipe(recipe.id) }
          >
            <img src={ blackHeartIcon } alt="Black Heart Icon" />
          </button>
        </div>
      ))}
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape.isRequired,
};
