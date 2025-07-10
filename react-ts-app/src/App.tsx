import './App.css';

import React from 'react';

import TasksManagement from './Lesson10/TasksManagement';
import TasksManagementGuidelines from './Lesson10-Guidelines';
import TasksManagementWithAntd from './Lesson10-Antd';

function App() {
  return (
    <React.Fragment>
      {/* <TasksManagement /> */}
      {/* <TasksManagementGuidelines /> */}
      <TasksManagementWithAntd />
    </React.Fragment>
  );
}

export default App;
