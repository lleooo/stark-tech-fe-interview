'use client';

import { Card, CardContent, Typography } from '@mui/material';

import TaskListContent from './TaskListContent/TaskListContent';

export default function TaskList() {
  return (
    <Card sx={{ bgcolor: '#1e1e1e', color: 'white' }}>
      <CardContent>
        <div
          style={{
            padding: '10px 20px',
            height: '48px',
            borderBottom: '1px solid var(--color-grey-9215, rgba(235, 235, 235, 0.15))',
          }}
        >
          <Typography variant="h6">Tasks</Typography>
        </div>

        <TaskListContent />
      </CardContent>
    </Card>
  );
}
