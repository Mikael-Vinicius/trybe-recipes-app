import { faUtensils, faWineGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer({ history }) {
  return (
    <div className="fixed bottom-0 bg-white w-full opacity-60 flex justify-around gap-10 p-1" data-testid="footer">
      <button type="button" onClick={ () => history.push('/drinks') }>
        <FontAwesomeIcon icon={faWineGlass} className="text-5xl text-black" />
        {/* <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink" /> */}
      </button>
      <button type="button" onClick={ () => history.push('/meals') }>
      <FontAwesomeIcon icon={faUtensils} className="text-5xl text-black" />
        {/* <img data-testid="meals-bottom-btn" src={ mealIcon } alt="meals" /> */}
      </button>
    </div>
  );
}

Footer.propTypes = {
  history: PropTypes.shape.isRequired,
};
