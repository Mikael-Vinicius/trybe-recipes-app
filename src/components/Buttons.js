import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import handleFavorites from '../assets/scripts';
import AppContext from '../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartCircleBolt, faShare } from '@fortawesome/free-solid-svg-icons';

const copy = require('clipboard-copy');

export default function Buttons({ favParams }) {
  const { favoriteR, setCopyLink, copyLink } = useContext(AppContext);
  return (
    <div
      className="mb-20 flex justify-center gap-10"
    >
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          copy(window.location.href.replace('/in-progress', ''));
          setCopyLink(!copyLink);
        } }
      >
        <FontAwesomeIcon icon={faShare} className="text-3xl" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ () => handleFavorites(favParams) }
        src={ !favoriteR ? whiteHeartIcon : blackHeartIcon }
      >
        {!favoriteR ? (
          <FontAwesomeIcon icon={faHeart} className="text-white text-3xl" />
        ) : (
          <FontAwesomeIcon icon={faHeart} className="text-red-600 text-3xl" />
        )}
      </button>
    </div>
  );
}

Buttons.propTypes = {
  favParams: PropTypes.shape.isRequired,
};
