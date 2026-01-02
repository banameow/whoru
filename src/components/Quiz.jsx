const BASE_PATH = 'assets/Personality All/2.ส่วนกลาง';
const CHOICES = ['ก.png', 'ข.png', 'ค.png', 'ง.png', 'จ.png', 'ฉ.png', 'ช.png'];

const Quiz = ({ currentQuestion, onChoiceSelected }) => {
    const questionImagePath = `${BASE_PATH}/ข้อ ${currentQuestion + 1}/คำถาม ${currentQuestion + 1}.png`;
    const choicesPath = `${BASE_PATH}/ข้อ ${currentQuestion + 1}/ช้อย`;

    return (
        <div className="absolute flex flex-col">
            <img
                className="w-[400px] h-auto"
                src={questionImagePath}
                alt={`Question ${currentQuestion + 1}`}
                key={currentQuestion}
            />

            <div className="flex flex-col items-center">
                {CHOICES.map((choice, choiceIndex) => {
                    return (
                        <button
                            key={`question-${currentQuestion}-choice-${choiceIndex}`}
                            onClick={() => onChoiceSelected(choice)}
                            className={`-mb-5 hover:scale-105`}
                        >
                            <img
                                className={`w-[300px] h-auto mx-auto object-cover`}
                                src={`${choicesPath}/${choice}`}
                                alt={`Choice ${String.fromCharCode(65 + choiceIndex)}`}
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Quiz;