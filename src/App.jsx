import { useState } from 'react';
import './App.css';
import { questionsData } from './components/Question';

import Card from './components/Card';
import QuizCard from './components/QuizCard';
import ResultCard from './components/ResultCard';

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const [answerHistory, setAnswerHistory] = useState([]);

  const handleStartQuiz = () => {
    setIsFlipped(true);
  };

  const handleChoiceSelect = (score) => {
    setTotalScore(prevScore => prevScore + score);
    setAnswerHistory(prevHistory => [...prevHistory, score]);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questionsData.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setIsFinished(true);
    }
  };

  const handleGoBack = () => {
    if (currentQuestionIndex > 0) {
      const lastScore = answerHistory[answerHistory.length - 1];

      setAnswerHistory(prevHistory => prevHistory.slice(0, -1));
      setTotalScore(prevScore => prevScore - lastScore);
      
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const renderCardContent = () => {
    if (!isFlipped) {
      return <Card onStartQuiz={handleStartQuiz} />;
    }

    if (isFinished) {
      return <ResultCard totalScore={totalScore} />;
    }

    // Quiz in Progress
    return (
      <QuizCard
        currentQuestionIndex={currentQuestionIndex}
        onChoiceSelect={handleChoiceSelect}
        onGoBack={handleGoBack}
      />
    );
  };

  return (
    <div className="app-container">
      <h1 className="main-title">Who R U ?</h1>
      
      {/* Main Love Card Container */}
      <div className={`love-card ${isFlipped ? 'flipped' : ''}`}>
        {renderCardContent()}
      </div>
      
      <p className="footer-text">Built with cuteness 🐾</p>
    </div>
  );
}

export default App;