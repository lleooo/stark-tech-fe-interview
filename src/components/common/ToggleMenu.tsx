'use client';

import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import checkIcon from '@/assets/icons/check.png';

interface MenuItemOption {
  label: string;
  value: string;
  onClick?: () => void;
}

interface ToggleMenuProps {
  icon: React.ReactNode;
  menuItems: MenuItemOption[];
  selectedValue?: string;
  onSelect?: (value: string) => void;
  maxHeight?: number;
  width?: string;
}

const ITEM_HEIGHT = 48;

export default function ToggleMenu({
  icon,
  menuItems,
  selectedValue,
  onSelect,
  maxHeight = ITEM_HEIGHT * 4.5,
  width = '20ch',
}: ToggleMenuProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const toggleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (event: React.MouseEvent<HTMLElement>, item: MenuItemOption) => {
    item.onClick?.();
    onSelect?.(item.value);
    handleClose();
  };

  return (
    <>
      <IconButton
        sx={{ padding: 0, paddingLeft: '8px' }}
        aria-label="toggle menu"
        aria-controls={open ? 'toggle-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={toggleMenu}
      >
        {icon}
      </IconButton>
      <Menu
        id="toggle-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight,
              width,
            },
          },
        }}
      >
        {menuItems.map((item) => (
          <MenuItem
            key={item.value}
            selected={item.value === selectedValue}
            onClick={(event) => handleSelect(event, item)}
          >
            {item.label}
            {item.value === selectedValue && (
              <Image src={checkIcon} alt="check" width={18} height={18} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
