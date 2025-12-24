import {
  Checkbox,
  Table,
  TableBody,
  TableRow,
  TableContainer,
  TableHead,
  TableCell,
  Box,
  Typography,
} from '@mui/material';
import circleIcon from '@/assets/icons/circle.png';
import checkCircleIcon from '@/assets/icons/circle-check.png';
import { Todo } from '@/lib/types';
import { Task } from '@/actions/todo/getTasks';
import { formatDate, isOverdue } from '@/lib/date';
import useUpdateTask from '@/hooks/useUpdateTask';
import { useState } from 'react';
import CreateTaskRow from './CreateTaskRow';
import useCreateTask from '@/hooks/useCreateTask';
import BasicDateTimePicker from '@/components/common/DateTimePicker';
import TitleCell from './TitleCell';
import TableHeadRow from './TableHeadRow';
import dayjs from 'dayjs';

export default function TaskTable({ tasks }: { tasks: Task }) {
  const [showCreateCol, setShowCreateCol] = useState(false);
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: createTask } = useCreateTask();

  const onCheckboxChange = (task: Todo) => {
    updateTask({ id: task.id, data: { completed: !task.completed } });
  };

  return (
    <TableContainer sx={{ marginLeft: '38px' }}>
      <Table>
        <TableHeadRow />
        <TableBody>
          {tasks.items.map((task: Todo) => (
            <TableRow key={task.id}>
              <TableCell>
                <Checkbox
                  onChange={() => onCheckboxChange(task)}
                  checked={task.completed}
                  icon={<img src={circleIcon.src} alt="circle" width={16} height={16} />}
                  checkedIcon={
                    <img src={checkCircleIcon.src} alt="checkCircle" width={16} height={16} />
                  }
                  sx={{
                    width: '24px',
                  }}
                />
                <TitleCell title={task.title} id={task.id} />
              </TableCell>
              <TableCell sx={{ color: isOverdue(task.dueDate) ? 'error.main' : 'inherit' }}>
                <BasicDateTimePicker
                  value={task.dueDate ? dayjs(task.dueDate) : null}
                  onConfirm={(value) => {
                    updateTask({ id: task.id, data: { dueDate: value?.toISOString() } });
                  }}
                />
              </TableCell>
              <TableCell>{formatDate(task.createdAt)}</TableCell>
              <TableCell>{task.order}</TableCell>
            </TableRow>
          ))}
          {showCreateCol && (
            <CreateTaskRow
              onClose={() => setShowCreateCol(false)}
              onCreate={(title) => {
                createTask({ title });
              }}
            />
          )}
          <TableRow>
            <TableCell
              colSpan={4}
              sx={{ color: 'grey.200', cursor: 'pointer' }}
              onClick={() => {
                setShowCreateCol(true);
              }}
            >
              <Checkbox sx={{ visibility: 'hidden', width: '16px' }} />
              New Task
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
