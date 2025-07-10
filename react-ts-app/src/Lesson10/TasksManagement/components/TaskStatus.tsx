import React from 'react';

import type { Task } from '../types';

export default function TaskStatus({ task }: { task: Task }) {
  const getStatusBadge = (status: Task['status']) => {
    const statusStyles = {
      to_do: 'bg-gray-100 text-gray-800 border-gray-200',
      in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
      done: 'bg-green-100 text-green-800 border-green-200',
    };

    const statusLabels = {
      to_do: 'To Do',
      in_progress: 'In Progress',
      done: 'Done',
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyles[status]}`}
      >
        {statusLabels[status]}
      </span>
    );
  };
  return <React.Fragment>{getStatusBadge(task.status)}</React.Fragment>;
}
