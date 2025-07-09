export interface Task {
  id?: string | number;

  title: string;
  description?: string;

  start_date: Date;
  due_date?: Date;

  status: 'to_do' | 'in_progress' | 'done';
  completed_date?: Date;
  priority: 'low' | 'medium' | 'high';

  assignee_id?: number;

  created_by?: number;
  created_time: Date;

  updated_by?: number;
  updated_time: Date;
}

export interface Filter {
  status?: string;
  priority?: string;
}
