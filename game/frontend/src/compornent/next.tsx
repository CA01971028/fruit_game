import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Rectangle from './Rectangle';

import ham1 from '../img/hamster.png';
import ham2 from '../img/animal_hamster6.png';
import ham3 from '../img/animal_hamster5.png';
import ham4 from '../img/animal_hamster4.png';
import ham5 from '../img/animal_hamster3.png'; // 新しいハムスターの画像を追加する

type NextProps = {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};


const Next: React.FC<NextProps> = ({ score, setScore }) => {
  const [hamsterSize, setHamsterSize] = useState<number>(100);
  const [nextham, setNextham] = useState<string>(ham1);
  const [current, setCurrent] = useState<string>(ham1);
  const [currentSize, setCurrentSize] = useState<number>(100);
    
  const getRandomNumber = () => {
    const randomValue = Math.ceil(Math.random() * 10);
    if (current === ham1) {
      setNextham(ham2);
    } else if (current === ham2) {
      setNextham(ham3);
    } else if (current === ham3) {
      setNextham(ham4);
    } else if (current === ham4) {
      setNextham(ham5); // 新しいハムスターの画像をランダムに選択する場合はここにランダム関数を書く
    } else {
      setNextham(ham1); // 最後のハムスターの場合は最初に戻る
    }
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
    score ,
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
}

export default Next;
