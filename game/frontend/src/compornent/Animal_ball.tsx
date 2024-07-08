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
  hamsters: { [key: number]: Hamster },
  score: number,
  setScore: React.Dispatch<React.SetStateAction<number>>,
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
  intervalTime: number,
  basketHeight: number,
  basketLeft: number,
  basketWidth: number,
  dropHamster: boolean,
  id: number,
  radius: number,
  hamsters: { [key: number]: Hamster },
  owlLeft: number,
) => {
  const [topPosition, setTopPosition] = useState(initialTop);
  const [leftPosition, setLeftPosition] = useState(owlLeft);
  const [speedX, setSpeedX] = useState(0);
  const [speedY, setSpeedY] = useState(initialSpeed);
  const [hasDropped, setHasDropped] = useState(false);
  const gravity = 0.7;
  const bounceFactor = 0.2;
  const minSpeed = 0.4;

  const animateRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      if (!dropHamster) return;
  
      setTopPosition(prev => {
        let newPosition = prev + speedY;
        if (newPosition >= basketHeight - 60) {
          newPosition = basketHeight - 60;
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
        if (newPosition < basketLeft + radius) {
          // 左端の制限
          newPosition = basketLeft + radius;
          setSpeedX(-speedX * bounceFactor);
        } else if (newPosition > basketLeft + basketWidth - radius) {
          // 右端の制限
          newPosition = basketLeft + basketWidth - radius;
          setSpeedX(-speedX * bounceFactor);
        }
        return newPosition;
      });
  
      setSpeedY(prev => prev + gravity);
  
      let collisionDetected = false;
      Object.keys(hamsters).forEach(key => {
        const otherHamster = hamsters[parseInt(key)];
        if (otherHamster.id !== id && (otherHamster.drop || otherHamster.stopped)) {
          const distance = calculateDistance(leftPosition, topPosition, otherHamster.left, otherHamster.top);
          const minDistance = radius + otherHamster.radius;
          if (distance < minDistance) {
            collisionDetected = true;
  
            const angle = calculateAngle(leftPosition, topPosition, otherHamster.left, otherHamster.top);
            const speedX1 = Math.cos(angle) * (minDistance - distance) * bounceFactor;
            const speedY1 = Math.sin(angle) * (minDistance - distance) * bounceFactor;
  
            setSpeedY(-speedY1);
  
            const overlap = minDistance - distance;
            const moveX = overlap * Math.cos(angle) / 2;
            const moveY = overlap * Math.sin(angle) / 2;
  
            setTopPosition(prev => prev - moveY);
            setLeftPosition(prev => prev - moveX);
            hamsters[otherHamster.id].left += moveX;
            hamsters[otherHamster.id].top += moveY;
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
  }, [dropHamster, speedX, speedY, intervalTime, basketHeight]);
  

  useEffect(() => {
    if (dropHamster) {
      const updatedHamsters = { ...hamsters };
      updatedHamsters[id].top = topPosition;
      updatedHamsters[id].left = owlLeft;
      updatedHamsters[id].stopped = hasDropped;
      // console.log(`Hamster Key ${id} - Position: Top ${topPosition}, Left ${owlLeft}`);
    }
  }, [topPosition, owlLeft, hasDropped, dropHamster, hamsters, id]);

  return { topPosition, owlLeft };
};

const Animal_ball: React.FC<AnimalBallProps> = (props) => {
  const { owlLeft, basketHeight, basketLeft, basketWidth, dropHamster, image, id, hamsters, radius,score,setScore } = props;
  const { topPosition } = useBallMovement(0, 2, 50, basketHeight, basketLeft, basketWidth, dropHamster, id, radius, hamsters, owlLeft);
  

  return (
    <div
      style={{
        position: 'absolute',
        top: `${topPosition + 100 + radius}px`,
        left: `${owlLeft + radius * 1.3}px`,
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