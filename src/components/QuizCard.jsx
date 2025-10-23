// This component handles the sequential display of questions and choices.
import React from 'react';
import { questionsData } from '../components/Question';
import "./styles/QuizCard.css"
import cat from '../assets/cat.png';

const QuizCard = ({ currentQuestionIndex, onChoiceSelect, onGoBack }) => {
    const q = questionsData[currentQuestionIndex];
    const isFirstQuestion = currentQuestionIndex === 0;

    return (
        <div className="card-face card-back quiz-content">
            <p className="question-count">Question {currentQuestionIndex + 1} / {questionsData.length}</p>
            <h3 className="question-text">{q.question}</h3>
            <div className="choices-container">
                {q.choices.map((choice, index) => (
                    <button
                        key={index}
                        className="choice-button"
                        onClick={() => onChoiceSelect(choice.score)}
                    >
                        {choice.text}
                    </button>
                ))}
            </div>
            {!isFirstQuestion && (
                <button
                    className="back-button"
                    onClick={onGoBack}
                >
                    ← Go Back
                </button>
            )}

            <img src={cat} height={150} />
        </div>
    );
};

export default QuizCard;