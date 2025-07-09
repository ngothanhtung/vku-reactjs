import './App.css';

import React from 'react';

import LoginForm from './Lesson09/LoginForm';
import Create from './Lesson09/CRUD/Create';

function App() {
  return (
    <React.Fragment>
      <LoginForm />
      <Create />
    </React.Fragment>
  );
}

export default App;
