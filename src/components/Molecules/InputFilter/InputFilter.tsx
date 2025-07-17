import { useEffect, useState } from "react";
import { useDebounce } from "../../../services/hooks/useDebounce";

type InputFilterProps = {
  query: string;
  setQuery: (value: string) => void;
  placeholder?: string;
};

export const InputFilter = ({ query, setQuery, placeholder = 'Шукати...' }: InputFilterProps) => {
  const [localQuery, setLocalQuery] = useState(query);
  const debouncedQuery = useDebounce(localQuery, 300);

  useEffect(() => {
    setQuery(debouncedQuery.trim());
  }, [debouncedQuery, setQuery]);

  return (
    <input
      type="text"
      value={localQuery}
      onChange={(event) => setLocalQuery(event.target.value)}
      placeholder={placeholder}
      className="h-[40px] px-3 rounded-none border border-icons
      bg-surface-2 text-primary focus:outline-accent
      focus:ring-1 focus:ring-accent transition-colors duration-300"
    />
  );
};