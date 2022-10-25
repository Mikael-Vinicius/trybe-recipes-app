import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Carousel() {
  const { recomendationsProducts } = useContext(AppContext);
  const maxArrayLength = 6;
  return (
    <div>
      <div className="carousel">
        {recomendationsProducts.slice(0, maxArrayLength).map((e, i) => (
          <div key={ i }>
            <p data-testid={ `${i}-recommendation-title` }>
              {e.strDrink ? e.strDrink : e.strMeal}
            </p>
            <img
              src={ e.strDrinkThumb ? e.strDrinkThumb : e.strMealThumb }
              width={ 182 }
              data-testid={ `${i}-recommendation-card` }
              alt="img-recomendation"
            />
          </div>
        ))}
        ;
      </div>
    </div>
  );
}
