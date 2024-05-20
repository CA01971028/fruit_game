import React from 'react';
import animalHamster from '../img/animal_hamster1.png';

const BallDisplay: React.FC = () => {
  return (
    <div className="ball-container">
      <img src={animalHamster} alt="Hamster" className="hamster-image" />
    </div>
  );
}

export default BallDisplay;
