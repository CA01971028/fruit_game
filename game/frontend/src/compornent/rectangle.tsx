// Reactangle.tsx
import React, { useState, useEffect } from 'react';
import owlImage from '../img/owl.png';
import ham1 from '../img/hamster.png';
import ham2 from '../img/animal_hamster6.png';
import ham3 from '../img/animal_hamster5.png';
import ham4 from '../img/animal_hamster4.png';
import ham5 from '../img/animal_hamster3.png';
import ham6 from '../img/animal_hamster2.png';
import Animal_ball from './Animal_ball';
import { Box } from '@mui/material';

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
  current: string;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

// Rectangleコンポーネントを定義
const Rectangle: React.FC<RectangleProps> = ({ getRandomNumber, Changecurrent, current ,score,setScore}) => {
  const screenWidth: number = window.innerWidth;
  const basketWidth: number = 450;
  const basketHeight: number = 500;
  const basketTop: number = 0;
  const basketleft: number = ((screenWidth / 2) - 225);
  const owlSize: number = 100;
  const widthMove: number = 20;
  // const [hamsterradius, setHamsterradius] = useState<number>(40);
  const hamsterradius: number = 40;
  const [owlLeft, setOwlLeft] = useState<number>((screenWidth - owlSize) / 2);
  const [hamsters, setHamsters] = useState<HamsterDictionary>({
    0: { id: 0, radius: hamsterradius, image: current, drop: false, top: 0, left: (screenWidth - owlSize) / 2, stopped: false }
  });

  const [nextHamsterId, setNextHamsterId] = useState(1);

  // マウス移動時の処理
  const handleMouseMove = (event: MouseEvent) => {
    const mouseX = event.clientX;
    setOwlLeft(Math.max(basketleft, Math.min(basketleft + 380, mouseX - owlSize / 2)));
    setHamsters(prevHamsters => {
      const updatedHamsters = { ...prevHamsters };
      Object.keys(updatedHamsters).forEach(key => {
        if (!updatedHamsters[parseInt(key)].drop) {
          updatedHamsters[parseInt(key)].left = Math.max(basketleft, Math.min(basketleft + 380, mouseX - owlSize / 2));
        }
      });
      return updatedHamsters;
    });
  };

  // マウスクリック時の処理
  const handleMouseClick = () => {
    Changecurrent();
  };

  // currentが変更されたときの処理
  useEffect(() => {
    if (current) {
      setHamsters(prevHamsters => {
        const updatedHamsters = { ...prevHamsters };
        const lastHamsterId = Object.keys(updatedHamsters).length - 1;
        updatedHamsters[lastHamsterId].drop = true;
        updatedHamsters[lastHamsterId].left = owlLeft;
        updatedHamsters[nextHamsterId] = { id: nextHamsterId, radius: hamsterradius, image: current, drop: false, top: 0, left: owlLeft, stopped: false };
        setNextHamsterId(nextHamsterId + 1);
        return updatedHamsters;
      });
      getRandomNumber();
    }
  }, [current]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
    };
  }, [owlLeft, hamsters, nextHamsterId]);

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
          basketLeft={basketleft}
          basketWidth={basketWidth}
          dropHamster={hamster.drop}
          image={[hamster.image]}
          id={hamster.id}
          hamsters={hamsters}
          radius={hamster.radius}
          score ={score} 
          setScore={setScore}
        />
      ))} {/* 各ハムスターのAnimal_ballコンポーネントをレンダリング */}
    </>
  );
}

export default Rectangle;
