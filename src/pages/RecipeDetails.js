import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import AppContext from '../context/AppContext';

export default function RecipeDetails({ history, match }) {
  const { setRecomendationsProducts } = useContext(AppContext);
  const [recipeDetail, setRecipeDetail] = useState({});
  const [ingredientsDetails, setIngredientsDetails] = useState([]);
  const [measureDetails, setMeasureDetails] = useState([]);
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
  useEffect(() => {
    requestDetails();
    recomendationsFetch();
  }, []);
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
      <ol>
        {ingredientsDetails?.map((e, i) => (
          <li
            key={ e.recipesProduct }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            {e.recipesProduct}
          </li>
        ))}
      </ol>
      <ol>
        {measureDetails?.map((e, i) => (
          <li
            key={ e.recipesMeasure }
            data-testid={ `${i}-ingredient-name-and-measure` }
          >
            {e.recipesMeasure}
          </li>
        ))}
      </ol>
      <div>
        <p>Instructions</p>
        <p data-testid="instructions">{recipeDetail.strInstructions}</p>
      </div>
      {pathname === `/meals/${id}` && (
        <iframe
          src={ recipeDetail.strYoutube }
          data-testid="video"
          title="Recipe Video"
        />
      )}
      <Carousel />
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start"
        onClick={ () => history.push(
          `${
            pathname === `/drinks/${id}`
              ? `/drinks/${id}/in-progress`
              : `/meals/${id}/in-progress`
          }`,
        ) }
      >
        Start Recipe
      </button>
      <button type="button" data-testid="start-recipe-btn" className="start">
        Continue Recipe
      </button>
    </div>
  );
}

RecipeDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape.isRequired,
};
