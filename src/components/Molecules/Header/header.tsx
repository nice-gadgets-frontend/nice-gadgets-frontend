// Navbar.tsx

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FavouritesPageIcon } from '../../Atoms/Icons/FavouritePageIcon';
import { MenuIcon } from '../../Atoms/Icons/MenuIcon';
import { ShoppingBagIcon } from '../../Atoms/Icons/ShoppingBagIcon';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { CloseIcon } from '../../Atoms/Icons/CloseMenuIcon';
import { useInCartStore } from '../../../services/useStore/useInCartStore';
import { useFavouritesStore } from '../../../services/useStore/useFavouritesStore';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemsIdsInCart = useInCartStore((state) => state.itemsIdsInCart);
  const totalItemsCount = itemsIdsInCart.reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0,
  );
  const itemIdsInFavourites = useFavouritesStore(
    (state) => state.itemsInFavourites,
  );
  const itemsInFavouritesCount = itemIdsInFavourites.length;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-[var(--color-black)] text-[var(--color-white)] h-[64px] flex items-center px-6 drop-shadow-[0_1px_1px_var(--color-surface-2)]">
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
                  'border-b-2 border-[var(--color-white)]'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-white)] border-b-2 border-transparent transition-all duration-200'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/phones"
              className={({ isActive }) =>
                isActive ?
                  'border-b-2 border-[var(--color-white)]'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-white)] border-b-2 border-transparent transition-all duration-200'
              }
            >
              Phones
            </NavLink>
            <NavLink
              to="/tablets"
              className={({ isActive }) =>
                isActive ?
                  'border-b-2 border-[var(--color-white)]'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-white)] border-b-2 border-transparent transition-all duration-200'
              }
            >
              Tablets
            </NavLink>
            <NavLink
              to="/accessories"
              className={({ isActive }) =>
                isActive ?
                  'border-b-2 border-[var(--color-white)]'
                : 'text-[var(--color-secondary)] hover:text-[var(--color-white)] border-b-2 border-transparent transition-all duration-200'
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
                'text-[var(--color-white)] border-b-2 border-[var(--color-white)]'
              : 'text-[var(--color-secondary)] hover:text-[var(--color-white)] border-b-2 border-transparent transition-all duration-200'
            }
          >
            <FavouritesPageIcon itemsInFavourites={itemsInFavouritesCount} />
          </NavLink>
          <NavLink
            to="/cart"
            aria-label="Cart"
            className={({ isActive }) =>
              isActive ?
                'text-[var(--color-white)] border-b-2 border-[var(--color-white)]'
              : 'text-[var(--color-secondary)] hover:text-[var(--color-white)] border-b-2 border-transparent transition-all duration-200'
            }
          >
            <ShoppingBagIcon totalItemsCount={totalItemsCount} />
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

      {/* Mobile Menu Panel */}
      <BurgerMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
      />
    </header>
  );
};
