import { faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ children, history }) {
  const [handleInput, setHandleInput] = useState(false);

  const {
    location: { pathname },
  } = history;
  return (
    <div className="flex text-xl text-white p-1">
      <span data-testid="page-title" className="w-0 text-4xl text-blue-100">{children}</span>
      {pathname === '/meals' || pathname === '/drinks' ? (
        ''
      ) : (
        <div className="flex flex-wrap justify-end items-center w-full">
          <button
            type="button"
            data-testid="profile-top-btn"
            onClick={ () => history.push('/profile') }
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
        </div>)}
      {pathname === '/meals' || pathname === '/drinks' ? (
        <div className="flex justify-end w-full flex-wrap gap-2">
          <button
            type="button"
            data-testid="profile-top-btn"
            onClick={ () => history.push('/profile') }
          >
            <FontAwesomeIcon icon={faUser} />
          </button>
          <button
            type="button"
            onClick={ () => setHandleInput(!handleInput) }
            data-testid="search-top-btn"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          {handleInput && (
            <SearchBar history={ history } />
          )}
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
