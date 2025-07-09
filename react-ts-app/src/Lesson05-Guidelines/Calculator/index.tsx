import React, { useState } from 'react';
import styles from './Calculator.module.css';

const Calculator: React.FC = () => {
  const [currentOperand, setCurrentOperand] = useState('');
  const [previousOperand, setPreviousOperand] = useState('');
  const [operator, setOperator] = useState<string | null>(null);

  const appendNumber = (number: string) => {
    if (number === '.' && currentOperand.includes('.')) return;
    setCurrentOperand(prev => prev + number);
  };

  const chooseOperator = (op: string) => {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
      compute();
    } else {
      setPreviousOperand(currentOperand);
      setCurrentOperand('');
    }
    setOperator(op);
  };

  const compute = () => {
    const prev = parseFloat(previousOperand);
    const curr = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;

    let result: string | number = '';
    switch (operator) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '*':
        result = prev * curr;
        break;
      case '/':
        result = curr !== 0 ? prev / curr : 'Error';
        break;
      default:
        return;
    }

    setCurrentOperand(result.toString());
    setPreviousOperand('');
    setOperator(null);
  };

  const clear = () => {
    setCurrentOperand('');
    setPreviousOperand('');
    setOperator(null);
  };

  const handleButtonClick = (value: string) => {
    switch (value) {
      case '+':
      case '-':
      case '×':
      case '÷':
        chooseOperator(value === '×' ? '*' : value === '÷' ? '/' : value);
        break;
      case '=':
        compute();
        break;
      case 'C':
        clear();
        break;
      default:
        appendNumber(value);
        break;
    }
  };

  const buttons = [
    '7', '8', '9', '÷',
    '4', '5', '6', '×',
    '1', '2', '3', '-',
    '0', '.', 'C', '+',
  ];

  const displayText =
    previousOperand && operator
      ? `${previousOperand} ${operator} ${currentOperand}`
      : currentOperand;

  return (
    <div>
      <h3>Calculator</h3>
      <div className={styles.calculator}>
        <input
          type="text"
          className={styles.screen}
          value={displayText}
          disabled
        />
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(btn)}
            className={['+', '-', '×', '÷'].includes(btn) ? styles.operator : btn === 'C' ? styles.clear : ''}
          >
            {btn}
          </button>
        ))}
        <button onClick={() => handleButtonClick('=')} className={styles.equal}>
          =
        </button>
      </div>
    </div>
  );
};

export default Calculator;
