import React from 'react';

type Props = {
  question: { title: string; correctAnswer: string };
};

export default function FillInTheBlankQuestion({ question }: Props) {
  const [answer, setAnswer] = React.useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (answer) {
      const isCorrect = question.correctAnswer.toLowerCase() === answer.trim().toLowerCase();
      if (isCorrect) {
        alert('Correct!');
      } else {
        alert(`Incorrect! The correct answer is: ${question.correctAnswer}`);
      }
    } else {
      alert('Please fill in the blank.');
    }
  };

  const text = question.title.split(/(___)/g);

  return (
    <div>
      {text.map((item, index) => {
        if (item === '___') {
          return (
            <div key={index} style={{ display: 'inline-block', height: 30 }}>
              <input autoComplete='off' style={{ minWidth: 30, width: 120, maxWidth: 400, fontSize: 20 }} onChange={handleChange} />
            </div>
          );
        }
        return <span key={index}>{item}</span>; // text
      })}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
