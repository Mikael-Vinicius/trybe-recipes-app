import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Cards({ index, img, title, id, history }) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <Link to={ `${history.location.pathname}/${id}` }>
        <img
          data-testid={ `${index}-card-img` }
          alt="product"
          src={ img }
        />
        <h1 data-testid={ `${index}-card-name` }>{ title }</h1>
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
