import React from 'react';
import OneChoiceQuestion from '../OneChoiceQuestion';
const questions = [
  {
    title: 'What is the capital of France?',
    answers: ['Paris', 'London', 'Berlin', 'Madrid', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    title: 'What is the largest planet in our solar system?',
    answers: ['Earth', 'Mars', 'Jupiter', 'Saturn', 'Venus'],
    correctAnswer: 'Jupiter',
  },
  {
    title: 'What is the chemical symbol for water?',
    answers: ['H2O', 'CO2', 'O2', 'NaCl', 'C6H12O6'],
    correctAnswer: 'H2O',
  },
  {
    title: 'Who wrote "To Kill a Mockingbird"?',
    answers: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald', 'John Steinbeck'],
    correctAnswer: 'Harper Lee',
  },
  {
    title: 'What is the smallest prime number?',
    answers: ['1', '2', '3', '5', '7'],
    correctAnswer: '2',
  },
];

type Props = {};

export default function OneChoiceQuestions({}: Props) {
  return (
    <div>
      {questions.map((question, index) => (
        <OneChoiceQuestion key={index} question={question} />
      ))}
    </div>
  );
}
