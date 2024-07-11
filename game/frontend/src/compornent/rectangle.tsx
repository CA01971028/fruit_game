// Rectangle.tsx
import React, { useState, useEffect } from 'react';
import owlImage from '../img/owl.png';
import ham1 from '../img/hamster.png';
import ham2 from '../img/animal_hamster6.png';
import ham3 from '../img/animal_hamster5.png';
import ham4 from '../img/animal_hamster4.png';
import ham5 from '../img/animal_hamster3.png';
import Animal_ball from './Animal_ball';
import { Box } from '@mui/material';

type HamsterDictionary = {
  [key: number]: {
    id: number;
    radius: number;
    image: string;
    drop: boolean;
    top: number;
    left: number;
    stopped: boolean;
    visible: boolean;
  };
}

const hamsterImages = [
  ham1,
  ham2,
  ham3,
  ham4,
  ham5,
];

export type Hamster = {
  id: number;
  radius: number;
  image: string;
  drop: boolean;
  top: number;
  left: number;
  stopped: boolean;
  visible: boolean;
}

const Hamsters: Hamster[] = [
  { id: 0, radius: 25,  image: ham1, drop: false, top: 0, left: 0, stopped: false, visible: true },
  { id: 1, radius: 50,  image: ham2, drop: false, top: 0, left: 0, stopped: false, visible: true },
  { id: 2, radius: 75,  image: ham3, drop: false, top: 0, left: 0, stopped: false, visible: true },
  { id: 3, radius: 100, image: ham4, drop: false, top: 0, left: 0, stopped: false, visible: true },
  { id: 4, radius: 125, image: ham5, drop: false, top: 0, left: 0, stopped: false, visible: true },
];

interface RectangleProps {
  getRandomNumber: () => void;
  Changecurrent: () => void;
  current: string;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const Rectangle: React.FC<RectangleProps> = ({ getRandomNumber, Changecurrent, current ,score, setScore }) => {
  const screenWidth: number = window.innerWidth;
  const basketWidth: number = 450;
  const basketHeight: number = 500;
  const basketTop: number = 0;
  const basketLeft: number = ((screenWidth / 2) - 225);
  const owlSize: number = 100;
  const widthMove: number = 20;
  const hamsterradius: number = 40;
  const [owlLeft, setOwlLeft] = useState<number>((screenWidth - owlSize) / 2);
  const [hamsters, setHamsters] = useState<HamsterDictionary>({
    0: { id: 0, radius: hamsterradius, image: current, drop: false, top: 0, left: (screenWidth - owlSize) / 2, stopped: false, visible: true }
  });

  const [nextHamsterId, setNextHamsterId] = useState(1);
  const [isCooldown, setIsCooldown] = useState(false);

  const handleMouseMove = (event: MouseEvent) => {
    const mouseX = event.clientX;
    setOwlLeft(Math.max(basketLeft, Math.min(basketLeft + 380, mouseX - owlSize / 2)));
    setHamsters(prevHamsters => {
      const updatedHamsters = { ...prevHamsters };
      Object.keys(updatedHamsters).forEach(key => {
        if (!updatedHamsters[parseInt(key)].drop) {
          updatedHamsters[parseInt(key)].left = Math.max(basketLeft, Math.min(basketLeft + 380, mouseX - owlSize / 2));
        }
      });
      return updatedHamsters;
    });
  };

  const handleMouseClick = () => {
    if (!isCooldown) {
      Changecurrent();
      setIsCooldown(true);
      setTimeout(() => {
        setIsCooldown(false);
      }, 300); // 0.3 seconds cooldown
    }
  };

  useEffect(() => {
    if (current) {
      setHamsters(prevHamsters => {
        const updatedHamsters = { ...prevHamsters };
        const lastHamsterId = Object.keys(updatedHamsters).length - 1;
        if (updatedHamsters[lastHamsterId]) {
          updatedHamsters[lastHamsterId].drop = true;
          updatedHamsters[lastHamsterId].left = owlLeft;
        }
        updatedHamsters[nextHamsterId] = { id: nextHamsterId, radius: hamsterradius, image: current, drop: false, top: 0, left: owlLeft, stopped: false, visible: true };
        setNextHamsterId(nextHamsterId + 1);
        return updatedHamsters;
      });
      getRandomNumber();
      console.log(current)
    }
  }, [current]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleMouseClick);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleMouseClick);
    };
  }, [owlLeft, hamsters, nextHamsterId, isCooldown]);

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
        hamster.visible && (
          <Animal_ball
            key={hamster.id}
            owlLeft={hamster.drop ? hamster.left : owlLeft}
            basketHeight={basketHeight}
            basketLeft={basketLeft}
            basketWidth={basketWidth}
            dropHamster={hamster.drop}
            image={[hamster.image]}
            id={hamster.id}
            hamsters={hamsters}
            radius={hamster.radius}
            score={score}
            setScore={setScore}
          />
        )
      ))} {/* 各ハムスターのAnimal_ballコンポーネントをレンダリング */}
    </>
  );
}

export default Rectangle;