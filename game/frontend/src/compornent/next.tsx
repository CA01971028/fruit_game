import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import Rectangle from './Rectangle';

import ham1 from '../img/hamster.png';
import ham2 from '../img/animal_hamster6.png';
import ham3 from '../img/animal_hamster5.png';
import ham4 from '../img/animal_hamster4.png';

function Next() {
  const [hamsterSize, setHamsterSize] = useState<number>(100);
  const [hamsterKind, setHamsterKind] = useState<string>(ham1);
  const [current,setCurrent] = useState<string>(ham1);
  const [currentSize,setCurrentSize] = useState<number>(50)
    const getRandomNumber = () => {
        const randomValue = Math.ceil(Math.random() * 10);

        // 確率に基づいて数字を選択
        if (randomValue <= 4) {
          setHamsterKind(ham1);
          setHamsterSize(100);
        } else if (randomValue <= 7) {
          setHamsterKind(ham2);
          setHamsterSize(100);
        } else if (randomValue <= 9) {
          setHamsterKind(ham3);
          setHamsterSize(100);
        } else {
          setHamsterKind(ham4);
          setHamsterSize(100);
        }
    };

    const Changecurrent = () =>{
      setCurrent(hamsterKind)
      setCurrentSize(hamsterSize)
    }
    const rectangleProps = {
      getRandomNumber,
      Changecurrent,
      current
    };

  return (
    <>
      <div className="circle">
        <Box
          component="img"
          src={current}
          alt="ハムスター各種"
          height={hamsterSize}
          width={hamsterSize}
          sx={{ position: 'absolute', top: '80px', left: 'auto' }}
        />
        {/* <Box
          component="img"
          src={current}
          alt="ハムスター各種"
          height={currentSize}
          width={currentSize}
          sx={{ position: 'absolute', top: '250px', left: 'auto' }}
        /> */}
        <span className="text">ネクスト</span>
        {/* <Box component="span"className="text"sx={{ position: 'absolute', top: '230px', left: '50%' }}>現在</Box> */}
      </div>
      <Rectangle {...rectangleProps}/>
    </>
  );
}

export default Next;
