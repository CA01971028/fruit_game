//Ball_movement.tsx
import React, { useState, useEffect } from 'react';

interface Hamster {
  id: number;
  drop: boolean;
  top: number;
  left: number;
  speed: number;
  stopped: boolean; // ハムスターの停止状態を追加
}

export const useBallMovement = (
  initialTop: number,
  initialSpeed: number,
  intervalTime: number,
  basketHeight: number,
  dropHamster: boolean,
  id: number,
  hamsters: Array<Hamster>, // 修正：Hamsterの配列を使う
  owlLeft: number,
  hamsterRadius: number
) => {
  const [topPosition, setTopPosition] = useState(initialTop);
  const [speed, setSpeed] = useState(initialSpeed);
  const gravity = 0.7;
  const bounceFactor = 0.2;
  const minSpeed = 0.4;

  useEffect(() => {
    if (!dropHamster) return;

    const interval = setInterval(() => {
      setTopPosition(prev => {
        let newPosition = prev + speed;
        if (newPosition >= basketHeight - 40) {
          newPosition = basketHeight - 40;
          const newSpeed = -speed * bounceFactor;
          setSpeed(Math.abs(newSpeed) < minSpeed ? 0 : newSpeed);
          if (Math.abs(newSpeed) < minSpeed) clearInterval(interval);
        }
        return newPosition;
      });

      setSpeed(prev => prev + gravity);
    },intervalTime);

    return () => clearInterval(interval);
  }, [dropHamster, speed, intervalTime, basketHeight, id, owlLeft, hamsters]);

  return { topPosition, hamsters };
};
