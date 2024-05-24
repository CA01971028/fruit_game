import React, { useState } from 'react';
import owlImage from '../img/owl.png';
import hamsterImage from '../img/animal_hamster1.png';
import Animal_ball from './Animal_ball';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';

function Rectangle() {
  const basketWidth = 450; // バスケットの幅 (ピクセル)
  const basketHeight = 450; // バスケットの高さ (ピクセル)
  const owlSize = 100; // フクロウのサイズ (ピクセル)

  const [owlLeft, setOwlLeft] = useState<number>((basketWidth - owlSize) / 2); // 初期位置をバスケットの中央に設定
  const [hamsters, setHamsters] = useState<Array<{ id: number, drop: boolean }>>([]);
  const [nextHamsterId, setNextHamsterId] = useState(0);
  const widthMove: number = 20; // フクロウの移動幅をピクセル単位に設定

  const leftClick = () => {
    setOwlLeft(prev => Math.max(-25, prev - widthMove)); // 左端に制限
  };

  const rightClick = () => {
    setOwlLeft(prev => Math.min(basketWidth - owlSize + 25, prev + widthMove)); // 右端に制限 (フクロウの幅を考慮)
  };

  const dropHamsterClick = () => {
    // ボタンを押した時にハムスターを追加し、drop を true に設定
    setHamsters([...hamsters, { id: nextHamsterId, drop: true }]);
    setNextHamsterId(nextHamsterId + 1);
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
        hamster.drop && // ハムスターが落下する場合のみ表示
        <Animal_ball
          key={hamster.id}
          owlLeft={owlLeft}
          basketHeight={basketHeight}
          dropHamster={hamster.drop}
          image={hamsterImage}
        />
      ))}
    </>
  );
}

export default Rectangle;
