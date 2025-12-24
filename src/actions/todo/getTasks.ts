import { ApiSuccess, TaskStatus, Sort, Todo } from '@/lib/types';

export type Task = {
  items: Todo[];
};

type ParamsType = {
  status: TaskStatus;
  sort: Sort;
};

export default async function getTasks(params: ParamsType): Promise<Task> {
  const queryParams = new URLSearchParams({
    status: params.status,
    sortBy: params.sort,
  });
  const response = await fetch(`/api/todos?${queryParams}`);
  const data: ApiSuccess<Task> = await response.json();

  return data.data;
}
