import "./styles/Card.css"

const Card = ({ onStartQuiz }) => {
  return (
    <div className="card-face card-front">
      <p className="message">Discover the spirit of your little puppies and kittens!</p>
      <button className="cta-button" onClick={onStartQuiz}>
        Start the Discovery
      </button>
    </div>
  );
};

export default Card;