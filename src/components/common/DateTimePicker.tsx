import { useState, useRef } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { IconButton, Box, Typography } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import calendarIcon from '@/assets/icons/calendar.png';
import Image from 'next/image';

interface BasicDateTimePickerProps {
  value?: Dayjs | null;
  onConfirm?: (value: Dayjs | null) => void;
}

export default function BasicDateTimePicker({ value, onConfirm }: BasicDateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        {value ? (
          <Typography onClick={() => setOpen(true)} ref={anchorRef} variant="body2">
            {value.format('YYYY/MM/DD HH:mm')}
          </Typography>
        ) : (
          <IconButton
            ref={anchorRef}
            onClick={() => setOpen(true)}
            size="small"
            sx={{ color: 'grey.100' }}
          >
            <Image src={calendarIcon} alt="calendar" width={16} height={16} />
          </IconButton>
        )}

        <DateTimePicker
          open={open}
          onAccept={(value) => {
            onConfirm?.(value);
          }}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          slotProps={{
            textField: { sx: { display: 'none' } },
            popper: {
              anchorEl: anchorRef.current,
              placement: 'bottom-start',
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
