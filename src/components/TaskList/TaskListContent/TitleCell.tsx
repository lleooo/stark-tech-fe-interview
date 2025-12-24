import useUpdateTask from '@/hooks/useUpdateTask';
import { InputBase } from '@mui/material';
import { useState } from 'react';

export default function TitleCell({ title, id }: { title: string; id: string }) {
  const [value, setValue] = useState(title);
  const { mutate: updateTask } = useUpdateTask();

  return (
    <InputBase
      sx={{
        fontFamily: '"PingFang SC", "Noto Sans TC", sans-serif',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '22px',
        letterSpacing: 0,
        padding: '0 4px',
        height: '46px',
      }}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onBlur={() => setValue(title)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          updateTask({ id: id, data: { title: value } });
        }
      }}
    />
  );
}
