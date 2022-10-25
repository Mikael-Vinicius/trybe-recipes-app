import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';

export default function CategoryButtons({ history }) {
  const maxCategoriesLength = 5;
  const { setCategories,
    categories,
    setProducts,
    globalProducts } = useContext(AppContext);
  const [fetchProducts, setFetchProducts] = useState(false);

  const fetchCategories = async () => {
    const {
      location: { pathname },
    } = history;
    let endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    if (pathname === '/meals') {
      endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    }
    const request = await fetch(endpoint);
    const response = await request.json();
    const categoriesFetch = pathname === '/meals' ? response.meals : response.drinks;
    setCategories(categoriesFetch);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filterByCategory = async (category) => {
    if (fetchProducts) {
      setProducts(globalProducts);
      return setFetchProducts(!fetchProducts);
    }
    const {
      location: { pathname },
    } = history;
    let endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    if (pathname === '/meals') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    }
    const request = await fetch(endpoint);
    const response = await request.json();
    const filterCategory = pathname === '/meals' ? response.meals : response.drinks;
    setProducts(filterCategory);
    setFetchProducts(!fetchProducts);
  };

  return (
    <div>
      {categories?.slice(0, maxCategoriesLength).map((e, i) => (
        <button
          type="button"
          data-testid={ `${e.strCategory}-category-filter` }
          key={ i }
          onClick={ () => filterByCategory(e.strCategory) }
        >
          {e.strCategory}
        </button>
      ))}
      <button
        type="button"
        onClick={ () => setProducts(globalProducts) }
        data-testid="All-category-filter"
      >
        All
      </button>
    </div>
  );
}

CategoryButtons.propTypes = {
  history: PropTypes.shape.isRequired,
};
