import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CloseIcon = () => {
  return (
    <Link to="/home" className="inline-block p-2 cursor-pointer">
      <X
        size={16}
        color="#F1F2F9"
      />
    </Link>
  );
};
