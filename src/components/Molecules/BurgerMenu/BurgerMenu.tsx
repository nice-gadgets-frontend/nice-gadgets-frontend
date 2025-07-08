import { NavLink, useLocation } from 'react-router-dom';
import { FavouritesPageIcon } from '../../Atoms/Icons/FavouritePageIcon';
import { ShoppingBagIcon } from '../../Atoms/Icons/ShoppingBagIcon';
import { X } from 'lucide-react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const BurgerMenu = ({ isOpen, onClose }: Props) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0F1121] flex flex-col justify-between text-[14px] uppercase z-50 md:hidden">
      <div className="flex justify-between items-center px-6 h-[64px] border-b border-[#2c2f3a]">
        <img
          src="/gadgets/img/nice-gadgets-logo.png"
          alt="Nice Gadgets Logo"
          className="h-[32px]"
        />

        <div className="flex-grow" />

        <div className="w-px h-full bg-[#2c2f3a]" />

        <button
          onClick={onClose}
          aria-label="Close Menu"
          className="w-[48px] h-full flex items-center justify-end"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex flex-col gap-6 px-8 mt-6 text-center">
        <NavLink
          to="/home"
          onClick={onClose}
          className={({ isActive }) =>
            `inline-block mx-auto hover:text-white ${
              isActive ?
                'text-white font-bold border-b-2 border-white pb-1'
              : 'text-gray-400'
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/phones"
          onClick={onClose}
          className={({ isActive }) =>
            `inline-block mx-auto hover:text-white ${
              isActive ?
                'text-white font-bold border-b-2 border-white pb-1'
              : 'text-gray-400'
            }`
          }
        >
          Phones
        </NavLink>
        <NavLink
          to="/tablets"
          onClick={onClose}
          className={({ isActive }) =>
            `inline-block mx-auto hover:text-white ${
              isActive ?
                'text-white font-bold border-b-2 border-white pb-1'
              : 'text-gray-400'
            }`
          }
        >
          Tablets
        </NavLink>
        <NavLink
          to="/accessories"
          onClick={onClose}
          className={({ isActive }) =>
            `inline-block mx-auto hover:text-white ${
              isActive ?
                'text-white font-bold border-b-2 border-white pb-1'
              : 'text-gray-400'
            }`
          }
        >
          Accessories
        </NavLink>
      </div>

      <div className="flex border-t border-[#2c2f3a] divide-x divide-[#2c2f3a]">
        <NavLink
          to="/favourites"
          onClick={onClose}
          className="w-1/2 flex justify-center py-4"
        >
          <div className="relative flex flex-col items-center">
            <FavouritesPageIcon />
            {location.pathname === '/favourites' && (
              <span className="absolute -bottom-1 w-6 border-t-2 border-white" />
            )}
          </div>
        </NavLink>
        <NavLink
          to="/cart"
          onClick={onClose}
          className="w-1/2 flex justify-center py-4"
        >
          <div className="relative flex flex-col items-center">
            <ShoppingBagIcon />
            {location.pathname === '/cart' && (
              <span className="absolute -bottom-1 w-6 border-t-2 border-white" />
            )}
          </div>
        </NavLink>
      </div>
    </div>
  );
};
