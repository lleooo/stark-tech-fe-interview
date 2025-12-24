import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateTask from '@/actions/todo/updateTask';
import { Task } from '@/actions/todo/getTasks';
import { Todo } from '@/lib/types';

type UpdateTaskData = Partial<Pick<Todo, 'completed' | 'dueDate' | 'title' | 'notes'>>;

interface UpdateTaskVariables {
  id: string;
  data: UpdateTaskData;
}

export default function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onMutate: async ({ id, data }: UpdateTaskVariables) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const queries = queryClient.getQueriesData<Task>({ queryKey: ['tasks'] });
      const [queryKey, previousTasks] = queries[0] || [];

      if (queryKey && previousTasks) {
        const newData = {
          items: previousTasks.items.map((task) => (task.id === id ? { ...task, ...data } : task)),
        };
        queryClient.setQueryData<Task>(queryKey, newData);
      }
      return { previousTasks, queryKey };
    },
    onError: (err, variables, context) => {
      if (context?.previousTasks && context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousTasks);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}
