import React from "react";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import "../css/compornent.css";
import { useNavigate } from "react-router-dom";

import ham1 from "../img/hamster.png";
import ham2 from "../img/animal_hamster6.png";
import ham3 from "../img/animal_hamster5.png";
import ham4 from "../img/animal_hamster4.png";
import ham5 from "../img/animal_hamster3.png";
import ham6 from "../img/animal_hamster2.png";

const App: React.FC = () => {
  const hamImages = [ham1, ham2, ham3, ham4, ham5, ham6];
  const navigate = useNavigate();

  const onclick = () => {
    navigate("/account");
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 128, 0.5)",
          width: "100%",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {" "}
        <span className="mei">ハムボール</span>
        <div className="hamtotal">
          {hamImages.map((image, index) => (
            <Box
              key={index}
              className={`ham${index}`}
              sx={{
                display: "inline-block",
                position: "relative",
              }}
            >
              <img
                src={image}
                alt={`Hamster ${index}`}
                height={"100px"}
                width={"100px"}
              />
            </Box>
          ))}
        </div>
        {/* ルール説明のBox */}
        <Box
          sx={{
            backgroundColor: "#e0e0e0",
            width: "25%",
            height: "57%",
            position: "absolute", // 絶対位置指定に変更
            top: "15%", // 上からの位置
            left: "72%", // 左からの位置
            padding: "1em", // 見やすくするために余白を追加
            boxSizing: "border-box", // paddingを含めてサイズ計算する
          }}
        >
          <strong>ハムスターボールゲームのルール</strong>
          <br />
          このゲームでは、ハムスターボールを白いバケツの中に落とし、同じ種類のハムスターを重ねることでポイントを獲得できます。ハムスターの種類によってポイントの増減率が異なります。
          <br />
          <strong>ゲームの操作方法は以下の通りです:</strong>
          <br />
          <strong>&middot;</strong>
          マウスをクリックすると、クリックした場所にハムスターが落とせる！
          <br />
          <strong>&middot;</strong>
          次に落ちるハムスターは画面右上に表示されるよ！
          <br />
          <strong>&middot;</strong>
          同じ種類のハムスターを重ねると、ポイントが増える。より高得点を取れるように目指そう！
          <br />
          <strong>ゲームオーバー条件</strong>
          <br />
          <strong>&middot;</strong>
          ハムスターがフクロウの頭の位置を超えるとゲームオーバーになります。
        </Box>
        <Button
          sx={{
            position: "absolute", // 絶対位置指定に変更
            top: "65%", // 上からの位置
            left: "50%", // 左から50%の位置に配置
            transform: "translateX(-50%)", // ボタン自体の幅を考慮して中央揃え
          }}
          variant="contained"
          onClick={onclick}
        >
          START
        </Button>
      </Box>
    </>
  );
};

export default App;
