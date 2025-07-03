import React, { useState, useReducer } from 'react';
export default function CombineStateAndReducer() {
  const [name, setName] = useState('');

  const [todos, dispatch] = useReducer((state, action) => {
    if (action.type === 'add') {
      return [...state, action.payload];
    }
    if (action.type === 'remove') {
      return state.filter((todo) => todo !== action.payload);
    }
  }, []);

  return (
    <>
      <div>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={() => dispatch({ type: 'add', payload: name })}>Add</button>
      </div>
      <div>
        {todos.map((todo, index) => (
          <div key={index}>
            {todo}
            <button onClick={() => dispatch({ type: 'remove', payload: todo })}>Remove</button>
          </div>
        ))}
      </div>
    </>
  );
}
