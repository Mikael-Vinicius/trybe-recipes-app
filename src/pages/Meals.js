import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import AppContext from '../context/AppContext';
import Footer from '../components/Footer';
import CategoryButtons from '../components/CategoryButtons';
import Loading from '../components/Loading';

export default function Meals({ history }) {
  const { products, setProducts, setGlobalProducts } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const maxArrayLength = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const request = await fetch(endpoint);
      const response = await request.json();
      setProducts(response.meals);
      setLoading(false);
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
      <hr className="mt-10 w-80 mx-auto border-slate-400" />
      <CategoryButtons history={ history } />
      <div className="mt-10 mx-2">
        {!products
          ? alertProducts()
          : loading ? <Loading />
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
      </div>
      <Footer history={ history } />
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape.isRequired,
};
