import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import finishRecipe from '../assets/finishRecipes';
import handleTask from '../assets/handleTask';
import verifyRecipes from '../assets/verifyRecipes';
import Buttons from '../components/Buttons';
import AppContext from '../context/AppContext';

export default function RecipeInProgress({ match, history }) {
  const {
    recipeDetail,
    ingredientsDetails,
    favoriteR,
    setFavoriteRecipe,
    setRecipeDetail,
    setIngredientsDetails,
    setMeasureDetails,
    copyLink,
  } = useContext(AppContext);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const {
    params: { id },
  } = match;
  const {
    location: { pathname },
  } = history;

  const favParams = {
    pathname,
    id,
    recipeDetail,
    favoriteR,
    setFavoriteRecipe,
  };

  const getFavorite = () => {
    const favoritesStorage = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    if (favoritesStorage) {
      setFavoriteRecipe(favoritesStorage.some((e) => e.id === id));
    }
  };

  const requestDetails = async () => {
    let endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    if (pathname === `/drinks/${id}/in-progress`) {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const request = await fetch(endpoint);
    const result = await request.json();
    const product = pathname === `/meals/${id}/in-progress`
      ? result.meals[0]
      : result.drinks[0];
    setRecipeDetail(product);
    const filteredIngredients = Object
      .keys(product).filter((e) => e.includes('strIngredient'));
    const filteredMeasures = Object.keys(product).filter((e) => e.includes('strMeasure'));
    const objIngredients = [];
    const objMeasures = [];
    filteredIngredients.forEach((e) => {
      if (product[e] && product[e].length > 1) {
        const recipesProduct = product[e];
        const obj = {
          recipesProduct,
        };
        objIngredients.push(obj);
      }
    });
    filteredMeasures.forEach((e) => {
      if (product[e] && product[e].length > 1) {
        const recipesMeasure = product[e];
        const obj = {
          recipesMeasure,
        };
        objMeasures.push(obj);
      }
    });
    setIngredientsDetails(objIngredients);
    setMeasureDetails(objMeasures);
  };

  const handleStorage = () => {
    const mealsIds = JSON.parse(localStorage.getItem('mealsIds'));
    const drinksIds = JSON.parse(localStorage.getItem('drinksIds'));
    if (pathname === `/meals/${id}/in-progress` && !mealsIds) {
      localStorage.setItem('mealsIds', JSON.stringify([id]));
    }
    if (pathname === `/drinks/${id}/in-progress` && !drinksIds) {
      localStorage.setItem('drinksIds', JSON.stringify([id]));
    }
    if (pathname === `/drinks/${id}/in-progress` && drinksIds) {
      const allDrinksIds = [...drinksIds, id];
      localStorage.setItem('drinksIds', JSON.stringify(allDrinksIds));
    } else if (pathname === `/meals/${id}/in-progress` && mealsIds) {
      const allMealsIds = [...mealsIds, id];
      localStorage.setItem('mealsIds', JSON.stringify(allMealsIds));
    }
  };

  const setStorage = () => {
    const mealsIds = JSON.parse(localStorage.getItem('mealsIds'));
    const drinksIds = JSON.parse(localStorage.getItem('drinksIds'));
    const inProgressRecipes = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    const obj = { drinks: {}, meals: {} };
    if (!inProgressRecipes) {
      if (pathname === `/meals/${id}/in-progress`) {
        mealsIds.forEach((e) => {
          obj.meals[e] = [];
        });
      }
      if (pathname === `/drinks/${id}/in-progress`) {
        drinksIds.forEach((e) => {
          obj.drinks[e] = [];
        });
      }
    }
    if (inProgressRecipes) {
      return verifyRecipes(inProgressRecipes, pathname, id);
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  };

  const verifyCheckeds = () => {
    const inputs = document.querySelectorAll('#inputs');
    if (inputs.length > 0) {
      const result = [];
      inputs.forEach((e) => {
        result.push(e.checked);
      });
      setButtonDisabled(result.every((e) => e === true));
    }
  };

  useEffect(() => {
    handleStorage();
    setStorage();
    verifyCheckeds();
    requestDetails();
    getFavorite();
  }, []);

  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );

  const verifyConditionClass = (value) => {
    if (
      pathname === `/meals/${id}/in-progress`
      && inProgressRecipes
    ) {
      return inProgressRecipes.meals[id]?.some((el) => el === value)
        ? 'done'
        : '';
    }
    if (
      pathname === `/drinks/${id}/in-progress`
      && inProgressRecipes
    ) {
      return inProgressRecipes.drinks[id]?.some((el) => el === value)
        ? 'done'
        : '';
    }
  };

  const verifyConditionChecked = (value) => {
    if (
      pathname === `/meals/${id}/in-progress`
      && inProgressRecipes && inProgressRecipes.meals[id]
    ) {
      return inProgressRecipes.meals[id]?.some((el) => el === value);
    }
    if (
      pathname === `/drinks/${id}/in-progress`
      && inProgressRecipes && inProgressRecipes.drinks[id]
    ) {
      return inProgressRecipes.drinks[id]?.some((el) => el === value);
    }
  };

  return (
    <div>
      <img
        data-testid="recipe-photo"
        src={
          recipeDetail.strMealThumb
            ? recipeDetail.strMealThumb
            : recipeDetail.strDrinkThumb
        }
        alt="img-thumb"
      />
      <h2 data-testid="recipe-title">
        {recipeDetail.strMeal ? recipeDetail.strMeal : recipeDetail.strDrink}
      </h2>
      <div onChange={ verifyCheckeds }>
        {ingredientsDetails?.map((e, i) => (
          <div key={ e.recipesProduct }>
            <label
              htmlFor={ e.recipesProduct }
              data-testid={ `${i}-ingredient-step` }
              className={ verifyConditionClass(e.recipesProduct) }
            >
              <input
                data-testid={ `${i}-ingredient-name-and-measure` }
                type="checkbox"
                name={ e.recipesProduct }
                onChange={ (event) => handleTask(event, pathname, id) }
                defaultChecked={ verifyConditionChecked(e.recipesProduct) }
                id="inputs"
              />
              {e.recipesProduct}
            </label>
          </div>
        ))}
      </div>
      <h3 data-testid="recipe-category">
        {pathname === `/meals/${id}/in-progress`
          ? recipeDetail.strCategory
          : recipeDetail.strAlcoholic}
      </h3>
      {copyLink && <div>Link copied!</div>}
      <div>
        <p>Instructions</p>
        <p data-testid="instructions">{recipeDetail.strInstructions}</p>
      </div>
      <div className="buttonsDiv">
        <Buttons favParams={ favParams } />
        <button
          data-testid="finish-recipe-btn"
          type="button"
          className="start"
          disabled={ !buttonDisabled }
          onClick={ () => finishRecipe(history, recipeDetail, pathname, id) }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}
RecipeInProgress.propTypes = {
  history: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
};
