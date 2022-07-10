import './Row.css';
import React from 'react';
import Tile from '../tile/Tile';

export default function Row({ guess, currentGuess }) {
  if (guess) {
    return (
      <div className="row past">
        {guess.map((letter, i) => (
          <div key={i} className={letter.color}>
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    const letters = currentGuess.split('');

    return (
      <div className="row current">
        {letters.map((letter, i) => (
          <Tile key={i} letter={letter} />
        ))}
        {[...Array(5 - letters.length)].map((value, i) => (
          <Tile key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="row">
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
