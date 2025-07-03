import React from 'react';
import styles from './OneChoiceQuestion.module.css';
type Props = {
  question: {
    title: string;
    answers: string[];
    correctAnswer: string;
  };
};

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export default function OneChoiceQuestion({ question }: Props) {
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);

  const handleAnswerClick = (answer: string) => {
    setSelectedAnswer(answer);
    // Send data to API
  };

  return (
    <div>
      <h3>{question.title}</h3>
      <hr />
      <div className={styles.answers}>
        {question.answers.map((answer, index) => (
          <button
            key={index}
            className={styles.button}
            onClick={() => handleAnswerClick(answer)}
            style={{
              backgroundColor: selectedAnswer === answer ? 'green' : '#007bff',
            }}
          >
            {alphabet[index]}. {answer}
          </button>
        ))}
      </div>

      {/* <div className={styles.selectedAnswer}>
        {selectedAnswer && (
          <p>
            You selected: <strong>{selectedAnswer}</strong> <br />
            {selectedAnswer === question.correctAnswer ? 'Correct!' : `Wrong! The correct answer is: ${question.correctAnswer}`}
          </p>
        )}
      </div> */}
    </div>
  );
}
