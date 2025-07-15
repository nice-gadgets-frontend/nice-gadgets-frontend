//import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { CounterBadgeIcon } from './CounterBadgeIcon';
import { Link } from 'react-router-dom';

type FavouritesPageIconProps = {
  itemsInFavourites?: number;
};

export const FavouritesPageIcon = ({
  itemsInFavourites,
}: FavouritesPageIconProps) => {
  return (
    <Link
      to="/favourites"
      className="relative inline-block p-2 cursor-pointer"
    >
      <Heart
        size={16}
        color='var(--color-primary)'
      />
      {itemsInFavourites! > 0 && (
        <CounterBadgeIcon itemCount={itemsInFavourites!} />
      )}
    </Link>
  );
};
