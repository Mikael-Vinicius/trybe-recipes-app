import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Login({ history }) {
  const {
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput } = useContext(AppContext);
  const minLengthPassword = 7;
  const emailRegex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  const validRegex = emailRegex.test(emailInput);
  const isButtonDisabled = validRegex && passwordInput.length >= minLengthPassword;

  const handleClick = () => {
    const user = {
      email: emailInput,
    };
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/meals');
  };

  return (
    <div>
      <input
        name="email"
        type="email"
        data-testid="email-input"
        onChange={ (event) => setEmailInput(event.target.value) }
      />
      <input
        name="password"
        type="password"
        data-testid="password-input"
        onChange={ (event) => setPasswordInput(event.target.value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !isButtonDisabled }
        onClick={ handleClick }
      >
        Enter
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
