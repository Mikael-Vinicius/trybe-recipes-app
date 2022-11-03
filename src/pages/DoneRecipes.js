import React, { useContext, useState } from 'react';
import Alert from "../components/Alert";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare } from '@fortawesome/free-solid-svg-icons';
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
    <div className='mb-5'>
      <Header history={ history }>Done Recipes</Header>
      <div className="bg-slate-700 mt-8 w-5/6 mx-auto rounded-lg shadow-lg shadow-black">
      <div className="flex flex-wrap gap-2 justify-center p-3">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => {
          setDrinksFilter(false);
          setMealsFilter(false);
        } }
        className="btn btn-outline btn-accent btn-xs"
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
        className="btn btn-xs btn-outline"
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
        className="btn btn-xs btn-outline"
      >
        Drinks
      </button>
      </div>
      </div>
      <div className='flex flex-col items-center justify-center mt-10'>
      {recipeFilter(verifyCondition())?.map((recipe, index) => (
        <div key={ recipe.id } className="text-center mb-5">
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
              className='w-80 rounded-xl shadow-lg shadow-black'
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` } className="text-2xl">
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
            <p data-testid={ `${index}-horizontal-name` } className="text-4xl text-orange-300">{recipe.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-done-date` } className="text-slate-200">{recipe.doneDate}</p>
          {copyLink && <Alert />}
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            className="mt-5"
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
            <FontAwesomeIcon icon={faShare} className="text-3xl" />
          </button>
          <ul className='mt-3'>
            {recipe?.tags.map((tagName) => (
              <li
                data-testid={ `${index}-${tagName}-horizontal-tag` }
                key={ tagName }
                className="text-sm text-red-400"
              >
                {tagName}
              </li>
            ))}
          </ul>
        </div>
      ))}
      </div>
    </div>
  );
}

DoneRecipes.propTypes = {
  history: PropTypes.shape.isRequired,
};
