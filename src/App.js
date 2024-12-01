import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Popup from './components/Popup';
import Notification from './components/Notification';
import { showNotification as show, checkWin } from './helpers/helpers';

import './App.css';

const words = ['computer', 'keyboard', 'software', 'developer', 'algorithm', 'database', 'javascript', 'network', 'encryption', 'interface', 'framework', 'infrastructure', 'authentication', 'firewall', 'cybersecurity', 'backup', 'hardware', 'cloud', 'debugging', 'technology', 'mobile', 'python', 'application', 'programming', 'interface', 'wizard', 'engineer', 'cryptography', 'multimedia', 'operating', 'system', 'compiler', 'dashboard', 'domain', 'artificial', 'intelligence', 'penetration', 'testing', 'performance', 'version', 'mobile', 'compatibility', 'virtualization', 'efficiency', 'automation', 'browser', 'rendering', 'animation', 'simulation', 'innovation'];
let selectedWord = words[Math.floor(Math.random() * words.length)];


function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://random-word-api.herokuapp.com/word?length=10')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  }, []);
  console.log(data[0])

  useEffect(() => {
    const handleKeydown = event => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default App;