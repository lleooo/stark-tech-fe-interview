import Image from 'next/image';
import ToggleMenu from './common/ToggleMenu';
import filterIcon from '@/assets/icons/filter.png';
import { TaskStatus } from '@/lib/types';

type Type = {
  value: TaskStatus;
  onChange: (value: TaskStatus) => void;
};

const StatusToggleMenu = ({ value, onChange }: Type) => {
  return (
    <ToggleMenu
      selectedValue={value}
      icon={<Image src={filterIcon} alt="filter" width={30} height={28} />}
      menuItems={[
        { label: '進行中', value: 'active' },
        { label: '已完成', value: 'completed' },
        { label: '全部任務', value: 'all' },
      ]}
      onSelect={(value) => onChange(value as TaskStatus)}
    />
  );
};

export default StatusToggleMenu;
