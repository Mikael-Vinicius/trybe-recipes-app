import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Cards({ index, img, title, id, history }) {
  return (
    <div data-testid={ `${index}-recipe-card` } className="flex flex-col justify-center text-center text-4xl text-gray-200">
      <Link to={ `${history.location.pathname}/${id}` }>
        <img
          data-testid={ `${index}-card-img` }
          alt="product"
          src={ img }
          className="rounded-full w-80 shadow-lg shadow-gray-300 mx-auto"
        />
        <h1 data-testid={ `${index}-card-name` } className="relative bottom-8 text-shadow">{ title }</h1>
      </Link>
    </div>
  );
}

Cards.propTypes = {
  index: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  history: PropTypes.shape.isRequired,
};
