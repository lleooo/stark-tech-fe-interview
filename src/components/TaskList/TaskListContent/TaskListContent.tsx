import { Box, Button, Typography } from '@mui/material';
import TaskTable from './TaskTable';
import StatusToggleMenu from '@/components/StatusToggleMenu';
import SortToggleMenu from '@/components/SortToggleMenu';
import { useQuery } from '@tanstack/react-query';
import getTasks from '@/actions/todo/getTasks';
import { useState } from 'react';
import { Sort, TaskStatus } from '@/lib/types';

export default function TaskListContent() {
  const [status, setStatus] = useState<TaskStatus>('all');
  const [sort, setSort] = useState<Sort>('createdAt');

  const { data: tasks } = useQuery({
    queryKey: ['tasks', status, sort],
    queryFn: () => getTasks({ status, sort }),
  });

  if (!tasks) return <div>Loading...</div>;

  return (
    <>
      <div style={{ padding: '20px 20px 10px 20px', height: '58px' }}>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Button
            variant="outlined"
            sx={{
              height: 28,
              minWidth: 48,
              borderRadius: '6px',
              border: '1px solid rgba(80, 80, 80, 1)',
              padding: '3.5px 8px 4.5px 8px',
            }}
          >
            <Typography variant="button">+ New Task</Typography>
          </Button>
          <StatusToggleMenu value={status} onChange={setStatus} />
          <SortToggleMenu value={sort} onChange={setSort} />
        </Box>
      </div>

      <TaskTable tasks={tasks} />
    </>
  );
}
