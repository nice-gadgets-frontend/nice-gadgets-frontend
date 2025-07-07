//import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { CounterBadgeIcon } from './CounterBadgeIcon';
import { Link } from 'react-router-dom';

type ShoppingBagIconProps = {
  cartItems?: object[];
};

export const ShoppingBagIcon = ({ cartItems }: ShoppingBagIconProps) => {
  return (
    <Link
      to="cart"
      className="relative inline-block p-2 cursor-pointer"
    >
      <ShoppingBag
        size={16}
        color="#F1F2F9"
      />
      {(cartItems?.length ?? 0) > 0 && (
        <CounterBadgeIcon itemCount={cartItems!.length} />
      )}
    </Link>
  );
};
