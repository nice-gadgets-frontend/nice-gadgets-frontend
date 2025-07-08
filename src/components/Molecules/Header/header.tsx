import { NavLink } from 'react-router-dom';
import { FavouritesPageIcon } from '../../Atoms/Icons/FavouritePageIcon';
import { MenuIcon } from '../../Atoms/Icons/MenuIcon';
import { ShoppingBagIcon } from '../../Atoms/Icons/ShoppingBagIcon';

export const Navbar = () => {
  return (
    <header className="bg-[#0f1121] text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <img
          src="/gadgets/img/nice-gadgets-logo.png"
          alt="nice gadgets logo"
        />
        <nav className="flex gap-6 items-center">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `uppercase text-sm pb-1 border-b-2 font-medium tracking-wide transition-all duration-200 ${
                isActive ? 'border-white' : (
                  'border-transparent text-gray-400 hover:text-white'
                )
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/phones"
            className={({ isActive }) =>
              `uppercase text-sm pb-1 border-b-2 font-medium tracking-wide transition-all duration-200 ${
                isActive ? 'border-white' : (
                  'border-transparent text-gray-400 hover:text-white'
                )
              }`
            }
          >
            Phones
          </NavLink>

          <NavLink
            to="/tablets"
            className={({ isActive }) =>
              `uppercase text-sm pb-1 border-b-2 font-medium tracking-wide transition-all duration-200 ${
                isActive ? 'border-white' : (
                  'border-transparent text-gray-400 hover:text-white'
                )
              }`
            }
          >
            Tablets
          </NavLink>

          <NavLink
            to="/accessories"
            className={({ isActive }) =>
              `uppercase text-sm pb-1 border-b-2 font-medium tracking-wide transition-all duration-200 ${
                isActive ? 'border-white' : (
                  'border-transparent text-gray-400 hover:text-white'
                )
              }`
            }
          >
            Accessories
          </NavLink>

          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              `pb-1 border-b-2 transition-all duration-200 ${
                isActive ?
                  'border-white text-white'
                : 'border-transparent text-gray-400 hover:text-white'
              }`
            }
            aria-label="Favourites"
          >
            <FavouritesPageIcon />
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `pb-1 border-b-2 transition-all duration-200 ${
                isActive ?
                  'border-white text-white'
                : 'border-transparent text-gray-400 hover:text-white'
              }`
            }
            aria-label="Cart"
          >
            <ShoppingBagIcon />
          </NavLink>

          <NavLink
            to="/Menu"
            className={({ isActive }) =>
              `pb-1 border-b-2 transition-all duration-200 ${
                isActive ?
                  'border-white text-white'
                : 'border-transparent text-gray-400 hover:text-white'
              }`
            }
            aria-label="Menu"
          >
            <MenuIcon />
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
