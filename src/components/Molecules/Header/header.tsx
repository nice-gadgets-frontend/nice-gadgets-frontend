import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FavouritesPageIcon } from '../../Atoms/Icons/FavouritePageIcon';
import { MenuIcon } from '../../Atoms/Icons/MenuIcon';
import { ShoppingBagIcon } from '../../Atoms/Icons/ShoppingBagIcon';
import { X } from 'lucide-react';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-[#0F1121] text-[#F1F2F9] h-[64px] flex items-center">
      <div className="w-full px-8 md:w-[calc(100%-64px)] xl:w-[1136px]">
        <div className="grid grid-cols-24 gap-x-4 items-center h-full">
          {/* Logo */}
          <div className="col-span-12 md:col-start-1 md:col-span-4 flex justify-start items-center">
            <img
              src="/gadgets/img/nice-gadgets-logo.png"
              alt="Nice Gadgets Logo"
              className="h-[32px]"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:grid md:col-start-10 md:col-span-8 grid-cols-4 gap-x-[24px] text-[12px] tracking-[0.04em] uppercase font-[Mont-SemiBold]">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive ?
                  'border-b-2 border-white'
                : 'text-gray-400 hover:text-white border-b-2 border-transparent transition-all duration-200'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                isActive ?
                  'border-b-2 border-white'
                : 'text-gray-400 hover:text-white border-b-2 border-transparent transition-all duration-200'
              }
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                isActive ?
                  'border-b-2 border-white'
                : 'text-gray-400 hover:text-white border-b-2 border-transparent transition-all duration-200'
              }
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                isActive ?
                  'border-b-2 border-white'
                : 'text-gray-400 hover:text-white border-b-2 border-transparent transition-all duration-200'
              }
            >
              Accessories
            </NavLink>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex md:col-start-20 md:col-span-5 justify-end gap-x-4">
            <NavLink
              to="/favourites"
              aria-label="Favourites"
              className={({ isActive }) =>
                isActive ?
                  'text-white border-b-2 border-white'
                : 'text-gray-400 hover:text-white border-b-2 border-transparent transition-all duration-200'
              }
            >
              <FavouritesPageIcon />
            </NavLink>
            <NavLink
              to="/cart"
              aria-label="Cart"
              className={({ isActive }) =>
                isActive ?
                  'text-white border-b-2 border-white'
                : 'text-gray-400 hover:text-white border-b-2 border-transparent transition-all duration-200'
              }
            >
              <ShoppingBagIcon />
            </NavLink>
          </div>

          {/* Mobile Menu Icon */}
          <div className="col-span-12 flex justify-end items-center md:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Menu Toggle"
            >
              {isMenuOpen ?
                <X size={24} />
              : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <BurgerMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
};
