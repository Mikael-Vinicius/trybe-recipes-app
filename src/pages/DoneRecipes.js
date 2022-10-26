import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import AppContext from '../context/AppContext';

const copy = require('clipboard-copy');

export default function DoneRecipes({ history }) {
  const { copyLink, setCopyLink } = useContext(AppContext);
  const [mealsFilter, setMealsFilter] = useState(false);
  const [drinksFilter, setDrinksFilter] = useState(false);

  const verifyCondition = () => {
    if (mealsFilter) {
      return 'meal';
    }
    if (drinksFilter) {
      return 'drink';
    }
  };

  const recipeFilter = (type) => {
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (type === 'meal') {
      const recipesFilters = allRecipes.filter(
        (recipe) => recipe.type === type,
      );
      return recipesFilters;
    }
    if (type === 'drink') {
      const recipesFilters = allRecipes.filter(
        (recipe) => recipe.type === type,
      );
      return recipesFilters;
    }
    return allRecipes;
  };
  return (
    <div>
      <Header history={ history }>Done Recipes</Header>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => {
          setDrinksFilter(false);
          setMealsFilter(false);
        } }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => {
          setMealsFilter(!mealsFilter);
          setDrinksFilter(false);
        } }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => {
          setDrinksFilter(!drinksFilter);
          setMealsFilter(false);
        } }
      >
        Drinks
      </button>

      {recipeFilter(verifyCondition())?.map((recipe, index) => (
        <div key={ recipe.id }>
          <Link
            to={
              recipe.type === 'meal'
                ? `/meals/${recipe.id}`
                : `/drinks/${recipe.id}`
            }
          >
            <img
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
              alt="recipe"
              width="250px"
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.alcoholicOrNot}`}
          </p>
          <Link
            to={
              recipe.type === 'meal'
                ? `/meals/${recipe.id}`
                : `/drinks/${recipe.id}`
            }
          >
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          {copyLink && <div>Link copied!</div>}
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            onClick={ () => {
              copy(
                window.location.href.replace(
                  '/done-recipes',
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
          <ul>
            {recipe?.tags.map((tagName) => (
              <li
                data-testid={ `${index}-${tagName}-horizontal-tag` }
                key={ tagName }
              >
                {tagName}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape.isRequired,
};
