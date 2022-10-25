import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

export default function SearchBar({ history }) {
  const { filterBar,
    setFilterBar,
    setProducts } = useContext(AppContext);

  const [searchInput, setSearchInput] = useState('');

  const fetchMeals = async (endpoint) => {
    const request = await fetch(endpoint);
    const response = await request.json();
    const products = Object
      .keys(response)[0] === 'meals' ? response.meals : response.drinks;
    setProducts(products);
    if (products && products.length === 1) {
      const id = products[0].idMeal ? products[0].idMeal : products[0].idDrink;
      history.push(`${history.location.pathname}/${id}`);
    }
  };

  const handleClick = () => {
    const {
      location: { pathname },
    } = history;
    let endpoint = '';

    if (pathname === '/meals') {
      if (filterBar === 'Ingredient') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      } else if (filterBar === 'Name') {
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
      } else if (filterBar === 'First letter' && searchInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      } else {
        endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`;
      }
    }

    if (pathname === '/drinks') {
      if (filterBar === 'Ingredient') {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput}`;
      } else if (filterBar === 'Name') {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput}`;
      } else if (filterBar === 'First letter' && searchInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      } else {
        endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput}`;
      }
    }

    fetchMeals(endpoint);
  };

  return (
    <div>
      <input
        type="text"
        name="searchInput"
        data-testid="search-input"
        onChange={ (event) => setSearchInput(event.target.value) }
      />
      Ingredient
      <input
        name="filterBar"
        type="radio"
        data-testid="ingredient-search-radio"
        value="Ingredient"
        onChange={ (event) => setFilterBar(event.target.value) }
      />
      Name
      <input
        name="filterBar"
        type="radio"
        data-testid="name-search-radio"
        value="Name"
        onChange={ (event) => setFilterBar(event.target.value) }
      />
      First letter
      <input
        name="filterBar"
        type="radio"
        data-testid="first-letter-search-radio"
        value="First letter"
        onChange={ (event) => setFilterBar(event.target.value) }
      />
      <button data-testid="exec-search-btn" type="button" onClick={ handleClick }>
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  history: PropTypes.shape.isRequired,
};
