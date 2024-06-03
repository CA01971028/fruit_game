import React, { useState, useEffect } from 'react';

export interface Hamster {
  x: number;
  y: number;
  radius: number;
}

export const useBallMovement = (
  initialTop: number,
  initialSpeed: number,
  intervalTime: number,
  basketHeight: number,
  dropHamster: boolean
) => {
  const [topPosition, setTopPosition] = useState(initialTop); // ボールの現在の縦方向の位置を管理
  const [speed, setSpeed] = useState(initialSpeed); // ボールの現在の速度を管理
  const gravity = 0.7; // 重力加速度
  const bounceFactor = 0.2; // 跳ね返り係数
  const minSpeed = 0.4; // 最小速度の閾値
  const [hamsters, setHamsters] = useState<Hamster[]>([]); // ハムスターの情報を格納する配列

  useEffect(() => {
    if (!dropHamster) return; // dropHamster が false の場合、エフェクトを何も実行しない

    const interval = setInterval(() => {
      // ボールの位置と速度を更新
      setTopPosition(prev => {
        let newPosition = prev + speed; // ボールの新しい位置を計算
        if (newPosition >= basketHeight) { // ボールがバスケットの底に達した場合
          newPosition = basketHeight;
          const newSpeed = -speed * bounceFactor; // 速度を反転し、跳ね返り係数を掛ける
          setSpeed(Math.abs(newSpeed) < minSpeed ? 0 : newSpeed); // 最小速度未満になったら停止
          if (Math.abs(newSpeed) < minSpeed) clearInterval(interval); // 最小速度未満であればインターバルをクリアして停止
        }
        return newPosition; // 新しい位置を返す
      });
      setSpeed(prev => prev + gravity); // 重力を加えて速度を更新
    }, intervalTime); // intervalTime ごとにこの処理を繰り返す

    return () => clearInterval(interval); // クリーンアップ関数。コンポーネントがアンマウントされる時にインターバルをクリア
  }, [dropHamster, speed, intervalTime, basketHeight]); // 依存配列。これらの値が変わった時にエフェクトを再実行

  return { topPosition, hamsters }; // ボールの現在の位置とハムスターの情報を返す
};
