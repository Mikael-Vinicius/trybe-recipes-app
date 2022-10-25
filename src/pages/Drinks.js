import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import Cards from '../components/Cards';
import Footer from '../components/Footer';

export default function Drinks({ history }) {
  const { products, setProducts } = useContext(AppContext);
  const maxArrayLength = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const request = await fetch(endpoint);
      const response = await request.json();
      setProducts(response.drinks);
    };
    fetchProducts();
  }, []);

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
      <Footer history={ history } />
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape.isRequired,
};
