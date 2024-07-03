// Rectangle.tsx
// 必要なモジュールと画像のインポート
import React, { useState, useEffect } from 'react';
import owlImage from '../img/owl.png'; // フクロウの画像
import ham1 from '../img/hamster.png'; // ハムスターの画像
import ham2 from '../img/animal_hamster6.png'; // ハムスターの画像2
import ham3 from '../img/animal_hamster5.png'; // ハムスターの画像3
import ham4 from '../img/animal_hamster4.png'; // ハムスターの画像4
import ham5 from '../img/animal_hamster3.png'; // ハムスターの画像5
import ham6 from '../img/animal_hamster2.png'; // ハムスターの画像6
import Animal_ball from './Animal_ball'; // Animal_ballコンポーネントのインポート
import { Box } from '@mui/material'; // Material UIのBoxコンポーネントのインポート

// ハムスターの辞書型を定義
type HamsterDictionary = {
  [key: number]: { 
    id: number;
    radius: number;
    image: string;
    drop: boolean;
    top: number;
    left: number;
    stopped: boolean;
  };
}


// ハムスターのリストを定義
const hamsterImages = [
  ham1,
  ham2,
  ham3,
  ham4,
  ham5,
  ham6,
];

// ハムスターの型を定義
export type Hamster = {
  id: number;
  radius: number;
  image: string; // 画像パスを追加
  drop: boolean;
  top: number;
  left: number;
  stopped: boolean; // ハムスターの停止状態を追加
}

// ハムスターの初期リストを定義
const Hamsters : Hamster[] = [
  { id: 0, radius: 25,  image: ham1, drop: false, top: 0, left: 0, stopped: false },
  { id: 1, radius: 50,  image: ham2, drop: false, top: 0, left: 0, stopped: false },
  { id: 2, radius: 75,  image: ham3, drop: false, top: 0, left: 0, stopped: false },
  { id: 3, radius: 100, image: ham4, drop: false, top: 0, left: 0, stopped: false },
  { id: 4, radius: 125, image: ham5, drop: false, top: 0, left: 0, stopped: false },
  { id: 5, radius: 150, image: ham6, drop: false, top: 0, left: 0, stopped: false },
];

interface RectangleProps {
  getRandomNumber: () => void;
  Changecurrent: () => void;
  current:string;
}

// Rectangleコンポーネントを定義
const Rectangle: React.FC<RectangleProps> = ({ getRandomNumber,Changecurrent,current}) => {
  const screenWidth:number = window.innerWidth; // 画面の幅を取得
  const basketWidth:number = 450; // バスケットの幅
  const basketHeight:number = 500; // バスケットの高さ
  const basketTop:number = 0; // バスケットの上位置
  const basketleft:number = ((screenWidth/2) - 225); // バスケットの左位置
  const owlSize:number = 100; // フクロウのサイズ
  const hamsterradius:number = 25; // ハムスターの初期半径
  const widthMove:number = 20; // 移動量
  const [owlLeft, setOwlLeft] = useState<number>((screenWidth - owlSize) / 2); // フクロウの初期位置の状態
  const [hamsters, setHamsters] = useState<HamsterDictionary>({
    0: { id: 0, radius: hamsterradius, image: ham1, drop: false, top: 0, left: (screenWidth - owlSize) / 2, stopped: false }
  }); // ハムスターの状態を辞書で管理
  const [nextHamsterId, setNextHamsterId] = useState(1); // 次のハムスターのIDを管理

  // マウス移動時の処理
  const handleMouseMove = (event: MouseEvent) => {
    const mouseX = event.clientX;
    setOwlLeft(Math.max(basketleft - 10, Math.min(basketleft + 390, mouseX - owlSize / 2)));
    setHamsters(prevHamsters => {
      const updatedHamsters = { ...prevHamsters };
      Object.keys(updatedHamsters).forEach(key => {
        if (!updatedHamsters[parseInt(key)].drop) {
          updatedHamsters[parseInt(key)].left = Math.max(basketleft - 10, Math.min(basketleft + 390, mouseX - owlSize / 2));
        }
      });
      return updatedHamsters;
    });
  };

  // マウスクリック時の処理
  const handleMouseClick = () => {
    setHamsters(prevHamsters => {
      const updatedHamsters = { ...prevHamsters };
  
      // 最後のハムスターを落とす
      const lastHamsterId = Object.keys(updatedHamsters).length - 1;
      updatedHamsters[lastHamsterId].drop = true;
      // 更新されたハムスターの位置を設定
      updatedHamsters[lastHamsterId].left = owlLeft;
      // 新しいハムスターを追加
      updatedHamsters[nextHamsterId] = { id: nextHamsterId, radius: hamsterradius, image: hamsterImages[nextHamsterId % hamsterImages.length], drop: false, top: 0, left: owlLeft, stopped: false };
      setNextHamsterId(nextHamsterId + 1);
      Changecurrent();
      getRandomNumber();
  
      // ログを追加してデバッグ情報を確認
      console.log("Updated Hamsters:", updatedHamsters);
      console.log(`Next Hamster ID: ${nextHamsterId}`);
      console.log("left",{owlLeft})
      
      return updatedHamsters;
    });
  };
  
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
    };
  }, [owlLeft, hamsters, nextHamsterId]); // 依存配列に必要な状態を追加

  return (
    <>
      <div className="basket"></div> {/* バスケットを表示 */}

      <Box
        component="img"
        src={owlImage}
        alt="フクロウ"
        height={owlSize}
        width={owlSize}
        sx={{ position: 'absolute', top: '10px', left: `${owlLeft}px` }}
      /> {/* フクロウの画像を表示 */}

      {Object.values(hamsters).map(hamster => (
        <Animal_ball
          key={hamster.id}
          owlLeft={hamster.drop ? hamster.left : owlLeft}
          basketHeight={basketHeight}
          dropHamster={hamster.drop}
          image={hamsterImages}
          id={hamster.id}
          hamsters={hamsters}
          radius={hamster.radius}
        />
      ))} {/* 各ハムスターのAnimal_ballコンポーネントをレンダリング */}
    </>
  );
}

export default Rectangle; // Rectangleコンポーネントをエクスポート
