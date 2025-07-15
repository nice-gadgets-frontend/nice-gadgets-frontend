import React from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from '@heroui/react';

type DropdownOption = {
  key: string;
  label: string;
};

type DropdownsProps = {
  label: string;
  options: DropdownOption[];
  selected: Set<string>;
  onChange: (keys: Set<string>) => void;
  buttonClassName?: string;
  itemClassName?: string;
};

export function Dropdowns({
  options,
  selected,
  onChange,
  buttonClassName = 'w-[176px] h-[40px] cursor-pointer bg-surface-2 text-primary font-semibold border border-transparent active:border-accent focus:outline-accent active:outline-accent rounded-none hover:bg-elements transition-colors duration-300',
}: DropdownsProps) {
  const selectedLabel = React.useMemo(() => {
    const selectedKey = Array.from(selected)[0];
    const match = options.find((o) => o.key === selectedKey);
    return match?.label ?? 'Select';
  }, [selected, options]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className={
            buttonClassName + ' flex justify-between items-center px-3'
          }
          disableRipple
        >
          <span>{selectedLabel}</span>
          <ChevronDown
            size={16}
            className="text-primary"
          />
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        disallowEmptySelection
        selectedKeys={selected}
        selectionMode="single"
        variant="flat"
        classNames={{
          base: 'border border-elements p-0 w-[176px] bg-transparent shadow-none rounded-none -mt-[6px]',
          list: 'flex flex-col',
          emptyContent: 'text-sm text-gray-400 p-4',
        }}
        itemClasses={{
          base: 'cursor-pointer rounded-none px-3 py-2 text-secondary transition-colors duration-200 data-[hover=true]:bg-surface-2 data-[hover=true]:text-primary',
          wrapper:
            'data-[selected=true]:bg-surface-2 data-[selected=true]:text-primary bg-transparent',
          selectedIcon: 'text-primary',
        }}
        onSelectionChange={(keys) =>
          onChange(new Set(keys as Iterable<string>))
        }
      >
        {options.map((option) => (
          <DropdownItem key={option.key}>{option.label}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
