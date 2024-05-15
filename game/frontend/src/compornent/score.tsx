import React from 'react';

function Score() {
  return (
    <div className="score-container">
      <svg width="200" height="200" className="score-svg">
        {/* 赤い円 */}
        <circle cx="100" cy="100" r="90" className="red-circle" />

        {/* スコア */}
        <text x="50%" y="35%" fontSize="30" fill="black" textAnchor="middle" className="score-text">
          スコア
        </text>
        <text x="50%" y="50%" fontSize="40" fill="black" textAnchor="middle" className="score-text">
          200
        </text>
        <text x="50%" y="60%" fontSize="20" fill="black" textAnchor="middle" className="score-text">
          ベストスコア
        </text>
        <text x="50%" y="75%" fontSize="40" fill="black" textAnchor="middle" className="score-text">
          500
        </text>
      </svg>
    </div>
  )
}

export default Score;
