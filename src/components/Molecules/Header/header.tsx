import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FavouritesPageIcon } from '../../Atoms/Icons/FavouritePageIcon';
import { MenuIcon } from '../../Atoms/Icons/MenuIcon';
import { ShoppingBagIcon } from '../../Atoms/Icons/ShoppingBagIcon';
import { CloseIcon } from '../../Atoms/Icons/CloseMenuIcon';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-[#0F1121] text-[#F1F2F9] h-[64px] flex items-center px-6">
      <div className="flex justify-between items-center w-full">
        {/* Ліва частина: Лого + Навігація */}
        <div className="flex items-center gap-12">
          {/* Logo */}
          <NavLink to="/home">
            <img
              src="/gadgets/img/nice-gadgets-logo.png"
              alt="Nice Gadgets Logo"
              className="h-[32px]"
            />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex gap-6 text-[12px] tracking-[0.04em] uppercase font-[Mont-SemiBold]">
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
          </nav>
        </div>

        {/* Права частина: Icons */}
        <div className="hidden sm:flex items-center gap-4">
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
        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Menu Toggle"
          >
            {isMenuOpen ?
              <CloseIcon />
            : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-[64px] left-0 w-full bg-[#0F1121] px-6 py-4 flex flex-col gap-4 text-[14px] uppercase border-t border-[#2c2f3a] z-50 sm:hidden">
          <NavLink
            to="/home"
            onClick={closeMenu}
            className="hover:text-white text-gray-400"
          >
            Home
          </NavLink>
          <NavLink
            to="/phones"
            onClick={closeMenu}
            className="hover:text-white text-gray-400"
          >
            Phones
          </NavLink>
          <NavLink
            to="/tablets"
            onClick={closeMenu}
            className="hover:text-white text-gray-400"
          >
            Tablets
          </NavLink>
          <NavLink
            to="/accessories"
            onClick={closeMenu}
            className="hover:text-white text-gray-400"
          >
            Accessories
          </NavLink>
          <NavLink
            to="/favourites"
            onClick={closeMenu}
            className="flex items-center gap-2 hover:text-white text-gray-400"
          >
            <FavouritesPageIcon /> Favourites
          </NavLink>
          <NavLink
            to="/cart"
            onClick={closeMenu}
            className="flex items-center gap-2 hover:text-white text-gray-400"
          >
            <ShoppingBagIcon /> Cart
          </NavLink>
        </div>
      )}
    </header>
  );
};
