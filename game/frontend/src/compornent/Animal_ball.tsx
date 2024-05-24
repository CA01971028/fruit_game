import React from 'react';
import hamsterImage from '../img/animal_hamster1.png'; // 画像をインポート
import { Box } from '@mui/material';
import { useBallMovement } from './Ball_movement';

function Animal_ball({ owlLeft, basketHeight, dropHamster, image}: { owlLeft: number, basketHeight: number, dropHamster: boolean, image:string}) {
  const { topPosition } = useBallMovement(0, 2, 50, basketHeight, dropHamster);

  return (
    <Box
      component="img"
      src={hamsterImage}
      alt="ハムスター"
      height={50}
      width={50}
      sx={{
        position: 'absolute',
        top: `calc(57% - 350px + 100px + ${Math.min(topPosition, basketHeight)}px)`,
        left: `calc(50% - 200px + ${owlLeft + 25}px)`, // フクロウの位置にオフセットを追加
        transform: 'translateX(-50%)'
      }}
    />
  );
}

export default Animal_ball;
