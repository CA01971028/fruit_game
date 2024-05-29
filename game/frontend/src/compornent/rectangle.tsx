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

  // フクロウの現在の左端の位置を管理する状態
  const [owlLeft, setOwlLeft] = useState<number>((basketWidth - owlSize) / 2); // 初期位置をバスケットの中央に設定
  // ハムスターの状態を管理する状態。各ハムスターにはID、落下状態、および初期の左端の位置がある
  const [hamsters, setHamsters] = useState<Array<{ id: number, drop: boolean, initialLeft: number | null }>>([{ id: 0, drop: false, initialLeft: null }]);
  // 次のハムスターのIDを管理する状態
  const [nextHamsterId, setNextHamsterId] = useState(1); // 次のハムスターのID
  // フクロウの移動幅をピクセル単位に設定
  const widthMove: number = 20; 

  // フクロウを左に移動する関数
  const leftClick = () => {
    setOwlLeft(prev => Math.max(-25, prev - widthMove)); // 左端に制限
  };

  // フクロウを右に移動する関数
  const rightClick = () => {
    setOwlLeft(prev => Math.min(basketWidth - owlSize + 25, prev + widthMove)); // 右端に制限 (フクロウの幅を考慮)
  };

  // ハムスターを落下させる関数
  const dropHamsterClick = () => {
    setHamsters(prevHamsters => {
      const updatedHamsters = [...prevHamsters];
      const lastHamster = updatedHamsters[updatedHamsters.length - 1];
      lastHamster.drop = true; // 最新のハムスターを落下させる
      lastHamster.initialLeft = owlLeft; // 落下開始時の位置を記録
      updatedHamsters.push({ id: nextHamsterId, drop: false, initialLeft: null }); // 新しいハムスターを追加
      setNextHamsterId(nextHamsterId + 1);
      return updatedHamsters;
    });
  };

  return (
    <>
      <div className="basket"></div> {/* バスケットのスタブ */}

      {/* フクロウの画像を表示 */}
      <Box
        component="img"
        src={owlImage}
        alt="フクロウ"
        height={owlSize}
        width={owlSize}
        sx={{ position: 'absolute', top: 'calc(57% - 350px)', left: `calc(50% - 225px + ${owlLeft}px)` }}
      />

      {/* 左に移動するボタン */}
      <Button variant="contained" sx={{ position: 'absolute', top: 30, left: '25%' }} onClick={leftClick}>
        left
      </Button>
      
      {/* 右に移動するボタン */}
      <Button variant="contained" sx={{ position: 'absolute', top: 30, left: '70%' }} onClick={rightClick}>
        right
      </Button>
      
      {/* ハムスターを落下させるボタン */}
      <Button
        variant="contained"
        sx={{ position: 'absolute', top: 120, left: '70%' }}
        onClick={dropHamsterClick}
      >
        Drop Hamster
      </Button>

      {/* ハムスターの表示 */}
      {hamsters.map(hamster => (
        <Animal_ball
          key={hamster.id}
          owlLeft={hamster.drop ? (hamster.initialLeft ?? owlLeft) : owlLeft} // 落下中は固定位置を使用、nullの場合はowlLeftを使用
          basketHeight={basketHeight}
          dropHamster={hamster.drop}
          image={hamsterImage}
        />
      ))}
    </>
  );
}

export default Rectangle;
