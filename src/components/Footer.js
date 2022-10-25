import PropTypes from 'prop-types';
import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer({ history }) {
  return (
    <div className="footer" data-testid="footer">
      <button type="button" onClick={ () => history.push('/drinks') }>
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink" />
      </button>
      <button type="button" onClick={ () => history.push('/meals') }>
        <img data-testid="meals-bottom-btn" src={ mealIcon } alt="meals" />
      </button>
    </div>
  );
}

Footer.propTypes = {
  history: PropTypes.shape.isRequired,
};
