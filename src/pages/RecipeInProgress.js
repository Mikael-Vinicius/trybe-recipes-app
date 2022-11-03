import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import finishRecipe from '../assets/finishRecipes';
import handleTask from '../assets/handleTask';
import verifyRecipes from '../assets/verifyRecipes';
import Alert from '../components/Alert';
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
        className='w-72 mx-auto mt-5 rounded-lg shadow-lg shadow-slate-500'
      />
      <h2 data-testid="recipe-title" className='text-3xl text-center text-orange-400'>
        {recipeDetail.strMeal ? recipeDetail.strMeal : recipeDetail.strDrink}
      </h2>
      <div onChange={ verifyCheckeds } className="flex flex-wrap mx-auto items-center justify-center">
        {ingredientsDetails?.map((e, i) => (
          <div key={ e.recipesProduct } className="form-control">
            <label
              htmlFor={ e.recipesProduct }
              data-testid={ `${i}-ingredient-step` }
              className={ `${verifyConditionClass(e.recipesProduct)} label cursor-pointer` }
            >
            <div className='flex justify-center items-center h-10'>
              <span className='label-text mx-2'>{e.recipesProduct}</span>
              <input
                data-testid={ `${i}-ingredient-name-and-measure` }
                type="checkbox"
                name={ e.recipesProduct }
                onChange={ (event) => handleTask(event, pathname, id) }
                defaultChecked={ verifyConditionChecked(e.recipesProduct) }
                id="inputs"
                className="checkbox checkbox-primary"
              />
            </div>
            </label>
          </div>
        ))}
      </div>
      <h3 data-testid="recipe-category" className='text-end mx-5 text-xl underline underline-offset-8'>
        {pathname === `/meals/${id}/in-progress`
          ? recipeDetail.strCategory
          : recipeDetail.strAlcoholic}
      </h3>
      <div className='mt-10'>
        <p className='text-center text-xl underline underline-offset-8'>Instructions</p>
        <div className='bg-slate-700 rounded-xl shadow-lg shadow-black w-80 mx-auto'>
        <p data-testid="instructions" className='mt-5 text-md mx-2 leading-7 py-2 text-white'>{recipeDetail.strInstructions}</p>
        </div>
      </div>
      <div className="mt-10">
      {copyLink && <Alert />}
      <div className='mt-5'>
        <Buttons favParams={ favParams } />
        </div>
        <div className="fixed bottom-0 flex justify-center items-center w-full my-2">
        <button
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ !buttonDisabled }
          onClick={ () => finishRecipe(history, recipeDetail, pathname, id) }
          className="btn btn-success w-80"
        >
          Finish Recipe
        </button>
        </div>
      </div>
    </div>
  );
}
RecipeInProgress.propTypes = {
  history: PropTypes.shape.isRequired,
  match: PropTypes.shape.isRequired,
};
