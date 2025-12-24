import { ApiSuccess, Todo } from '@/lib/types';

type UpdateTaskData = Partial<Pick<Todo, 'completed' | 'dueDate' | 'title'>>;

interface UpdateTaskParams {
  id: string;
  data: UpdateTaskData;
}

export default async function updateTask({ id, data }: UpdateTaskParams): Promise<Todo> {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }

  const result: ApiSuccess<Todo> = await response.json();
  return result.data;
}
