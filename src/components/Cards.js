import React from 'react';
import PropTypes from 'prop-types';

export default function Cards({ index, img, title }) {
  console.log(title);
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        alt="product"
        src={ img }
      />
      <h1 data-testid={ `${index}-card-name` }>{ title }</h1>
    </div>
  );
}

Cards.propTypes = {
  index: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
