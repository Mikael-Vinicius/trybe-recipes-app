import PropTypes from 'prop-types';
import React from 'react';

export default function IngredientsAndMeasures({ ingredientsDetails, measureDetails }) {
  return (
    <div className='mt-10 flex justify-center gap-24'>
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
    </div>
  );
}

IngredientsAndMeasures.propTypes = {
  ingredientsDetails: PropTypes.shape.isRequired,
  measureDetails: PropTypes.shape.isRequired,
};
