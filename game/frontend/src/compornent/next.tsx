import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Rectangle from './Rectangle';

import ham1 from '../img/hamster.png';
import ham2 from '../img/animal_hamster6.png';
import ham3 from '../img/animal_hamster5.png';
import ham4 from '../img/animal_hamster4.png';
import ham5 from '../img/animal_hamster3.png'; // 新しいハムスターの画像を追加する
import ham6 from '../img/animal_hamster2.png';
type NextProps = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

const Next: React.FC<NextProps> = ({ score, setScore }) => {
  const [hamsterSize, setHamsterSize] = useState<number>(100);
  const [nextham, setNextham] = useState<string>(ham1);
  const [current, setCurrent] = useState<string>(ham1);
  const [currentSize, setCurrentSize] = useState<number>(100);
  const [count, setCount] = useState<number>(0)
  const getRandomNumber = () => {
    let newHamster;
    do {
      const randomValue = Math.round(Math.random() * 10 * 10) / 10;
        if (randomValue <= 8) {
          newHamster = ham6;
        } else if (randomValue <= 3) {
          newHamster = ham1;
        } else if (randomValue <= 5) {
          newHamster = ham2;
        } else if (randomValue <= 7.5) {
          newHamster = ham3;
        } else if (randomValue <= 8.5) {
          newHamster = ham4;
        } else {
          newHamster = ham5;
        }
    } while (newHamster === current); // currentHamster と異なるまで繰り返す

    setNextham(newHamster);
    setHamsterSize(100);
  };

  const Changecurrent = () => {
    setCurrent(nextham);
    setCurrentSize(hamsterSize);
  };

  useEffect(() => {
    getRandomNumber();
  }, [current]); // current の変更時に新しいハムスターを選択する

  const rectangleProps = {
    getRandomNumber,
    Changecurrent,
    current,
    score,
    setScore,
  };

  return (
    <>
      <div className="circle">
        <Box
          component="img"
          src={nextham}
          alt="次のハムスター各種"
          height={hamsterSize}
          width={hamsterSize}
          sx={{ position: 'absolute', top: '80px', left: 'auto' }}
        />
        <Box
          component="img"
          src={current}
          alt="現在のハムスター各種"
          height={currentSize}
          width={currentSize}
          sx={{ position: 'absolute', top: '250px', left: 'auto' }}
        />
        <span className="text">ネクスト</span>
        <Box component="span" className="text" sx={{ position: 'absolute', top: '230px', left: '50%' }}>現在</Box>
      </div>
      <Rectangle {...rectangleProps} />
    </>
  );
};

export default Next;