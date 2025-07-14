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
  buttonClassName = 'w-[176px] h-[40px] cursor-pointer bg-[#323542] text-[#F1F2F9] font-semibold border border-transparent active:border-[#905BFF] focus:outline-[#905BFF] active:outline-[#905BFF] rounded-none hover:bg-[#3B3E4A] transition-colors duration-300',
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
            className="text-[#F1F2F9]"
          />
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        disallowEmptySelection
        selectedKeys={selected}
        selectionMode="single"
        variant="flat"
        classNames={{
          base: 'border border-[#3B3E4A] p-0 w-[176px] bg-transparent shadow-none rounded-none -mt-[6px]',
          list: 'flex flex-col',
          emptyContent: 'text-sm text-gray-400 p-4',
        }}
        itemClasses={{
          base: 'cursor-pointer rounded-none px-3 py-2 text-[#75767F] transition-colors duration-200 data-[hover=true]:bg-[#323542] data-[hover=true]:text-[#F1F2F9]',
          wrapper:
            'data-[selected=true]:bg-[#323542] data-[selected=true]:text-[#F1F2F9] bg-transparent',
          selectedIcon: 'text-[#F1F2F9]',
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