// Animal_ball.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hamster } from './Rectangle';
import ham1 from '../img/hamster.png';
import ham2 from '../img/animal_hamster6.png';
import ham3 from '../img/animal_hamster5.png';
import ham4 from '../img/animal_hamster4.png';
import ham5 from '../img/animal_hamster3.png';
import ham6 from '../img/animal_hamster2.png';
import { Button} from '@mui/material';

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
  const [topPosition, setTopPosition] = useState<number>(140);
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
        if (newPosition >= basketHeight + radius - 30) {
          newPosition = basketHeight + radius - 30;
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
    // console.log(topPosition)
  }, [topPosition, leftPosition, hasDropped, dropHamster, hamsters, id]);

  return { topPosition, leftPosition };
};

const getScoreIncrement = (image: string, images: string[]) => {
  switch (image) {
    case ham1:
      return 50;
    case ham2:
      return 60;
    case ham3:
      return 70;
    case ham4:
      return 80;
    case ham5:
      return 90;
    case ham6:
      return -200;
    default:
      return 0;
  }
};

const Animal_ball: React.FC<AnimalBallProps> = (props) => {
  const { owlLeft, basketHeight, basketLeft, basketWidth, dropHamster, image, id, hamsters, radius, score, setScore } = props;
  const { topPosition, leftPosition } = useBallMovement(0, 2, basketHeight, basketLeft, basketWidth, dropHamster, id, radius, hamsters, owlLeft, setScore, image);
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();
  const submit = async () => {
    try {
      const test:number = 1
      const response = await fetch('http://localhost:5000/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: [score, test] }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        console.log('送信成功')
      } else {
        console.log('送信失敗')
      }
    } catch (error) {
      console.error("送信中にエラーが発生しました:", error);
    }
      console.log('ボタンが押されました');
    }
  // ゲームオーバー条件のチェック
  useEffect(() => {
    if (!gameOver && topPosition <= 20) {
      alert('Game Over');
      setGameOver(true);
      submit()
      navigate('/');
    }
  }, [topPosition, basketHeight, radius, gameOver]);

  return (
    <>
      <div
      style={{
        position: 'absolute',
        top: `${topPosition + 20}px`,
        left: `${leftPosition + radius * 0.725}px`,
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
    {/* <input type="button" value="スコアを送信" onClick={submit}/> */}
    </>
    
  );
}

export default Animal_ball;
