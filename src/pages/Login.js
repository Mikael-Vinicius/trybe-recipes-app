import React, { useContext } from 'react';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import cook from '../images/cook.svg';

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
    <div className="flex flex-col justify-center h-screen items-center gap-5 m-3">
      <img src={ cook } alt="cook-logo" className="w-52" />
      <input
        name="email"
        type="email"
        data-testid="email-input"
        onChange={ (event) => setEmailInput(event.target.value) }
        className="input input-bordered w-full max-w-xs"
        placeholder="e-mail"
      />
      <input
        name="password"
        type="password"
        data-testid="password-input"
        onChange={ (event) => setPasswordInput(event.target.value) }
        className="input input-bordered w-full max-w-xs"
        placeholder="password"
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !isButtonDisabled }
        onClick={ handleClick }
        className="btn btn-primary"
      >
        <FontAwesomeIcon icon={ faRightToBracket } />
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
