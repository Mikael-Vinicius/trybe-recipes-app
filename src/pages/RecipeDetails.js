import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Carousel from '../components/Carousel';
import AppContext from '../context/AppContext';
import IngredientsAndMeasures from '../components/IngredientsAndMeasures';
import RecipeDetail from '../components/RecipeDetail';
import Buttons from '../components/Buttons';
import Alert from '../components/Alert';

export default function RecipeDetails({ history, match }) {
  const {
    setRecomendationsProducts,
    recipeDetail,
    setRecipeDetail,
    ingredientsDetails,
    setIngredientsDetails,
    measureDetails,
    setMeasureDetails,
    favoriteR,
    setFavoriteRecipe,
    copyLink,
    setCopyLink,
  } = useContext(AppContext);

  const {
    location: { pathname },
  } = history;
  const {
    params: { id },
  } = match;

  const favParams = {
    pathname,
    id,
    recipeDetail,
    favoriteR,
    setFavoriteRecipe,
  };

  const recomendationsFetch = async () => {
    let endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    if (pathname === `/drinks/${id}`) {
      endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    }
    const request = await fetch(endpoint);
    const response = await request.json();
    const product = pathname === `/drinks/${id}` ? response.meals : response.drinks;
    setRecomendationsProducts(product);
  };

  const requestDetails = async () => {
    let endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    if (pathname === `/drinks/${id}`) {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    }
    const request = await fetch(endpoint);
    const result = await request.json();
    const product = pathname === `/meals/${id}` ? result.meals[0] : result.drinks[0];
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

  const getFavorite = () => {
    const favoritesStorage = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    if (favoritesStorage) {
      setFavoriteRecipe(favoritesStorage.some((e) => e.id === id));
    }
  };

  useEffect(() => {
    requestDetails();
    recomendationsFetch();
    getFavorite();
  }, []);

  const handleStorage = () => {
    setCopyLink(false);
    const mealsIds = JSON.parse(localStorage.getItem('mealsIds'));
    const drinksIds = JSON.parse(localStorage.getItem('drinksIds'));
    if (pathname === `/meals/${id}` && !mealsIds) {
      localStorage.setItem('mealsIds', JSON.stringify([id]));
    }
    if (pathname === `/drinks/${id}` && !drinksIds) {
      localStorage.setItem('drinksIds', JSON.stringify([id]));
    }
    if (pathname === `/drinks/${id}` && drinksIds) {
      const allDrinksIds = [...drinksIds, id];
      localStorage.setItem('drinksIds', JSON.stringify(allDrinksIds));
    } else if (pathname === `/meals/${id}` && mealsIds) {
      const allMealsIds = [...mealsIds, id];
      localStorage.setItem('mealsIds', JSON.stringify(allMealsIds));
    }
    history.push(
      pathname === `/drinks/${id}`
        ? `/drinks/${id}/in-progress`
        : `/meals/${id}/in-progress`,
    );
  };

  const verifyConditions = () => {
    const idRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let keys = [];
    if (idRecipes && pathname === `/meals/${id}`) {
      keys = Object.keys(idRecipes.meals);
    }
    if (idRecipes && pathname === `/drinks/${id}`) {
      keys = Object.keys(idRecipes.drinks);
    }
    return keys.some((e) => e === id);
  };

  return (
    <div>
      <RecipeDetail pathname={ pathname } recipeDetail={ recipeDetail } id={ id } />
      <IngredientsAndMeasures
        ingredientsDetails={ ingredientsDetails }
        measureDetails={ measureDetails }
      />
      <div className='mt-10'>
        <p className='text-center text-xl underline underline-offset-8'>Instructions</p>
        <div className='bg-slate-700 rounded-xl shadow-lg shadow-black w-80 mx-auto'>
        <p data-testid="instructions" className='mt-5 text-md mx-2 leading-7 py-2 text-white'>{recipeDetail.strInstructions}</p>
        </div>
      </div>
      {recipeDetail.strYoutube && (
        <div className='mt-10 flex justify-center'>
          {pathname === `/meals/${id}` && (
            <iframe
              src={ recipeDetail.strYoutube.replace('watch?v=', 'embed/') }
              data-testid="video"
              title="Recipe Video"
              className='rounded-xl shadow-sm shadow-black'
            />
          )}
        </div>
      )}
      {copyLink && <Alert />}
      <Carousel />
        <Buttons favParams={ favParams } />
      <div className="fixed bottom-0 flex justify-center items-center w-full my-2">
        {verifyConditions() ? (
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleStorage }
            className="btn btn-success w-80"

          >
            Continue Recipe
          </button>
        ) : (
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleStorage }
            className="btn btn-success w-80"
          >
            Start Recipe
          </button>
        )}
      </div>
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape.isRequired,
};
