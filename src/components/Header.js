import PropTypes from 'prop-types';
import React, { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header({ children, history }) {
  const [handleInput, setHandleInput] = useState(false);

  const {
    location: { pathname },
  } = history;
  return (
    <div>
      <h1 data-testid="page-title">{children}</h1>
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
        src={ profileIcon }
      >
        <img src={ profileIcon } alt="profile" />
      </button>
      {pathname === '/meals' || pathname === '/drinks' ? (
        <div>
          <button
            type="button"
            onClick={ () => setHandleInput(!handleInput) }
            data-testid="search-top-btn"
            src={ searchIcon }
          >
            <img src={ searchIcon } alt="profile" />
          </button>
          {handleInput && <input type="text" data-testid="search-input" />}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.string.isRequired,
  history: PropTypes.shape.isRequired,
};
