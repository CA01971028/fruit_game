// Animal_ball.tsx
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material'; // MUIのBoxコンポーネントをインポート

// Animal_ballコンポーネントが受け取るpropsの型を定義
interface AnimalBallProps {
  owlLeft: number;
  basketHeight: number;
  dropHamster: boolean;
  image: string;
  id: number;
  radius: number;
  hamsters: Array<{ id: number, radius: number, drop: boolean, top: number, left: number, stopped: boolean }>;
}

export const useBallMovement = (
  initialTop: number,
  initialSpeed: number,
  intervalTime: number,
  basketHeight: number,
  dropHamster: boolean,
  id: number,
  hamsters: Array<{ id: number, radius: number, drop: boolean, top: number, left: number, stopped: boolean }>,
  owlLeft: number,
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

// Animal_ballコンポーネントの定義
const Animal_ball: React.FC<AnimalBallProps> = (props) => {
  // propsから必要な値を取り出す
  const { owlLeft, basketHeight, dropHamster, image, id, hamsters, radius } = props;
  // ここでコンポーネントのロジックを書く
  // カスタムフックを使用してボールの位置を取得
  const { topPosition } = useBallMovement(0, 2, 50, basketHeight, dropHamster, id,
    hamsters.map(h => ({ ...h, speed: 0, topPosition: h.top, leftPosition: h.left, stopped: h.stopped })), owlLeft);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${topPosition + 100 + radius}px`,
        left: `${owlLeft + radius * 2}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <img
        src={image}
        alt="ハムスター"
        height={radius * 2}
        width={radius * 2}
      />
    </div>
  );
}

export default Animal_ball; // Animal_ballコンポーネントをエクスポート
