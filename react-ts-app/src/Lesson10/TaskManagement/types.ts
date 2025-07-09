export interface Task {
  id: string;
  title: string;
  startDate: Date;
  dueDate?: Date;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assigneeId?: string;
  completed?: boolean;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
