import { faCow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    <div className="bg-slate-700 mt-8 w-5/6 mx-auto rounded-lg shadow-lg shadow-black">
      <div className="flex flex-wrap gap-2 justify-center p-3">
        {categories?.slice(0, maxCategoriesLength).map((e, i) => (
          <button
            type="button"
            data-testid={ `${e.strCategory}-category-filter` }
            key={ i }
            onClick={ () => filterByCategory(e.strCategory) }
            className="btn btn-xs btn-outline"
          >
            {e.strCategory}
          </button>
        ))}
        <button
          type="button"
          onClick={ () => setProducts(globalProducts) }
          data-testid="All-category-filter"
          className="btn btn-outline btn-accent btn-xs"
        >
          All
        </button>
      </div>
    </div>
  );
}

CategoryButtons.propTypes = {
  history: PropTypes.shape.isRequired,
};
