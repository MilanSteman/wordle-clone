import './Game.css';
import React, { useEffect, useState } from 'react';
import useWordle from '../../hooks/useWordle';
import Grid from '../grid/Grid';
import Keyboard from '../keyboard/Keyboard';
import Endscreen from '../endscreen/Endscreen';

export default function Game({ solution }) {
  const { currentGuess, handleKeys, handleClick, guesses, isCorrect, turn, usedKeys, errorMessage } =
    useWordle(solution);
  const [endscreen, setEndscreen] = useState(false);

  const handleNewGame = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  useEffect(() => {
    window.addEventListener('keyup', handleKeys);

    if (isCorrect) {
      setTimeout(() => {
        setEndscreen(true);
      }, 1750);
      window.removeEventListener('keyup', handleKeys);
    }

    if (turn > 5) {
      setTimeout(() => {
        setEndscreen(true);
      }, 1750);
      window.removeEventListener('keyup', handleKeys);
    }

    return () => {
      window.removeEventListener('keyup', handleKeys);
    };
  }, [handleKeys, isCorrect, turn]);

  return (
    <div className="game">
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      {errorMessage === '' ? (
        <div className="error-message" />
      ) : (
        <div className="error-message filled">{errorMessage}</div>
      )}
      <Keyboard usedKeys={usedKeys} handleClick={handleClick} />
      {endscreen && <Endscreen isCorrect={isCorrect} turn={turn} solution={solution} />}
      <button onClick={handleNewGame} className="new-game homepage-button">
        New Game
      </button>
    </div>
  );
}
