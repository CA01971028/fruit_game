// Rectangle.tsx
// 必要なモジュールと画像のインポート
import React, { useState } from 'react';
import owlImage from '../img/owl.png'; // フクロウの画像
import hamsterImage from '../img/hamster.png'; // ハムスターの画像
import hamsterImage2 from '../img/animal_hamster6.png'; // ハムスターの画像2
import hamsterImage3 from '../img/animal_hamster5.png'; // ハムスターの画像3
import hamsterImage4 from '../img/animal_hamster4.png'; // ハムスターの画像4
import hamsterImage5 from '../img/animal_hamster3.png'; // ハムスターの画像5
import hamsterImage6 from '../img/animal_hamster2.png'; // ハムスターの画像6
import Animal_ball from './Animal_ball'; // Animal_ballコンポーネントのインポート
import { Box } from '@mui/material'; // Material UIのBoxコンポーネントのインポート
import Button from '@mui/material/Button'; // Material UIのButtonコンポーネントのインポート

// ハムスターの型を定義
interface Hamster {
  id: number;
  radius: number;
  image: string; // 画像パスを追加
}

// ハムスターのリストを定義
const hamster: Hamster[] = [
  { id: 0, radius: 25,  image: hamsterImage },
  { id: 1, radius: 50,  image: hamsterImage2 },
  { id: 2, radius: 75,  image: hamsterImage3 },
  { id: 3, radius: 100, image: hamsterImage4 },
  { id: 4, radius: 125, image: hamsterImage5 },
  { id: 5, radius: 150, image: hamsterImage6 },
];

// Rectangleコンポーネントを定義
function Rectangle() {
  // 画面の幅を取得
  const screenWidth:number = window.innerWidth;
  const basketWidth:number = 450; // バスケットの幅
  const basketHeight:number = 500; // バスケットの高さ
  const basketTop:number = 0; // バスケットの上位置
  const basketleft:number = ((screenWidth/2) - 225); // バスケットの左位置
  const owlSize:number = 100; // フクロウのサイズ
  const widthMove:number = 20; // 移動量
  const [owlLeft, setOwlLeft] = useState<number>((screenWidth - owlSize) / 2); // フクロウの初期位置の状態
  const [hamsters, setHamsters] = useState<Array<{ id: number, drop: boolean, top: number, left: number, stopped: boolean }>>([
    { id: 0, drop: false, top: 0, left: (screenWidth - owlSize) / 2, stopped: false }
  ]); // ハムスターの状態を管理
  const [nextHamsterId, setNextHamsterId] = useState(1); // 次のハムスターのIDを管理

  // 左ボタンクリック時の処理
  const leftClick = () => {
    setOwlLeft(prev => Math.max(basketleft - 20, prev - widthMove)); // フクロウを左に移動
    setHamsters(prevHamsters =>
      prevHamsters.map(hamster =>
        hamster.drop ? hamster : { ...hamster, left: Math.max(basketleft - 20, hamster.left - widthMove) }
      )
    ); // ハムスターも一緒に左に移動
  };

  // 右ボタンクリック時の処理
  const rightClick = () => {
    setOwlLeft(prev => Math.min(basketleft + 385, prev + widthMove)); // フクロウを右に移動
    setHamsters(prevHamsters =>
      prevHamsters.map(hamster =>
        hamster.drop ? hamster : { ...hamster, left: Math.min(basketleft + 385, hamster.left + widthMove) }
      )
    ); // ハムスターも一緒に右に移動
  };

// ハムスターを落とすボタンクリック時の処理
const dropHamsterClick = () => {
  setHamsters(prevHamsters => {
    const updatedHamsters = [...prevHamsters];
    updatedHamsters[updatedHamsters.length - 1] = { ...updatedHamsters[updatedHamsters.length - 1], drop: true }; // 最後のハムスターを落とす

    // 次のハムスターを同じ ID で追加
    updatedHamsters.push({ id: updatedHamsters[updatedHamsters.length - 1].id, drop: false, top: 0, left: owlLeft, stopped: false });

    return updatedHamsters;
  });
};


  // コンポーネントのレンダリング
  return (
    <>
      <div className="basket"></div> // バスケットを表示

      <Box
        component="img"
        src={owlImage}
        alt="フクロウ"
        height={owlSize}
        width={owlSize}
        sx={{ position: 'absolute', top: '10px', left: `${owlLeft}px` }}
      /> // フクロウの画像を表示

      <Button variant="contained" sx={{ position: 'absolute', top: 30, left: '25%' }} onClick={leftClick}>
        left
      </Button> // 左移動ボタン

      <Button variant="contained" sx={{ position: 'absolute', top: 30, left: '70%' }} onClick={rightClick}>
        right
      </Button> // 右移動ボタン

      <Button
        variant="contained"
        sx={{ position: 'absolute', top: 120, left: '70%' }}
        onClick={dropHamsterClick}
      >
        Drop Hamster
      </Button> // ハムスターを落とすボタン

      {hamsters.map(hamster => (
        <Animal_ball
          key={hamster.id}
          owlLeft={hamster.drop ? hamster.left : owlLeft}
          basketWidth={basketWidth}
          basketHeight={basketHeight}
          dropHamster={hamster.drop}
          image={hamsterImage}
          id={hamster.id}
          hamsters={hamsters}
        />
      ))} // 各ハムスターのAnimal_ballコンポーネントをレンダリング
    </>
  );
}

export default Rectangle; // Rectangleコンポーネントをエクスポート
