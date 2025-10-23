// This component displays the final result based on the score.
import React from 'react';
import { getResult } from '../components/Question';
import "./styles/ResultCard.css"

const ResultCard = ({ totalScore }) => {
  const result = getResult(totalScore);

  return (
    // Note: The result color is applied via inline style for dynamic theming
    <div className="card-face card-back quiz-content" style={{ backgroundColor: result.color }}>
      <h2 className="result-title">Your Spirit is:</h2>
      <h1 className="result-pet">{result.title}</h1>
      <p className="result-description">{result.description}</p>
      <p className="small-text">Final Score: {totalScore}</p>
    </div>
  );
};

export default ResultCard;