import PropTypes from 'prop-types';
import React from 'react';

export default function RecipeDetail({ recipeDetail, id, pathname }) {
  return (
    <div>
      <div>RecipeDetails</div>
      <img
        src={
          pathname === `/meals/${id}`
            ? recipeDetail.strMealThumb
            : recipeDetail.strDrinkThumb
        }
        data-testid="recipe-photo"
        alt="img-recipe"
      />
      <h2 data-testid="recipe-title">
        {pathname === `/meals/${id}`
          ? recipeDetail.strMeal
          : recipeDetail.strDrink}
      </h2>
      {pathname === `/meals/${id}` && (
        <h3 data-testid="recipe-category">{recipeDetail.strCategory}</h3>
      )}
      {pathname === `/drinks/${id}` && (
        <span data-testid="recipe-category">{recipeDetail.strAlcoholic}</span>
      )}
    </div>
  );
}

RecipeDetail.propTypes = {
  id: PropTypes.shape.isRequired,
  pathname: PropTypes.shape.isRequired,
  recipeDetail: PropTypes.shape.isRequired,
};
