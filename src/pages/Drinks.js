import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Cards from '../components/Cards';

export default function Drinks({ history }) {
  const { products, setProducts } = useContext(AppContext);
  const maxArrayLength = 12;

  const alertProducts = () => {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    setProducts([]);
  };

  return (
    <div>
      <Header history={ history }>Drinks</Header>
      {!products
        ? alertProducts()
        : products
          .slice(0, maxArrayLength)
          .map((el, index) => (
            <Cards
              key={ el.strDrink }
              img={ el.strDrinkThumb }
              title={ el.strDrink }
              index={ index }
            />
          ))}
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape.isRequired,
};
