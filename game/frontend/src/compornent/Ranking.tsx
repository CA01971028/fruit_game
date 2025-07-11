import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import axios from "axios";

function Ranking() {
  const [scores, setScores] = useState<number[]>([]);
  const location = useLocation(); // ★ locationオブジェクトを取得
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/data/scores")
      .then((response) => {
        setScores(response.data.scores);
      })
      .catch((error) => console.error(error));
  }, [location]);
  return (
    <div className="rounded-rectangle">
      <div>ランキング</div>

      <div>
        {/* <span className="rank">1. {scores[0]}</span>
        <br />
        <span className="rank">2. {scores[1]}</span>
        <br />
        <span className="rank">3. {scores[2]}</span>
        <br /> */}
        {/* ★ mapを使ってスコアを動的に表示する */}
        {scores.map((score, index) => (
          <span className="rank" key={index}>
            {index + 1}. {score}
            <br />
          </span>
        ))}
      </div>
    </div>
  );
}

export default Ranking;
