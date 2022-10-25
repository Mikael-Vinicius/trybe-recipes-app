import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import AppContext from '../context/AppContext';

export default function Meals({ history }) {
  const { products, setProducts } = useContext(AppContext);
  const maxArrayLength = 12;

  const alertProducts = () => {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    setProducts([]);
  };

  return (
    <div>
      <Header history={ history }>
        Meals
      </Header>
      {!products
        ? alertProducts()
        : products
          .slice(0, maxArrayLength)
          .map((el, index) => (
            <Cards
              key={ el.strMeal }
              img={ el.strMealThumb }
              title={ el.strMeal }
              index={ index }
            />
          ))}
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape.isRequired,
};
