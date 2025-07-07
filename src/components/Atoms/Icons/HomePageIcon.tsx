import { House } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomePageIcon = () => {
  return (
    <Link to="/home" className="inline-block p-2 cursor-pointer">
      <House
        size={16}
        color="#F1F2F9"
      />
    </Link>
  );
};
