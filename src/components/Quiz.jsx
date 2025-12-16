const TOTAL_QUESTIONS = 10;
const BASE_PATH = 'src/assets/Personality/ช่วงตอบคำถาม';
const CHOICES = ['ช้อย A.png', 'ช้อย B.png', 'ช้อย C.png'];

const Quiz = ({ currentQuestion, onChoiceSelected }) => {
  const questionImagePath = `${BASE_PATH}/คำถาม/คำถาม ${currentQuestion + 1}.png`;
  const choicesPath = `${BASE_PATH}/ช้อยคำตอบ/ช้อยข้อที่ ${currentQuestion + 1}`;

  return (
    <div className="absolute flex flex-col animate-fade-in">
      <img 
        className="w-[575px] h-auto transition-all duration-500" 
        src={questionImagePath}
        alt={`Question ${currentQuestion + 1}`}
        key={currentQuestion}
      />

      <div className="flex flex-col">
        {CHOICES.map((choice, choiceIndex) => (
          <button 
            key={`question-${currentQuestion}-choice-${choiceIndex}`}
            onClick={() => onChoiceSelected(choice)}
            className="mb-10 hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            <img 
              className="w-[325px] h-auto mx-auto transition-all duration-300" 
              src={`${choicesPath}/${choice}`}
              alt={`Choice ${String.fromCharCode(65 + choiceIndex)}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;