import { NavLink, useLocation } from 'react-router-dom';
import { FavouritesPageIcon } from '../../Atoms/Icons/FavouritePageIcon';
import { ShoppingBagIcon } from '../../Atoms/Icons/ShoppingBagIcon';
import { LogIn, X } from 'lucide-react';
import { useInCartStore } from '../../../services/useStore/useInCartStore';
import { useFavouritesStore } from '../../../services/useStore/useFavouritesStore';
import clsx from 'clsx';

type Props = {
  isOpen: boolean;
  onClose: () => void;
    isAuthenticated: boolean;
  onLogout: () => void;
};

export const BurgerMenu = ({ isOpen, onClose, isAuthenticated, onLogout }: Props) => {
  const location = useLocation();

  const itemsIdsInCart = useInCartStore((state) => state.itemsIdsInCart);
  const totalItemsCount = itemsIdsInCart.reduce(
    (sum, item) => sum + (item.quantity ?? 0),
    0,
  );

  const itemIdsInFavourites = useFavouritesStore(
    (state) => state.itemsInFavourites,
  );
  const itemsInFavouritesCount = itemIdsInFavourites.length;

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div
      className={clsx(
        'fixed inset-0 z-[100] md:hidden transition-opacity duration-300',
        isOpen ?
          'opacity-100 pointer-events-auto'
        : 'opacity-0 pointer-events-none',
      )}
    >
      {/* Бекдроп з блюром */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Слайд-меню */}
      <div
        className={clsx(
          'absolute top-0 left-0 w-full h-full bg-black flex flex-col justify-between text-[14px] uppercase transform transition-transform duration-300',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 h-[64px] border-b border-surface-1">
          <img
            src="/gadgets/img/light-theme-nice-gadgets-logo.png"
            alt="Nice Gadgets Logo"
            className="h-[32px] block dark:hidden"
          />
          <img
            src="/gadgets/img/nice-gadgets-logo.png"
            alt="Nice Gadgets Logo"
            className="h-[32px] hidden dark:block"
          />

          <div className="flex-grow" />

          <div className="w-px h-full bg-surface-2" />

          <button
            onClick={onClose}
            aria-label="Close Menu"
            className="w-[48px] h-full flex items-center justify-end text-primary"
          >
            <X size={24} />
          </button>
        </div>

        {/* Навігація */}
        <nav className="flex flex-col gap-6 px-8 mt-6 text-center">
          {[
            { label: 'Home', path: '/home' },
            { label: 'Phones', path: '/phones' },
            { label: 'Tablets', path: '/tablets' },
            { label: 'Accessories', path: '/accessories' },
          ].map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                clsx(
                  'inline-block mx-auto hover:text-primary transition',
                  isActive ?
                    'text-primary font-bold border-b-2 border-primary pb-1'
                  : 'text-secondary',
                )
              }
            >
              {label}
            </NavLink>
          ))}

<button
  onClick={() => {
    if (isAuthenticated) {
      onLogout();
    } else {
      window.location.href = '/auth';
    }
    onClose();
  }}
  aria-label={isAuthenticated ? 'Logout' : 'Login'}
  className="flex items-center justify-center gap-2 p-2 mx-auto mt-6 text-primary hover:text-primary/80 transition"
>
  <LogIn size={24} className={isAuthenticated ? 'rotate-180' : ''} />
  <span className="text-sm font-[Mont-Semibold] uppercase mt-0.1">
    {isAuthenticated ? 'Logout' : 'Login'}
  </span>
</button>

        </nav>

 

        {/* Bottom icons */}
        <div className="flex border-t border-[#2c2f3a] divide-x divide-[#2c2f3a]">
          <NavLink
            to="/favourites"
            onClick={onClose}
            className="w-1/2 flex justify-center py-4"
          >
            <div className="relative flex flex-col items-center">
              <FavouritesPageIcon itemsInFavourites={itemsInFavouritesCount} />
              {isActivePath('/favourites') && (
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
              <ShoppingBagIcon totalItemsCount={totalItemsCount} />
              {isActivePath('/cart') && (
                <span className="absolute -bottom-1 w-6 border-t-2 border-white" />
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
