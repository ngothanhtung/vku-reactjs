import React from 'react';

type Props = {
  question: { title: string; correctAnswers: string[] };
};

export default function FillInTheBlankQuestion({ question }: Props) {
  const text = question.title.split(/(___)/g);

  return (
    <div>
      {text.map((item, index) => {
        if (item === '___') {
          return (
            <div key={index} style={{ display: 'inline-block', height: 30 }}>
              <input autoComplete='off' style={{ minWidth: 30, width: 120, maxWidth: 400, fontSize: 20 }} />
            </div>
          );
        }
        return <span key={index}>{item}</span>; // text
      })}
    </div>
  );
}
