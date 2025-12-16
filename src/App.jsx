import { useEffect, useState } from 'react';
import Quiz from './components/Quiz';

import home_bg from '/assets/Personality/หน้าปก/ปกเว็บ.png';
import inQuestion_bg from '/assets/Personality/ช่วงตอบคำถาม/พื้นหลัง.png';

import { Personalities, ChoicesTable, getResult } from './components/ScoreTable';

const TOTAL_QUESTIONS = 10;
const POINTS_FOR_SINGLE = 2;
const POINTS_FOR_MULTIPLE = 1;

const PERSONALITY_TYPES = {
  Athlete: "เด็กกีฬา",
  Chill: "เด็กชิล",
  Entertain: "เด็กตลก",
  Hustle: "เด็กกิจกรรม",
  Introvert: "เด็กอินโทเวิด",
  Nerd: "เด็กเรียน",
  Top: "เด็กฮอต",
};

function App() {
  const [showContent, setShowContent] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (isFinished) {
      const results = getResult(Personalities);
      setResult(results);
    }
  }, [isFinished]);

  const updatePersonalityScores = (selectedPersonalities) => {
    const numberOfpersonality = selectedPersonalities.length;
    const points = numberOfpersonality === 1 ? POINTS_FOR_SINGLE : POINTS_FOR_MULTIPLE;

    selectedPersonalities.forEach(person => {
      const personality = Personalities.find(p => p.title === person);
      if (personality) {
        personality.score += points;
      }
    });
  };

  const handleChoiceSelect = (choice) => {
    const selectedChoice = choice.match(/[ABC]+/)[0];
    const selectedPersonalities = ChoicesTable[currentQuestion][selectedChoice];

    if (selectedPersonalities) {
      updatePersonalityScores(selectedPersonalities);
    }

    if (currentQuestion < TOTAL_QUESTIONS - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (isFinished && result) {
    const path = "./assets/Personality/ช่วงท้าย";

    return (
      <div className="h-screen overflow-y-auto bg-gray-100 py-8">
        <div className="flex flex-col items-center gap-8 px-4">
          {result.map((personality, index) => {
            const personType = PERSONALITY_TYPES[personality.title];

            return (
              <div
                key={personality.title}
                className="animate-fade-in flex flex-col items-center"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img
                  className='h-screen transition-all duration-700 ease-in-out shadow-lg rounded-lg'
                  src={`${path}/${personType}.png`}
                  alt={personType}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (showContent) {
    return (
      <div className="relative flex justify-center items-center">
        <img
          className='h-screen transition-opacity duration-500'
          src={inQuestion_bg}
          alt="background"
        />
        <Quiz
          currentQuestion={currentQuestion}
          onChoiceSelected={handleChoiceSelect}
        />
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center">
      <img
        className='h-screen transition-opacity duration-500'
        src={home_bg}
        alt="home background"
      />
      <button
        className='absolute bottom-12 w-full h-16 hover:scale-105 active:scale-95 transition-transform duration-200'
        onClick={() => setShowContent(true)}
        aria-label="Start quiz"
      />
    </div>
  );
}

export default App;