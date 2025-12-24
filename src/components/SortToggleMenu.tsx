import { useState } from 'react';
import Image from 'next/image';
import ToggleMenu from './common/ToggleMenu';
import sortIcon from '@/assets/icons/sort.png';
import { Sort } from '@/lib/types';

type Type = {
  value: Sort;
  onChange: (value: Sort) => void;
};

const SortToggleMenu = ({ value, onChange }: Type) => {
  return (
    <ToggleMenu
      selectedValue={value}
      icon={<Image src={sortIcon} alt="sort" width={30} height={28} />}
      menuItems={[
        { label: 'Create at', value: 'createdAt' },
        { label: 'Due date', value: 'dueDate' },
        { label: 'Task ID', value: 'order' },
      ]}
      onSelect={(value) => onChange(value as Sort)}
    />
  );
};

export default SortToggleMenu;
