import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function DoneRecipes({ history }) {
  const donesRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return (
    <div>
      <Header history={ history }>
        Done Recipes
      </Header>
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-meal-btn">
        Meals
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
      {donesRecipes?.map((recipe, index) => (
        <div key={ recipe.id }>
          <img
            src={ recipe.image }
            data-testid={ `${index}-horizontal-image` }
            alt="recipe"
          />
          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
          <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => {
              copy(window.location.href.replace('/in-progress', ''));
              setCopyLink(!copyLink);
            } }
          >
            <img src={ shareIcon } alt="share icon" />
          </button>
          <ul>
            {recipe?.tags.map((tagName) => (
              <li
                data-testid={ `${index}-${tagName}-horizontal-tag` }
                key={ tagName }
              >
                { tagName }
              </li>))}
          </ul>
        </div>
      ))}
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape.isRequired,
};
