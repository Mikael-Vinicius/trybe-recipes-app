import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [filterBar, setFilterBar] = useState('');
  const [categories, setCategories] = useState([]);
  const [globalProducts, setGlobalProducts] = useState([]);
  const [recomendationsProducts, setRecomendationsProducts] = useState([]);
  const contextValue = useMemo(
    () => ({
      products,
      setProducts,
      emailInput,
      setEmailInput,
      passwordInput,
      setPasswordInput,
      filterBar,
      setFilterBar,
      categories,
      setCategories,
      globalProducts,
      setGlobalProducts,
      recomendationsProducts,
      setRecomendationsProducts,
    }),
    [
      products,
      emailInput,
      passwordInput,
      filterBar,
      categories,
      globalProducts,
      recomendationsProducts,
    ],
  );

  return (
    <AppContext.Provider value={ contextValue }>{children}</AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
