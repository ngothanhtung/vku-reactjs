import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import TaskFilterForm from '../components/TaskFilterForm';
import TaskList from '../components/TaskList';
import { searchTasks } from '../utils';

import type { Filter, Task } from '../types';
import { getTasks } from '../services';

export default function Tasks() {
  const navigate = useNavigate();
  // Mock data for demonstration
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [filters, setFilters] = React.useState<Filter>({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleSearch = (newFilters: Filter) => {
    setFilters(newFilters);
  };

  const handleEdit = (taskId: string | number | undefined) => {
    navigate(`/update/${taskId}`);
  };

  return (
    <div>
      <section className="bg-white rounded-lg shadow-lg overflow-hidden">
        <TaskFilterForm onSearch={handleSearch} />
      </section>

      <div className="my-4" />

      {/* Task List */}
      <section className="bg-white rounded-lg shadow-lg overflow-hidden">
        <section className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Our tasks</h2>
              <p className="text-gray-600 mt-1">Manage and track all our tasks</p>
            </div>
          </div>
        </section>

        <section>
          <div className="overflow-x-auto">
            <TaskList tasks={searchTasks(tasks, filters)} onEdit={handleEdit} />
          </div>
        </section>
      </section>
    </div>
  );
}
