import React from 'react';
import { useNavigate } from 'react-router';

import TaskFilterForm, { type FilterCriteria } from '../components/TaskFilterForm';
import TaskList from '../components/TaskList';
import { data } from '../mock/index';
import { filterTasks, hasActiveFilters } from '../utils/index';

import type { Task } from '../types';
export default function Tasks() {
  const navigate = useNavigate();
  // Mock data for demonstration
  const [tasks] = React.useState<Task[]>(data || []);
  const [filters, setFilters] = React.useState<FilterCriteria>({});

  const handleEdit = (taskId: string) => {
    console.log('Edit task:', taskId);
    // TODO: Navigate to edit page or open edit modal
    navigate(`/update/${taskId}`);
  };

  // Filter tasks based on current filter criteria
  const filteredTasks = React.useMemo(() => {
    return filterTasks(tasks, filters);
  }, [tasks, filters]);

  const handleFilterChange = (newFilters: FilterCriteria) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <div>
      <section className="bg-white rounded-lg shadow-lg overflow-hidden">
        <TaskFilterForm
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          initialFilters={filters}
        />
      </section>
      {/* Separation */}

      <div className="my-4" />

      {/* Task List */}
      <section className="bg-white rounded-lg shadow-lg overflow-hidden">
        <section className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Results</h2>
              <p className="text-gray-600 mt-1">
                Manage and track all your tasks
                {hasActiveFilters(filters) && (
                  <span className="ml-2 text-sm">
                    ({filteredTasks.length} of {tasks.length} tasks shown)
                  </span>
                )}
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="overflow-x-auto">
            <TaskList tasks={filteredTasks} onEdit={handleEdit} />
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">
                {hasActiveFilters(filters) ? 'No tasks match your filters' : 'No tasks found'}
              </div>
              <div className="text-gray-400 text-sm mt-2">
                {hasActiveFilters(filters)
                  ? 'Try adjusting your filters or clear them to see all tasks'
                  : 'Create your first task to get started'}
              </div>
            </div>
          )}
        </section>
      </section>
    </div>
  );
}
