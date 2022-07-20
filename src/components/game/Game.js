import './Game.css';
import React, { useCallback, useEffect, useState } from 'react';
import Grid from '../grid/Grid';
import Keyboard from '../keyboard/Keyboard';
import Endscreen from '../endscreen/Endscreen';

export default function Game({ solution }) {
  const [endscreen, setEndscreen] = useState(false);
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const formatGuess = () => {
    const solutionArray = [...solution];
    const formattedGuess = [...currentGuess].map((letter) => ({ key: letter, color: 'gray' }));

    formattedGuess.forEach((letter, i) => {
      if (solution[i] === letter.key) {
        formattedGuess[i].color = 'green';
        solutionArray[i] = null;
      }
    });

    formattedGuess.forEach((letter, i) => {
      if (solutionArray.includes(letter.key) && letter.color !== 'green') {
        formattedGuess[i].color = 'yellow';
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prev) => {
      const newGuesses = [...prev];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prev) => [...prev, currentGuess]);
    setTurn((prev) => prev + 1);
    setUsedKeys((prev) => {
      const newKeys = { ...prev };

      formattedGuess.forEach((letter) => {
        const currentColor = newKeys[letter.key];
        if (letter.color === 'green') {
          newKeys[letter.key] = 'green';
          return;
        }

        if (letter.color === 'yellow' && currentColor !== 'green') {
          newKeys[letter.key] = 'yellow';
          return;
        }

        if (letter.color === 'gray' && currentColor !== 'green' && currentColor !== 'yellow') {
          newKeys[letter.key] = 'gray';
        }
      });

      return newKeys;
    });

    setCurrentGuess('');
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleEnterKey = useCallback((key) => {
    if (key === 'Enter') {
      if (turn > 5) {
        setErrorMessage('Maximum turns reached');
        return;
      }

      if (history.includes(currentGuess)) {
        setErrorMessage('Word cannot be used twice');
        return;
      }

      if (currentGuess.length !== 5) {
        setErrorMessage('Word must be 5 characters long');
        return;
      }

      const formatted = formatGuess();
      addNewGuess(formatted);
    }

    setTimeout(() => {
      setErrorMessage('');
    }, 5000);
  });

  const handleBackSpace = (key) => {
    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleAlphabeticKeys = useCallback((key) => {
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  });

  const handleClick = (key) => {
    if (isCorrect) {
      return;
    }

    if (turn > 5) {
      return;
    }

    handleEnterKey(key);
    handleBackSpace(key);
    handleAlphabeticKeys(key);
  };

  const handleNewGame = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  useEffect(() => {
    const handleKeys = ({ key }) => {
      handleEnterKey(key);
      handleBackSpace(key);
      handleAlphabeticKeys(key);
    };

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
  }, [handleAlphabeticKeys, handleEnterKey, isCorrect, turn]);

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
