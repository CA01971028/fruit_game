// Rectangle.tsx
import React, { useState } from 'react';
import owlImage from '../img/owl.png';
import hamsterImage from '../img/hamster.png';
import Animal_ball from './Animal_ball';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';

function Rectangle() {
  const basketWidth = 450;
  const basketHeight = 500;
  const owlSize = 100;
  const widthMove = 20;

  const [owlLeft, setOwlLeft] = useState<number>((basketWidth - owlSize) / 2);
  const [hamsters, setHamsters] = useState<Array<{ id: number, drop: boolean, top: number, left: number, stopped: boolean }>>([
    { id: 0, drop: false, top: 0, left: (basketWidth - owlSize) / 2, stopped: false }
  ]);
  const [nextHamsterId, setNextHamsterId] = useState(1);

  const leftClick = () => {
    setOwlLeft(prev => Math.max(0 - 25, prev - widthMove));
    setHamsters(prevHamsters =>
      prevHamsters.map(hamster =>
        hamster.drop ? hamster : { ...hamster, left: Math.max(0, hamster.left - widthMove) }
      )
    );
  };

  const rightClick = () => {
    setOwlLeft(prev => Math.min(basketWidth - owlSize + 25, prev + widthMove));
    setHamsters(prevHamsters =>
      prevHamsters.map(hamster =>
        hamster.drop ? hamster : { ...hamster, left: Math.min(basketWidth - owlSize, hamster.left + widthMove) }
      )
    );
  };

  const dropHamsterClick = () => {
    setHamsters(prevHamsters => {
      const updatedHamsters = [...prevHamsters];
      updatedHamsters[updatedHamsters.length - 1] = { ...updatedHamsters[updatedHamsters.length - 1], drop: true };
      updatedHamsters.push({ id: nextHamsterId, drop: false, top: 0, left: owlLeft, stopped: false });
      setNextHamsterId(nextHamsterId + 1);
      return updatedHamsters;
    });
  };

  return (
    <>
      <div className="basket"></div>

      <Box
        component="img"
        src={owlImage}
        alt="フクロウ"
        height={owlSize}
        width={owlSize}
        sx={{ position: 'absolute', top: 'calc(57% - 350px)', left: `calc(50% - 225px + ${owlLeft}px)` }}
      />

      <Button variant="contained" sx={{ position: 'absolute', top: 30, left: '25%' }} onClick={leftClick}>
        left
      </Button>

      <Button variant="contained" sx={{ position: 'absolute', top: 30, left: '70%' }} onClick={rightClick}>
        right
      </Button>

      <Button
        variant="contained"
        sx={{ position: 'absolute', top: 120, left: '70%' }}
        onClick={dropHamsterClick}
      >
        Drop Hamster
      </Button>

      {hamsters.map(hamster => (
        <Animal_ball
          key={hamster.id}
          owlLeft={hamster.drop ? hamster.left : owlLeft}
          basketHeight={basketHeight}
          dropHamster={hamster.drop}
          image={hamsterImage}
          id={hamster.id}
          hamsters={hamsters}
        />
      ))}
    </>
  );
}

export default Rectangle;
