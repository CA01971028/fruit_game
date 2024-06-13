// Rectangle.tsx
import React, { useState } from 'react';
import owlImage from '../img/owl.png';
import hamsterImage from '../img/hamster.png';
import hamsterImage2 from '../img/animal_hamster6.png'
import hamsterImage3 from '../img/animal_hamster5.png'
import hamsterImage4 from '../img/animal_hamster4.png'
import hamsterImage5 from '../img/animal_hamster3.png'
import hamsterImage6 from '../img/animal_hamster2.png'
import Animal_ball from './Animal_ball';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';

// ハムスターの型を定義
interface Hamster {
  id: number;
  radius: number;
  image: string; // 画像パスを追加
}

// ハムスターのリストを定義
const hamster: Hamster[] = [
  { id: 0, radius: 25, image: './img/hamster.png' },
  { id: 1, radius: 50, image: './img/animal_hamster6.png' },
  { id: 2, radius: 75, image: './img/animal_hamster5.png' },
  { id: 3, radius: 100, image: './img/animal_hamster4.png' },
  { id: 4, radius: 125, image: './img/animal_hamster3.png' },
  { id: 5, radius: 150, image: './ima/animal_hamster2.png' },
];

function Rectangle() {
  const screenWidth:number = window.innerWidth
  const basketWidth:number = 450;
  const basketHeight:number = 500;
  const basketTop:number = 0;
  const basketleft:number = ((screenWidth/2) - 225);
  const owlSize:number = 100;
  const widthMove:number = 20;
  const [owlLeft, setOwlLeft] = useState<number>((screenWidth - owlSize) / 2);
  const [hamsters, setHamsters] = useState<Array<{ id: number, drop: boolean, top: number, left: number, stopped: boolean }>>([
    { id: 0, drop: false, top: 0, left: (screenWidth - owlSize) / 2, stopped: false }
  ]);
  const [nextHamsterId, setNextHamsterId] = useState(1);

  const leftClick = () => {
    setOwlLeft(prev => Math.max(basketleft - 25, prev - widthMove));
    setHamsters(prevHamsters =>
      prevHamsters.map(hamster =>
        hamster.drop ? hamster : { ...hamster, left: Math.max(0, hamster.left - widthMove) }
      )
    );
  };

  const rightClick = () => {
    setOwlLeft(prev => Math.min(basketleft + 375, prev + widthMove));
    setHamsters(prevHamsters =>
      prevHamsters.map(hamster =>
        hamster.drop ? hamster : { ...hamster, left: Math.min(owlLeft + 25, hamster.left + widthMove) }
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
        sx={{ position: 'absolute', top: '10px', left: `${owlLeft}px` }}
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
