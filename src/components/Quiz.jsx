const BASE_PATH = 'assets/Personality All/2.ส่วนกลาง';
const CHOICES = ['ก.png', 'ข.png', 'ค.png', 'ง.png', 'จ.png', 'ฉ.png', 'ช.png'];

const Quiz = ({ currentQuestion, onChoiceSelected }) => {
    const questionImagePath = `${BASE_PATH}/ข้อ ${currentQuestion + 1}/คำถาม.png`;
    const choicesPath = `${BASE_PATH}/ข้อ ${currentQuestion + 1}/ช้อยล่าสุด`;

    return (
        <div className="absolute flex flex-col items-center max-[560px]:scale-90 max-[410px]:scale-80 max-[350px]:scale-70">
            <img
                className="w-[400px] h-auto mx-auto"
                src={questionImagePath}
                alt={`Question ${currentQuestion + 1}`}
                key={currentQuestion}
            />

            <div className="flex flex-col items-center gap-4">
                {CHOICES.map((choice, choiceIndex) => {
                    return (
                        <button
                            key={`question-${currentQuestion}-choice-${choiceIndex}`}
                            onClick={() => onChoiceSelected(choice)}
                            className={`-mb-5 hover:scale-105`}
                        >
                            <img
                                className={`w-[265px] h-auto`}
                                src={`${choicesPath}/${choice}`}
                                alt={`Choice ${String.fromCharCode(65 + choiceIndex)}`}
                            />
                        </button>
                    );
                })}
            </div>

            <div className="h-16" />  {/* enough space for the button */}
        </div>
    );
};

export default Quiz;