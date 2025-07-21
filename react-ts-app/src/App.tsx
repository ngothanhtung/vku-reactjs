import './App.css';

import React from 'react';

import RecoilExample from './Lesson08/RecoilExample';
import TasksManagementWithAntd from './Lesson10-Antd';
import TasksManagementGuidelines from './Lesson10-Guidelines';
import TasksManagement from './Lesson10/TasksManagement';
import TasksManagementWithZustand from './Lesson13';
import TasksManagementWithZustandAndSecurity from './Lesson13';

function App() {
  return (
    <React.Fragment>
      {/* <TasksManagement /> */}
      {/* <TasksManagementGuidelines /> */}
      {/* <TasksManagementWithAntd /> */}
      {/* <RecoilExample /> */}
      {/* <TasksManagementWithZustand /> */}
      <TasksManagementWithZustandAndSecurity />
    </React.Fragment>
  );
}

export default App;
