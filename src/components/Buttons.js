import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import handleFavorites from '../assets/scripts';
import AppContext from '../context/AppContext';

const copy = require('clipboard-copy');

export default function Buttons({ favParams }) {
  const { favoriteR, setCopyLink, copyLink } = useContext(AppContext);
  return (
    <div
      className="buttonsDiv"
    >
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          copy(window.location.href.replace('/in-progress', ''));
          setCopyLink(!copyLink);
        } }
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => handleFavorites(favParams) }
        src={ !favoriteR ? whiteHeartIcon : blackHeartIcon }
      >
        {!favoriteR ? (
          <img src={ whiteHeartIcon } alt="White Heart Ico" />
        ) : (
          <img src={ blackHeartIcon } alt="Black Heart Icon" />
        )}
      </button>
    </div>
  );
}

Buttons.propTypes = {
  favParams: PropTypes.shape.isRequired,
};
