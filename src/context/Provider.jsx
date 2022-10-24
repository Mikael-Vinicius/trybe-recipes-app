import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import AppContext from './AppContext';

function Provider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const contextValue = useMemo(() => ({
    recipes,
    setRecipes,
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
  }), [recipes, emailInput, passwordInput]);

  return (
    <AppContext.Provider value={ contextValue }>{children}</AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
