import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FavouritesPageIcon } from '../../Atoms/Icons/FavouritePageIcon';
import { MenuIcon } from '../../Atoms/Icons/MenuIcon';
import { ShoppingBagIcon } from '../../Atoms/Icons/ShoppingBagIcon';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { CloseIcon } from '../../Atoms/Icons/CloseMenuIcon';
import { useInCartStore } from '../../../services/useStore/useInCartStore';
import { useFavouritesStore } from '../../../services/useStore/useFavouritesStore';
import { ThemeToggle } from '../../Atoms/Switcher/ThemeToggle';
import { LogIn } from 'lucide-react';
import { useUserStore } from '../../../services/useStore/useUserStore';

export const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const isCheckoutPage = location.pathname === '/cart/checkout';

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const itemsIdsInCart = useInCartStore((state) => state.itemsIdsInCart);
  const totalItemsCount = itemsIdsInCart.reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0,
  );

  const itemIdsInFavourites = useFavouritesStore(
    (state) => state.itemsInFavourites,
  );
  const itemsInFavouritesCount = itemIdsInFavourites.length;

  const navLinkBase =
    'relative flex items-center h-[64px] px-1 uppercase text-[12px] tracking-[0.04em] font-[Mont-SemiBold] transition-all duration-200';
  const activeLink =
    'text-primary after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary';
  const inactiveLink = 'text-secondary hover:text-primary';

  const handleLogout = () => {
    setUser(null);
    window.location.reload();
  };

  return (
    <>
      <header className="relative border border-[var(--color-elements)] dark:border-0 bg-black text-primary h-[64px] flex items-center px-6 drop-shadow-[0_1px_1px_var(--color-surface-2)] z-40">
        <div className="flex justify-between items-center w-full">
          {/* Ліва частина */}
          <div className="flex items-center gap-12 min-w-[89px]">
            <NavLink to="/home">
              <img
                src="/gadgets/img/light-theme-nice-gadgets-logo.png"
                alt="Nice Gadgets Logo"
                className="h-[32px] block dark:hidden min-w-[89px]"
              />
              <img
                src="/gadgets/img/nice-gadgets-logo.png"
                alt="Nice Gadgets Logo"
                className="h-[32px] hidden dark:block min-w-[89px]"
              />
            </NavLink>

            {/* Desktop навігація */}
            <nav className="hidden md:flex gap-[32px] xl:gap-[62px]">
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

          {/* Іконки справа (десктоп) */}
          <div className="hidden md:flex items-center gap-2">
            {user ?
              <button
                onClick={handleLogout}
                className={`flex items-center text-primary transition ${
                  isCheckoutPage ?
                    'text-gray-400 cursor-not-allowed'
                  : 'text-secondary hover:text-primary cursor-pointer'
                }`}
                disabled={isCheckoutPage}
              >
                <LogIn
                  size={20}
                  className="mr-1 rotate-180"
                />
                <span className="text-[12px] font-[Mont-SemiBold] uppercase leading-none mt-0.5">
                  Logout
                </span>
              </button>
            : <NavLink
                to="/auth"
                aria-label="Login"
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? activeLink : inactiveLink}`
                }
              >
                <LogIn
                  size={20}
                  className="mr-1 mb-0.5"
                />
                <span className="text-[12px] font-[Mont-SemiBold] leading-none mt-0.5">
                  Login
                </span>
              </NavLink>
            }

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

            <div className="h-[64px] flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Mobile & Tablet menu icon */}
        <div className="flex md:hidden gap-4">
          <div className="h-[64px] flex items-center">
            <ThemeToggle />
          </div>

          <button
            onClick={toggleMenu}
            aria-label="Menu Toggle"
            className="h-[64px] flex items-center"
          >
            {isMenuOpen ?
              <CloseIcon />
            : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* Бургер меню поза header */}
      <BurgerMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        isAuthenticated={Boolean(user)}
        onLogout={() => {
          handleLogout();
          closeMenu();
        }}
      />
    </>
  );
};
