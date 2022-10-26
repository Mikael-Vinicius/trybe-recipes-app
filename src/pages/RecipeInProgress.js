import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import AppContext from '../context/AppContext';

export default function RecipeInProgress({ match, history }) {
  const { idsForDrinks, idsForMeals } = useContext(AppContext);
  const { params: { id } } = match;
  const { location: { pathname } } = history;
  useEffect(() => {
    const setStorage = () => {
      const obj = {
        drinks: {},
        meals: {},
      };
      if (pathname === `/meals/${id}/in-progress`) {
        idsForMeals.forEach((e) => {
          obj.meals[e] = [];
        });
      }
      if (pathname === `/drinks/${id}/in-progress`) {
        idsForDrinks.forEach((e) => {
          obj.drinks[e] = [];
        });
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    };
    setStorage();
  }, []);
  // const recipeProgress = {}
  return (
    <div />
  );
}

RecipeInProgress.propTypes = {
  history: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
};
