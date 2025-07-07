//import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { CounterBadgeIcon } from './CounterBadgeIcon';
import { Link } from 'react-router-dom';

type FavouritesPageIconProps = {
  favouriteItems?: object[];
};

export const FavouritesPageIcon = ({
  favouriteItems,
}: FavouritesPageIconProps) => {
  return (
    <Link
      to="/favourites"
      className="relative inline-block p-2 cursor-pointer"
    >
      <Heart
        size={16}
        color="#F1F2F9"
      />
      {(favouriteItems?.length ?? 0) > 0 && (
        <CounterBadgeIcon itemCount={favouriteItems!.length} />
      )}
    </Link>
  );
};
