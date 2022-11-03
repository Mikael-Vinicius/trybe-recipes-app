import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Carousel() {
  const { recomendationsProducts } = useContext(AppContext);
  const maxArrayLength = 6;
  return (
    <div>
      <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box mt-10 mx-5 my-10 bg-slate-800 shadow-sm shadow-black">
        {recomendationsProducts.slice(0, maxArrayLength).map((e, i) => (
          <div key={ i } className="carousel-item">
            <div className='text-center text-xl'>
            <p data-testid={ `${i}-recommendation-title` }>
              {e.strDrink ? e.strDrink : e.strMeal}
            </p>
            <img
              src={ e.strDrinkThumb ? e.strDrinkThumb : e.strMealThumb }
              data-testid={ `${i}-recommendation-card` }
              alt="img-recomendation"
              className='w-40 rounded-full p-2'
            />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
