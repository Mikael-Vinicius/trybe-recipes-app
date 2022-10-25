import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [filterBar, setFilterBar] = useState('');

  const contextValue = useMemo(() => ({
    products,
    setProducts,
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
    filterBar,
    setFilterBar,
  }), [products, emailInput, passwordInput, filterBar]);

  return (
    <AppContext.Provider value={ contextValue }>{children}</AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
