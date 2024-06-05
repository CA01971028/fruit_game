import React from 'react';
import { Box } from '@mui/material'; // MUIのBoxコンポーネントをインポート
import { useBallMovement } from './Ball_movement'; // カスタムフックをインポート

// Animal_ballコンポーネントが受け取るpropsの型を定義
interface AnimalBallProps {
  owlLeft: number;
  basketHeight: number;
  dropHamster: boolean;
  image: string;
  id: number;
  hamsters: Array<{ id: number, drop: boolean, initialLeft: number | null, topPosition: number, leftPosition: number }>;
}

// Animal_ballコンポーネントの定義
const Animal_ball: React.FC<AnimalBallProps> = (props) => {
  // propsから必要な値を取り出す
  const { owlLeft, basketHeight, dropHamster, image, id, hamsters } = props;
  // ここでコンポーネントのロジックを書く
    // ハムスターの大きさを半径として定義
  const hamsterRadius = 25; // ハムスターの半径は25px
  // カスタムフックを使用してボールの位置を取得
  const { topPosition } = useBallMovement(0, 2, 50, basketHeight, dropHamster, id,
    hamsters.map(h => ({ ...h, speed: 0 })),owlLeft, hamsterRadius);
  return (
    // MUIのBoxコンポーネントを使用して画像を表示
    <Box
      component="img" // 画像コンポーネントとして使用
      src={image} // 画像ソースをプロパティとして受け取る
      alt="ハムスター" // 画像の代替テキスト
      height={hamsterRadius * 2} // 画像の高さを設定（半径の2倍）
      width={hamsterRadius * 2} // 画像の幅を設定（半径の2倍）
      sx={{
        position: 'absolute', // 絶対位置に配置
        top: `calc(57% - 350px + 100px + ${Math.min(topPosition, basketHeight)}px)`, // ボールの縦方向の位置を計算
        left: `calc(50% - 200px + ${owlLeft + 25}px)`, // フクロウの位置にオフセットを追加して左方向の位置を計算
        transform: 'translateX(-50%)' // 水平方向の中央に位置を調整
      }}
    />
  );
}

export default Animal_ball; // Animal_ballコンポーネントをエクスポート
