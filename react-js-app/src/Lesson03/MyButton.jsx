import React from 'react';

export default function MyButton({ text, color }) {
  const style = {
    backgroundColor: color || 'gray',
  };
  return <button style={style}>{text}</button>;
}
