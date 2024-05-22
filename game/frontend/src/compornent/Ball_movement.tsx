import { useState, useEffect } from 'react';

export const useBallMovement = (initialTop: number, fallSpeed: number, intervalTime: number, basketHeight: number) => {
  const [topPosition, setTopPosition] = useState(initialTop);

  useEffect(() => {
    const interval = setInterval(() => {
      // ハムスターの位置がバスケットの一番下に到達したら、インターバルをクリアする
      if (topPosition >= basketHeight) {
        clearInterval(interval);
        return;
      }

      // ハムスターがバスケットの一番下に到達していない場合は、位置を更新する
      setTopPosition(prev => prev + fallSpeed);
    }, intervalTime);

    // クリーンアップ関数を返すことで、コンポーネントがアンマウントされたときにintervalをクリアします
    return () => clearInterval(interval);
  }, [fallSpeed, intervalTime, basketHeight]);

  return topPosition;
};
