import React from 'react';
import './App.css';
import './css/compornent.css'
import Background from './compornent/background';
import Score from './compornent/score'
import Ranking from './compornent/ranking';

function App() {
  return (
    <div>
    <Background />
    <Score />
    <Ranking />
    </div>
  );
}

export default App;
