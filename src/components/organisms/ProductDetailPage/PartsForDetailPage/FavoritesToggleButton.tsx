import React from 'react';
import { FavouritesButton } from '../../../Atoms/Buttons/FavouritesButton';
import { useFavouritesStore } from '../../../../services/useStore/useFavouritesStore';

type FavouritesToggleButtonProps = {
  productId: string;
};

export const FavouritesToggleButton: React.FC<FavouritesToggleButtonProps> = ({ productId }) => {
  const addToFavourites = useFavouritesStore(state => state.addToFavourites);
  const isSelected = useFavouritesStore(state => state.itemsInFavourites.includes(productId));

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToFavourites(productId);
  };

  return <FavouritesButton onClick={handleClick} selected={isSelected} />;
};