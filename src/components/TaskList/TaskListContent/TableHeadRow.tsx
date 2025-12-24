import { Box, TableCell, TableHead, Typography } from '@mui/material';
import { TableRow } from '@mui/material';
import Image from 'next/image';
import titleIcon from '@/assets/icons/title.png';
import dueDateIcon from '@/assets/icons/calendar.png';
import createdAtIcon from '@/assets/icons/calendar2.png';
import taskIdIcon from '@/assets/icons/link.png';

const HEAD_MAP = [
  {
    icon: titleIcon,
    label: 'Task Title',
  },
  {
    icon: dueDateIcon,
    label: 'Due Date',
  },
  {
    icon: createdAtIcon,
    label: 'Created at',
  },
  {
    icon: taskIdIcon,
    label: 'Task ID',
  },
];

export default function TableHeadRow() {
  return (
    <TableHead>
      <TableRow>
        {HEAD_MAP.map((item) => (
          <TableCell key={item.label} sx={{ width: '20%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Image src={item.icon} alt={item.label} width={12} height={12} />
              {item.label}
            </Box>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
