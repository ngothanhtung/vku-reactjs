import React from 'react';

type Props = {};

export default function InputEventHandler({}: Props) {
  const [text, setText] = React.useState('Hello, World!');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <h3>Input Event Handler</h3>
      <label htmlFor='input-example'>Type something:</label>
      <input id='input-example' value={text} type='text' onChange={handleChange} />

      <p>Input: {text}</p>
    </div>
  );
}
