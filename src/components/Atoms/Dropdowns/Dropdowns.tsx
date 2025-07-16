import React from 'react';
import { ChevronDown } from 'lucide-react';
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Button,
// } from '@heroui/react';
import { DropdownMenu } from 'radix-ui';
import './Dropdowns.css';
// import '../'

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
  buttonClassName = 'cursor-pointer text-primary font-semibold rounded-none hover:bg-elements transition-colors duration-300',
}: DropdownsProps) {
  const selectedLabel = React.useMemo(() => {
    const selectedKey = Array.from(selected)[0];
    const match = options.find((o) => o.key === selectedKey);
    return match?.label ?? 'Select';
  }, [selected, options]);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [menuWidth, setMenuWidth] = React.useState<number | undefined>(
    undefined,
  );

  React.useEffect(() => {
    if (buttonRef.current) {
      setMenuWidth(buttonRef.current.offsetWidth);
    }
  }, [selectedLabel]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          ref={buttonRef}
          className={`IconButton flex justify-between px-3 items-center border border-icons ${buttonClassName}`}
          aria-label="Customise options"
        >
          {selectedLabel}
          <ChevronDown
            size={16}
            className="text-primary"
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="DropdownMenuContent"
          style={{ width: menuWidth }}
        >
          {options.map((option) => (
            <DropdownMenu.Item
              onSelect={() => {
                onChange(new Set([option.key]));
              }}
              className={`${buttonClassName} DropdownMenuItem cursor-pointer rounded-none px-3 py-2 text-secondary transition-colors duration-200 data-[hover=true]:bg-surface-2 data-[hover=true]:text-primary`}
              key={option.key}
            >
              {option.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
