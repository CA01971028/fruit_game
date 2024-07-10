import {useEffect,useState} from 'react';
import axios from "axios";
import Next from './Next';

function Score() {
  const [scores,setScores] = useState<number>(200)
  const [score,setScore] = useState<number>(0)
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/data/best')
      .then((response) => {
        setScores(response.data.score);
      })
      .catch((error) => console.error(error));
  }, []);


  return (
    <>
    <div className="score-container">
      <svg width="200" height="200" className="score-svg">
        {/* 赤い円 */}
        <circle cx="100" cy="100" r="90" className="red-circle" />

        {/* スコア */}
        <text x="50%" y="35%" fontSize="30" fill="black" textAnchor="middle" className="score-text">
          スコア
        </text>
        <text x="50%" y="50%" fontSize="40" fill="black" textAnchor="middle" className="score-text">
          {score}
        </text>
        <text x="50%" y="60%" fontSize="20" fill="black" textAnchor="middle" className="score-text">
          ベストスコア
        </text>
        <text x="50%" y="75%" fontSize="40" fill="black" textAnchor="middle" className="score-text">
          {scores}
        </text>
      </svg>
    </div>
    <Next score ={score} setScore={setScore}/>
    </>
    
  )
}

export default Score;
