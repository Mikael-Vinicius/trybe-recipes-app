import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import AppContext from '../context/AppContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import IngredientsAndMeasures from '../components/IngredientsAndMeasures';
import RecipeDetail from '../components/RecipeDetail';

const copy = require('clipboard-copy');

export default function RecipeDetails({ history, match }) {
  const { setRecomendationsProducts,
    setIdsForMeals,
    setIdsForDrinks } = useContext(AppContext);
  const [recipeDetail, setRecipeDetail] = useState({});
  const [ingredientsDetails, setIngredientsDetails] = useState([]);
  const [measureDetails, setMeasureDetails] = useState([]);
  const [copyLink, setCopyLink] = useState(false);
  const [favoriteR, setFavoriteRecipe] = useState(false);

  const {
    location: { pathname },
  } = history;
  const {
    params: { id },
  } = match;

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
    getFavorite();
  }, [favoriteR]);

  useEffect(() => {
    requestDetails();
    recomendationsFetch();
  }, []);

  const handleStorage = () => {
    if (pathname === `/drinks/${id}`) {
      setIdsForDrinks((prevState) => [...prevState, id]);
    } else if (pathname === `/meals/${id}`) {
      setIdsForMeals((prevState) => [...prevState, id]);
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
  const handleFavorites = () => {
    const favoritesStorage = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    );
    const obj = [
      {
        id,
        type: pathname === `/meals/${id}` ? 'meal' : 'drink',
        nationality: pathname === `/meals/${id}` ? recipeDetail.strArea : '',
        category: recipeDetail.strCategory,
        alcoholicOrNot:
          pathname === `/drinks/${id}` ? recipeDetail.strAlcoholic : '',
        name:
          pathname === `/meals/${id}`
            ? recipeDetail.strMeal
            : recipeDetail.strDrink,
        image:
          pathname === `/meals/${id}`
            ? recipeDetail.strMealThumb
            : recipeDetail.strDrinkThumb,
      },
    ];
    if (favoritesStorage) {
      if (favoritesStorage.some((e) => e.id === id)) {
        const removedItems = favoritesStorage.filter((e) => e.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(removedItems));
        return setFavoriteRecipe(!favoriteR);
      }
      const allStorage = [...favoritesStorage, ...obj];
      localStorage.setItem('favoriteRecipes', JSON.stringify(allStorage));
      return setFavoriteRecipe(!favoriteR);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(obj));
    return setFavoriteRecipe(!favoriteR);
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
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => {
            copy(window.location.href);
            setCopyLink(true);
          } }
        >
          <img src={ shareIcon } alt="share icon" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ handleFavorites }
          src={ !favoriteR ? whiteHeartIcon : blackHeartIcon }
        >
          {!favoriteR ? (
            <img src={ whiteHeartIcon } alt="White Heart Ico" />
          ) : (
            <img src={ blackHeartIcon } alt="Black Heart Icon" />
          )}
        </button>
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
