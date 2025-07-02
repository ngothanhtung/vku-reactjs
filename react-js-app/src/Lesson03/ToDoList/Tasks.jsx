import React from 'react';
import Task from './Task';

export default function Tasks({ tasks, onDeleted, onCompleted }) {
  return (
    <div>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDeleted={onDeleted} onCompleted={onCompleted} />
      ))}
    </div>
  );
}
