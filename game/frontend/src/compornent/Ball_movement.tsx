import { useState, useEffect } from 'react';

export const useBallMovement = (initialTop: number, initialSpeed: number, intervalTime: number, basketHeight: number, dropHamster: boolean) => {
  const [topPosition, setTopPosition] = useState(initialTop);
  const [speed, setSpeed] = useState(initialSpeed);
  const gravity = 0.7; // 重力加速度
  const bounceFactor = 0.4; // 跳ね返り係数
  const minSpeed = 0.5; // 最小速度の閾値

  useEffect(() => {
    if (!dropHamster) return; // dropHamster が false の場合、何もしない
  
    const interval = setInterval(() => {
      setTopPosition(prev => {
        let newPosition = prev + speed;
        if (newPosition >= basketHeight) {
          newPosition = basketHeight;
          const newSpeed = -speed * bounceFactor;
          setSpeed(Math.abs(newSpeed) < minSpeed ? 0 : newSpeed); // 最小速度未満になったら停止
          if (Math.abs(newSpeed) < minSpeed) clearInterval(interval); // インターバルをクリアして停止
        }
        return newPosition;
      });
      setSpeed(prev => prev + gravity); // 重力を加える
    }, intervalTime);
  
    return () => clearInterval(interval);
  }, [dropHamster, speed, intervalTime, basketHeight]);
  

  return { topPosition };
};
