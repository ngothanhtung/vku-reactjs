import './App.css';

import React from 'react';

import LoginForm from './Lesson09/LoginForm';
import Create from './Lesson09/CRUD/Create';
import LoginPage from './Lesson09-Guidelines/LoginPage';
import RegisterPage from './Lesson09-Guidelines/RegisterPage';

function App() {
  return (
    <React.Fragment>
      {/* <LoginForm />
      <Create /> */}
      {/* <LoginPage /> */}
      <RegisterPage />
    </React.Fragment>
  );
}

export default App;
