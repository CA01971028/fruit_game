import React, { useState, useEffect } from 'react';

export const useBallMovement = (
  initialTop: number,
  initialSpeed: number,
  intervalTime: number,
  basketHeight: number,
  dropHamster: boolean,
  id: number, //ハムスターボールのIDを追加
  hamsters: Array<{ id: number, drop: boolean, topPosition: number, leftPosition: number, speed:number }>, // すべてのハムスターボールの位置情報を追加
  owlLeft: number, // フクロウの位置を追加
  hamsterRadius: number // ハムスターボールの半径を追加
) => {
  const [topPosition, setTopPosition] = useState(initialTop); // ボールの現在の縦方向の位置を管理
  const [speed, setSpeed] = useState(initialSpeed); // ボールの現在の速度を管理
  const gravity = 0.7; // 重力加速度
  const bounceFactor = 0.2; // 跳ね返り係数
  const minSpeed = 0.4; // 最小速度の閾値

  useEffect(() => {
    if (!dropHamster) return; // dropHamster が false の場合、エフェクトを何も実行しない

    const interval = setInterval(() => {
      // ボールの位置と速度を更新
      setTopPosition(prev => {
        let newPosition = prev + speed; // ボールの新しい位置を計算
        if (newPosition >= basketHeight - 50) { // ボールがバスケットの底に達した場合
          newPosition = basketHeight - 50;
          const newSpeed = -speed * bounceFactor; // 速度を反転し、跳ね返り係数を掛ける
          setSpeed(Math.abs(newSpeed) < minSpeed ? 0 : newSpeed); // 最小速度未満になったら停止
          if (Math.abs(newSpeed) < minSpeed) clearInterval(interval); // 最小速度未満であればインターバルをクリアして停止
        }
        return newPosition; // 新しい位置を返す
      });
      setSpeed(prev => prev + gravity); // 重力を加えて速度を更新
      // 他のハムスターボールとの衝突を確認
    for (const hamster of hamsters) {
      if (hamster.id !== id && hamster.drop) { // 落下中のハムスターボールのみを対象にする
        const dx = hamster.leftPosition - owlLeft;
        const dy = hamster.topPosition - topPosition;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < hamsterRadius * 2) {
          console.log('衝突!');
          // ここで衝突時の処理を行う
          setSpeed(-speed * 0.9); // 速度を反転させる
          hamster.speed = -hamster.speed * 0.9;
        }
      }
    }
    }, intervalTime); // intervalTime ごとにこの処理を繰り返す

    return () => clearInterval(interval); // クリーンアップ関数。コンポーネントがアンマウントされる時にインターバルをクリア
  }, [dropHamster, speed, intervalTime, basketHeight, id, owlLeft, hamsters]); // 依存配列。これらの値が変わった時にエフェクトを再実行

  return { topPosition, hamsters }; // ボールの現在の位置とハムスターの情報を返す
};
