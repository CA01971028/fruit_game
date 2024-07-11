// Animal_ball.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Hamster } from './Rectangle';

interface AnimalBallProps {
  owlLeft: number;
  basketHeight: number;
  basketLeft: number;
  basketWidth: number;
  dropHamster: boolean;
  image: string[];
  id: number;
  radius: number;
  hamsters: { [key: number]: Hamster };
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
};

const calculateAngle = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.atan2(y2 - y1, x2 - x1);
};

export const useBallMovement = (
  initialTop: number,
  initialSpeed: number,
  basketHeight: number,
  basketLeft: number,
  basketWidth: number,
  dropHamster: boolean,
  id: number,
  radius: number,
  hamsters: { [key: number]: Hamster },
  owlLeft: number,
  setScore: React.Dispatch<React.SetStateAction<number>>,
  image: string[]
) => {
  const [topPosition, setTopPosition] = useState(140);
  const [leftPosition, setLeftPosition] = useState(owlLeft);
  const [speedX, setSpeedX] = useState(0);
  const [speedY, setSpeedY] = useState(initialSpeed);
  const [hasDropped, setHasDropped] = useState(false);
  const gravity = 0.7;
  const bounceFactor = 0.2;
  const minSpeed = 0.4;
  const friction = 0.98;

  const animateRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      if (!dropHamster) return;

      setTopPosition(prev => {
        let newPosition = prev + speedY;
        if (newPosition >= basketHeight + radius - 20) {
          newPosition = basketHeight + radius - 20;
          const newSpeedY = -speedY * bounceFactor;
          setSpeedY(Math.abs(newSpeedY) < minSpeed ? 0 : newSpeedY);
          if (Math.abs(newSpeedY) < minSpeed) {
            setHasDropped(true);
          }
        }
        return newPosition;
      });

      setLeftPosition(prev => {
        let newPosition = prev + speedX;
        if (newPosition < basketLeft + 25) {
          newPosition = basketLeft + 25;
          setSpeedX(-speedX * bounceFactor);
        } else if (newPosition > basketLeft + basketWidth - radius * 2 + 25) {
          newPosition = basketLeft + basketWidth - radius * 2 + 25;
          setSpeedX(-speedX * bounceFactor);
        }
        return newPosition;
      });

      setSpeedY(prev => (prev + gravity) * friction);
      setSpeedX(prev => prev * friction);

      let collisionDetected = false;
      Object.keys(hamsters).forEach(key => {
        const otherHamster = hamsters[parseInt(key)];
        if (otherHamster && otherHamster.id !== id && (otherHamster.drop || otherHamster.stopped) && otherHamster.visible) {
          const distance = calculateDistance(leftPosition, topPosition, otherHamster.left, otherHamster.top);
          const minDistance = radius + otherHamster.radius;
          if (distance < minDistance) {
            collisionDetected = true;

            const angle = calculateAngle(leftPosition, topPosition, otherHamster.left, otherHamster.top);
            const speedX1 = Math.cos(angle) * (minDistance - distance) * bounceFactor;
            const speedY1 = Math.sin(angle) * (minDistance - distance) * bounceFactor;

            setSpeedY(prev => prev - speedY1);
            setSpeedX(prev => prev - speedX1);

            const overlap = minDistance - distance;
            const moveX = overlap * Math.cos(angle) / 2;
            const moveY = overlap * Math.sin(angle) / 2;

            setTopPosition(prev => prev - moveY);
            setLeftPosition(prev => prev - moveX);
            if (hamsters[otherHamster.id]) {
              hamsters[otherHamster.id].left += moveX;
              hamsters[otherHamster.id].top += moveY;
            }

            // 同じ画像の種類同士が衝突した場合の処理
            if (hamsters[id] && hamsters[otherHamster.id] && hamsters[id].image === otherHamster.image) {
              // ハムスターを削除する前にスコアを増加
              const scoreIncrement = getScoreIncrement(hamsters[id].image, image);
              setScore(prev => prev + scoreIncrement);

              // ハムスターを非表示にし、停止状態に設定
              hamsters[id].visible = false;
              hamsters[id].stopped = true;
              hamsters[otherHamster.id].visible = false;
              hamsters[otherHamster.id].stopped = true;
            }
          }
        }
      });

      if (!collisionDetected) {
        animateRef.current = requestAnimationFrame(animate);
      } else {
        setSpeedY(prev => prev + gravity);
        animateRef.current = requestAnimationFrame(animate);
      }
    };

    if (dropHamster) {
      animateRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animateRef.current) {
        cancelAnimationFrame(animateRef.current);
      }
    };
  }, [dropHamster, speedX, speedY, basketHeight, basketLeft, basketWidth, owlLeft, hamsters, id, radius, setScore, image]);

  useEffect(() => {
    if (!dropHamster) {
      setLeftPosition(owlLeft);
    }
  }, [owlLeft, dropHamster]);

  useEffect(() => {
    if (dropHamster) {
      const updatedHamsters = { ...hamsters };
      if (updatedHamsters[id]) {
        updatedHamsters[id].top = topPosition;
        updatedHamsters[id].left = leftPosition;
        updatedHamsters[id].stopped = hasDropped;
      }
    }
    console.log(topPosition)
  }, [topPosition, leftPosition, hasDropped, dropHamster, hamsters, id]);

  return { topPosition, leftPosition };
};

const getScoreIncrement = (image: string, images: string[]) => {
  switch (image) {
    case images[0]:
      return 50;
    case images[1]:
      return 60;
    case images[2]:
      return 70;
    case images[3]:
      return 80;
    case images[4]:
      return 90;
    default:
      return 0;
  }
};

const Animal_ball: React.FC<AnimalBallProps> = (props) => {
  const { owlLeft, basketHeight, basketLeft, basketWidth, dropHamster, image, id, hamsters, radius, score, setScore } = props;
  const { topPosition, leftPosition } = useBallMovement(0, 2, basketHeight, basketLeft, basketWidth, dropHamster, id, radius, hamsters, owlLeft, setScore, image);
//   // ゲームオーバー条件のチェック
// useEffect(() => {
//   if (topPosition <= 0) {
//   alert('Game Over');
//   }
//   }, [topPosition, basketHeight, radius]);

  return (
    <div
      style={{
        position: 'absolute',
        top: `${topPosition + 20}px`,
        left: `${leftPosition + radius * 0.84}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <img
        src={image[id % image.length]}
        alt="ハムスター"
        height={radius * 2}
        width={radius * 2}
      />
    </div>
  );
}

export default Animal_ball;
