import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Alert from '../components/Alert';
import { faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const copy = require('clipboard-copy');

export default function FavoriteRecipes({ history }) {
  const { copyLink, setCopyLink } = useContext(AppContext);
  const [mealsFilter, setMealsFilter] = useState(false);
  const [drinksFilter, setDrinksFilter] = useState(false);
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

  const filterFavorites = (type) => {
    if (type === 'meal') {
      const recipesFilters = favoriteRecipes.filter(
        (recipe) => recipe.type === type,
      );
      return recipesFilters;
    }
    if (type === 'drink') {
      const recipesFilters = favoriteRecipes.filter(
        (recipe) => recipe.type === type,
      );
      return recipesFilters;
    }
    return favoriteRecipes;
  };

  const verifyCondition = () => {
    if (mealsFilter) {
      return 'meal';
    }
    if (drinksFilter) {
      return 'drink';
    }
  };

  return (
    <div className='mb-5'>
      <Header history={ history }>
        Favorite Recipes
      </Header>
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
      {filterFavorites(verifyCondition())?.map((recipe, index) => (
        <div key={ recipe.id } className="text-center mt-5">
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
          {copyLink && <Alert />}
          <div className='flex gap-5 justify-center mt-5'>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
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
            <FontAwesomeIcon icon={faShare} className="text-3xl" />
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => unFavoriteRecipe(recipe.id) }
          >
            <FontAwesomeIcon icon={faHeart} className="text-red-600 text-3xl" />
          </button>
        </div>
      </div>
      ))}
      </div>
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape.isRequired,
};
