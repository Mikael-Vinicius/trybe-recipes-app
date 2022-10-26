import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Carousel from '../components/Carousel';
import AppContext from '../context/AppContext';
import IngredientsAndMeasures from '../components/IngredientsAndMeasures';
import RecipeDetail from '../components/RecipeDetail';
import Buttons from '../components/Buttons';

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
    setCopyLink(!copyLink);
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
      <div>
        <p>Instructions</p>
        <p data-testid="instructions">{recipeDetail.strInstructions}</p>
      </div>
      {recipeDetail.strYoutube && (
        <div>
          {pathname === `/meals/${id}` && (
            <iframe
              src={ recipeDetail.strYoutube.replace('watch?v=', 'embed/') }
              data-testid="video"
              title="Recipe Video"
            />
          )}
        </div>
      )}
      {copyLink && <div>Link copied!</div>}
      <Carousel />
      <div className="buttonsDiv">
        <Buttons favParams={ favParams } />
        {verifyConditions() ? (
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleStorage }
            className="start"
          >
            Continue Recipe
          </button>
        ) : (
          <button
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleStorage }
            className="start"
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
