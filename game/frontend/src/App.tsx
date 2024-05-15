import React from 'react';
import './App.css'
import './css/compornent.css'
import Background from './compornent/background'
import Score from './compornent/score'
import Ranking from './compornent/ranking'
import Next from './compornent/next'
import Next_block from './compornent/next_block';
import Rectangle from './compornent/rectangle';

function App() {
  return (
    <div>
    <Background />
    <Score />
    <Ranking />
    <Next />
    <Next_block />
    <Rectangle />
    </div>
  );
}

export default App;
