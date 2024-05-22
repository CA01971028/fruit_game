import React from 'react';
import hamsterImage from '../img/animal_hamster1.png'; // 画像をインポート
import { Box } from '@mui/material';
import { useBallMovement } from './Ball_movement';

function Animal_ball({ owl_width, basketHeight }: { owl_width: number, basketHeight: number }) {
  const offset = 3.8; // ハムスターを右に移動するためのオフセット（%）
  const topPosition = useBallMovement(0, 2, 50, basketHeight); // 初期位置、落下速度、インターバル時間、バスケットの高さを渡す

  return (
    <Box 
      component="img" 
      src={hamsterImage} 
      alt="ハムスター" 
      height={50} 
      width={50} 
      sx={{ 
        position: 'absolute', 
        top: `calc(100% - 625px + 100px + ${Math.min(topPosition, basketHeight)}px)`, // フクロウの位置の真下から落ちる。バスケットの一番下に到達したら停止する
        left: `calc(${owl_width}% + ${offset}%)`, // フクロウの位置にオフセットを追加
        transform: 'translateX(-50%)' // 中央揃え
      }} 
    />
  );
}

export default Animal_ball;
