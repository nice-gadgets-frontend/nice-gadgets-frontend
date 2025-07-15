import { Menu } from 'lucide-react';

export const MenuIcon = () => {
  return (
    //<Link to="/burger-menu" className="inline-block p-2 cursor-pointer">
    <div className="inline-block p-2 cursor-pointer">
      <Menu
        size={16}
        color='var(--color-primary)'
      />
    </div>
  );
};
