import { ApiSuccess, Todo } from '@/lib/types';

export interface CreateTaskParams {
  title: string;
  notes?: string;
  dueDate?: string;
  tags?: string[];
  order?: number;
}

export default async function createTask(params: CreateTaskParams): Promise<Todo> {
  console.log('params', params);
  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  console.log('response', response);

  // if (!response.s) {
  //   throw new Error('Failed to create task');
  // }

  const result: ApiSuccess<Todo> = await response.json();
  return result.data;
}
