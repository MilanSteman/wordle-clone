import './App.css';
import { useEffect, useState } from 'react';
import ValidWords from './data/ValidWords.json';
import Game from './components/game/Game';

const randomValidWord = ValidWords.fiveLetterWords[Math.floor(Math.random() * ValidWords.fiveLetterWords.length)];

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    setSolution(randomValidWord);
  }, [setSolution]);

  return <div className="App">{solution && <Game solution={solution} />}</div>;
}

export default App;
