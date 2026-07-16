export type TaskCategory = 'PURCHASE' | 'REPAIR' | 'RENOVATION' | 'ORGANIZATION' | 'CLEANING';
export type TaskStatus = 'NEW' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: number;
  category: TaskCategory;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  location?: string;
  estimatedCost?: number;
  supplier?: string;
  dueDate?: string;
  createdDate: string;
  updatedDate?: string;
}

export interface TaskCreateRequest {
  category: TaskCategory;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  location?: string;
  estimated_cost?: number;
  supplier?: string;
  due_date?: string;
}

export interface TaskUpdateRequest extends Partial<TaskCreateRequest> {}
