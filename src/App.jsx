import { useEffect, useState, useRef } from 'react';
import Quiz from './components/Quiz';

import home_bg from '/assets/Personality All/1.ส่วนแรก/พื้นหลังหน้าแรก-no-text.png';
import inQuestion_bg from '/assets/Personality All/2.ส่วนกลาง/พื้นหลัง.png';

import start_btn from '/assets/Personality All/1.ส่วนแรก/กดเริ่ม.png';
import linktoig_btn from '/assets/Personality All/1.ส่วนแรก/ลิงค์ไอจีงาน.png';

import { Personalities, ChoicesTable, getResult } from './components/ScoreTable';

import song from '/assets/song.mp3';

const TOTAL_QUESTIONS = 10;

const PERSONALITY_TYPES = {
  Athlete: "กีฬา",
  Chill: "ชิล",
  Entertain: "ตลก",
  Hustle: "กิจกรรม",
  Introvert: "อินโทเวิด",
  Nerd: "เรียน",
  Top: "ฮอต",
};

const THAI_ALPHA = {
  A: "ก",
  B: "ข",
  C: "ค",
  D: "ง",
  E: "จ",
  F: "ฉ",
  G: "ช",
}

function App() {
  const [showContent, setShowContent] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState(null);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [volume] = useState(0.3);

  const audioRef = useRef(null);

  useEffect(() => {
    if (isFinished) {
      const results = getResult(Personalities, answerHistory, THAI_ALPHA);
      setResult(results);
    }
  }, [answerHistory, isFinished]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const SpeakerButton = ({ isPlaying, onToggle, className = '' }) => {
    return (
      <button
        onClick={onToggle}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className={`cursor-pointer hover:scale-110 transition-transform ${className}`}
      >
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            className="w-8 h-8"
          >
            <path d="M5 9v6h4l5 4V5l-5 4H5z" />
            <path d="M16.5 8.5a4 4 0 010 7" fill="none" stroke="black" strokeWidth="2" />
            <path d="M19 6a7 7 0 010 12" fill="none" stroke="black" strokeWidth="2" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            className="w-8 h-8"
          >
            <path d="M5 9v6h4l5 4V5l-5 4H5z" />
            <line x1="16" y1="8" x2="22" y2="16" stroke="black" strokeWidth="2" />
            <line x1="22" y1="8" x2="16" y2="16" stroke="black" strokeWidth="2" />
          </svg>
        )}
      </button>
    );
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const updatePersonalityScores = (selectedChoice, isAdding = true) => {
    const personalityTitle = ChoicesTable[selectedChoice];

    if (!personalityTitle) return;

    const personality = Personalities.find(p => p.title === personalityTitle);

    const adder = isAdding ? 1 : -1;
    if (personality) personality.score += adder;
  };

  const handleGoHome = () => {
    setShowContent(false)
  }

  const handleGoBack = () => {
    if (currentQuestion > 0) {
      // Remove the last answer from history
      const newHistory = [...answerHistory];

      const lastAnswer = newHistory.pop();

      // Subtract the score from the last answer
      if (lastAnswer) {
        const thaiAlpha = lastAnswer[0];
        const selectedChoice = Object.keys(THAI_ALPHA).find(
          key => THAI_ALPHA[key] === thaiAlpha
        )

        updatePersonalityScores(selectedChoice, false);
      }

      setAnswerHistory(newHistory);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleChoiceSelect = (choice) => {
    const thaiAlpha = choice[0];
    const selectedChoice = Object.keys(THAI_ALPHA).find(
      key => THAI_ALPHA[key] === thaiAlpha
    )

    updatePersonalityScores(selectedChoice, true);

    // Save the answer to history
    const newHistory = [...answerHistory];
    newHistory[currentQuestion] = choice;
    setAnswerHistory(newHistory);

    if (currentQuestion < TOTAL_QUESTIONS - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    window.scrollTo(0, 0);

    // Reset all personality scores to 0
    Personalities.forEach(personality => {
      personality.score = 0;
    });

    // Reset all states
    setCurrentQuestion(0);
    setIsFinished(false);
    setResult(null);
    setAnswerHistory([]);
    setShowContent(false);
  };

  if (isFinished && result) {
    const path = result.length === 1
      ? `./assets/Personality All/3.ส่วนท้าย/หลัก ${PERSONALITY_TYPES[result[0].title]}/${PERSONALITY_TYPES[result[0].title]}.png`
      : `./assets/Personality All/3.ส่วนท้าย/หลัก ${PERSONALITY_TYPES[result[0].title]}/${PERSONALITY_TYPES[result[0].title]} - ${PERSONALITY_TYPES[result[1].title]}.png`;

    const altText = result.length === 1
      ? PERSONALITY_TYPES[result[0].title]
      : `${PERSONALITY_TYPES[result[0].title]} - ${PERSONALITY_TYPES[result[1].title]}`;

    return (
      <div className="flex justify-center items-center flex-col">
        <audio ref={audioRef} src={song} loop volume={volume} autoPlay={isMusicPlaying} />

        <SpeakerButton
          isPlaying={isMusicPlaying}
          onToggle={toggleMusic}
          className="fixed top-4 left-4 z-50"
        />

        <div className="relative">
          <button
            className='bg-[#bb8743] text-gray-50 absolute top-0 right-1 my-2 rounded px-1 py-2 text-xs cursor-pointer hover:scale-105'
            onClick={handleRestart}
          >
            ทำแบบทดสอบอีกครั้ง
          </button>
          <img
            className='h-screen shadow-lg'
            src={path}
            alt={altText}
          />
        </div>
      </div>
    );
  }

  if (showContent) {
    return (
      <div className="relative flex justify-center items-center flex-col">
        <audio ref={audioRef} src={song} loop volume={volume} autoPlay={isMusicPlaying} />

        <SpeakerButton
          isPlaying={isMusicPlaying}
          onToggle={toggleMusic}
          className="fixed top-4 left-4 z-50"
        />

        <img
          className='h-screen'
          src={inQuestion_bg}
          alt="background"
        />

        <p className='absolute top-8 text-lg'>{`${currentQuestion + 1} / ${TOTAL_QUESTIONS} คำถาม(s)`}</p>

        <Quiz
          currentQuestion={currentQuestion}
          onChoiceSelected={handleChoiceSelect}
        />

        <button
          className='bg-amber-100 absolute bottom-2 rounded text-sm px-3 py-1 cursor-pointer hover:scale-105 hover:bg-amber-200'
          onClick={currentQuestion > 0 ? handleGoBack : handleGoHome}
        >
          ย้อนกลับ
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center h-screen">
      <audio ref={audioRef} src={song} loop volume={volume} autoPlay={isMusicPlaying} />

      <SpeakerButton
        isPlaying={isMusicPlaying}
        onToggle={toggleMusic}
        className="fixed top-4 left-4 z-50"
      />

      <img
        className='h-full w-auto'
        src={home_bg}
        alt="home background"
      />

      <button
        className='absolute w-56 bottom-1/3 translate-y-[-26px] cursor-pointer hover:scale-105'
        onClick={() => {
          setShowContent(true);
        }}
      >
        <img className='rounded max-[300px]:scale-60' src={start_btn} alt="start" />
      </button>

      <div className='absolute bottom-1/4 translate-y-5 w-56'>
        <p className='text-center text-sm'>ติดตามผลงานเพิ่มเติมได้ที่</p>
        <a className='cursor-pointer' href='https://www.instagram.com/hischool.zone/'>
          <img className='rounded max-[300px]:scale-60' src={linktoig_btn} alt="toIG" />
        </a>
      </div>

      <p className='absolute whitespace-nowrap right-1/2 bottom-1/12 -translate-y-2 translate-x-8 text-xs text-center'>
        <span className='text-base leading-8'>มาพบกันได้ที่งาน H!SCHOOL</span><br />
        วันที่ 9 มกราคม 2569 ณ ลานจามจุรี<br />
        @มหาลัยศิลปากร วิทยาเขตเพชรบุรี

      </p>
    </div>
  );
}

export default App;