import React from 'react';

export default function ConditionalRendering() {
  const isLoggedIn = false; // Change this to false to test the other condition

  return <div>{isLoggedIn ? <strong>Hi, admin!</strong> : <button>Login</button>}</div>;
}
