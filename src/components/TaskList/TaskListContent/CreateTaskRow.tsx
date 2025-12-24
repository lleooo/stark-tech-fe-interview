import { TableRow, TableCell, Checkbox, InputBase, styled, tableCellClasses } from '@mui/material';
import circleIcon from '@/assets/icons/circle.png';
import checkCircleIcon from '@/assets/icons/circle-check.png';
import BasicDateTimePicker from '@/components/common/DateTimePicker';

interface CreateTaskRowProps {
  onClose: () => void;
  onCreate?: (title: string) => void;
}

export default function CreateTaskRow({ onClose, onCreate }: CreateTaskRowProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const value = (e.target as HTMLInputElement).value.trim();
      if (value) {
        onCreate?.(value);
        (e.target as HTMLInputElement).value = '';
        onClose();
      }
    }
  };

  return (
    <TableRow>
      <TableCell sx={{ color: 'grey.200' }}>
        <Checkbox
          icon={<img src={circleIcon.src} alt="circle" width={16} height={16} />}
          checkedIcon={<img src={checkCircleIcon.src} alt="checkCircle" width={16} height={16} />}
          sx={{ width: '24px' }}
        />
        <InputBase
          autoFocus
          placeholder="輸入後按下ENTER進行儲存"
          sx={{
            flex: 1,
            color: 'grey.50',
            fontSize: '14px',
            fontFamily: '"Noto Sans TC", sans-serif',
            '& input::placeholder': {
              color: 'grey.200',
              opacity: 1,
            },
          }}
          onBlur={onClose}
          onKeyDown={handleKeyDown}
        />
      </TableCell>
      <TableCell>
        <BasicDateTimePicker />
      </TableCell>
      <TableCell>{new Date().toLocaleString('zh-TW')}</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}
