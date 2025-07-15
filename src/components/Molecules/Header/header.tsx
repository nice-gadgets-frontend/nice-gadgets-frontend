import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FavouritesPageIcon } from '../../Atoms/Icons/FavouritePageIcon';
import { MenuIcon } from '../../Atoms/Icons/MenuIcon';
import { ShoppingBagIcon } from '../../Atoms/Icons/ShoppingBagIcon';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { CloseIcon } from '../../Atoms/Icons/CloseMenuIcon';
import { useInCartStore } from '../../../services/useStore/useInCartStore';
import { useFavouritesStore } from '../../../services/useStore/useFavouritesStore';
import { ThemeToggle } from '../../Atoms/Switcher/ThemeToggle';

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

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinkBase =
    'relative flex items-center h-[64px] px-1 uppercase text-[12px] tracking-[0.04em] font-[Mont-SemiBold] transition-all duration-200';
  const activeLink =
    'text-primary after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary';
  const inactiveLink = 'text-secondary hover:text-primary';

  return (
    <header className="relative bg-black text-primary h-[64px] flex items-center px-6 drop-shadow-[0_1px_1px_var(--color-surface-2)]">
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
          <nav className="hidden sm:flex gap-[32px] xl:gap-[62px]">
            {[
              { label: 'Home', path: '/home' },
              { label: 'Phones', path: '/phones' },
              { label: 'Tablets', path: '/tablets' },
              { label: 'Accessories', path: '/accessories' },
            ].map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? activeLink : inactiveLink}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Права частина: Іконки */}
        <div className="hidden sm:flex items-center gap-4">
          <NavLink
            to="/favourites"
            aria-label="Favourites"
            className={({ isActive }) =>
              `relative flex items-center h-[64px] ${
                isActive ? activeLink : inactiveLink
              }`
            }
          >
            <FavouritesPageIcon itemsInFavourites={itemsInFavouritesCount} />
          </NavLink>

          <NavLink
            to="/cart"
            aria-label="Cart"
            className={({ isActive }) =>
              `relative flex items-center h-[64px] ${
                isActive ? activeLink : inactiveLink
              }`
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

      <ThemeToggle />

      {/* Mobile Menu Panel */}
      <BurgerMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
      />
    </header>
  );
};
