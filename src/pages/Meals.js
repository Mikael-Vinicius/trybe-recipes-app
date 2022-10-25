import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import CategoryButtons from '../components/CategoryButtons';

export default function Meals({ history }) {
  const { products, setProducts, setGlobalProducts } = useContext(AppContext);
  const maxArrayLength = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const request = await fetch(endpoint);
      const response = await request.json();
      setProducts(response.meals);
      setGlobalProducts(response.meals);
    };
    fetchProducts();
  }, []);

  const alertProducts = () => {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    setProducts([]);
  };

  return (
    <div>
      <Header history={ history }>
        Meals
      </Header>
      <CategoryButtons history={ history } />
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
              id={ el.idMeal }
              history={ history }
            />
          ))}
      <Footer history={ history } />
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape.isRequired,
};
