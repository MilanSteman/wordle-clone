import './Endscreen.css';
import React, { useState } from 'react';

export default function Endscreen({ isCorrect, turn, solution }) {
  const [removeEndscreen, setRemoveEndscreen] = useState(false);
  const handleNewGame = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  const handleRemoveEndscreen = () => {
    setRemoveEndscreen(true);
  };

  if (removeEndscreen) {
    return <div />;
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="endscreen" onClick={handleRemoveEndscreen}>
      {isCorrect && (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            className="game-icon"
            data-testid="icon-close"
            onClick={handleRemoveEndscreen}
          >
            <path
              fill="var(--color-tone-1)"
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
          <div>
            <h1>
              <span>Congratulations!</span> You guessed the word: <span className="green">{solution}</span> in {turn}{' '}
              {turn === 1 ? 'guess' : 'guesses'}
            </h1>
            <button onClick={handleNewGame} className="new-game">
              New Game
            </button>
          </div>
        </div>
      )}

      {!isCorrect && (
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            className="game-icon"
            data-testid="icon-close"
          >
            <path
              fill="var(--color-tone-1)"
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            />
          </svg>
          <div>
            <h1>
              Too bad, the word was: <span className="wrong">{solution}</span>
            </h1>
            <button onClick={handleNewGame} className="new-game">
              New Game
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
