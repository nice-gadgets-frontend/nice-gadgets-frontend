import { ShoppingBag } from 'lucide-react';
import { CounterBadgeIcon } from './CounterBadgeIcon';
import { Link } from 'react-router-dom';

type ShoppingBagProps = {
  totalItemsCount: number;
};

export const ShoppingBagIcon = ({ totalItemsCount }: ShoppingBagProps) => (
  <Link to="/cart" className="relative inline-block p-2 cursor-pointer">
    <ShoppingBag size={16} color='var(--color-primary)' />
    {totalItemsCount > 0 && <CounterBadgeIcon itemCount={totalItemsCount} />}
  </Link>
);
