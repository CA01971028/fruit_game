import React, { useState, useEffect } from 'react';

// ボールの定義を行う
interface Ball {
  id: number;
  x: number;
  y: number;
}

// 初期ボールのリストを定義
const initialBalls: Ball[] = [
  { id: 1, x: 50, y: 60 },
  { id: 2, x: 150, y: 80 },
  { id: 3, x: 250, y: 100 },
  { id: 4, x: 350, y: 120 },
  { id: 5, x: 450, y: 140 },
];

// ボールの落下速度 (ピクセル/秒)
const fallSpeed:number = 100;

// 描画関数を書きます
const renderBall = (ball: Ball) => {
  return (
    <div
      key={ball.id}
      style={{
        position: 'absolute',
        left: `${ball.x}px`,
        top: `${ball.y}px`,
        width: '20px',
        height: '20px',
        backgroundColor: 'red',
        borderRadius: '50%',
      }}
    />
  );
};

// ボールのリストを描画関数に渡すことで全てのボールを描画するように実装します
const BallComponent: React.FC = () => {
  const [balls, setBalls] = useState<Ball[]>(initialBalls);

  useEffect(() => {
    let animationFrameId: number;

    const updatePositions = (time: number) => {
      setBalls(prevBalls =>
        prevBalls.map(ball => ({
          ...ball,
          y: ball.y + (fallSpeed * time) / 1000,
        }))
      );
      animationFrameId = requestAnimationFrame(updatePositions);
    };

    animationFrameId = requestAnimationFrame(updatePositions);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px', border: '1px solid black' }}>
      {balls.map(ball => renderBall(ball))}
    </div>
  );
};

export default BallComponent;
