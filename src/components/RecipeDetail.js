import PropTypes from 'prop-types';
import React from 'react';

export default function RecipeDetail({ recipeDetail, id, pathname }) {
  return (
    <div>
      <img
        src={
          pathname === `/meals/${id}`
            ? recipeDetail.strMealThumb
            : recipeDetail.strDrinkThumb
        }
        data-testid="recipe-photo"
        alt="img-recipe"
        className='w-72 mx-auto mt-5 rounded-lg shadow-lg shadow-slate-500'
      />
      <h2 data-testid="recipe-title" className='text-3xl text-center text-orange-400'>
        {pathname === `/meals/${id}`
          ? recipeDetail.strMeal
          : recipeDetail.strDrink}
      </h2>
      {pathname === `/meals/${id}` && (
        <h3 data-testid="recipe-category" className='text-end mx-5 text-xl underline underline-offset-8'>{recipeDetail.strCategory}</h3>
      )}
      {pathname === `/drinks/${id}` && (
        <span data-testid="recipe-category" className='text-end mx-5 text-xl underline underline-offset-8'>{recipeDetail.strAlcoholic}</span>
      )}
    </div>
  );
}

RecipeDetail.propTypes = {
  id: PropTypes.shape.isRequired,
  pathname: PropTypes.shape.isRequired,
  recipeDetail: PropTypes.shape.isRequired,
};
