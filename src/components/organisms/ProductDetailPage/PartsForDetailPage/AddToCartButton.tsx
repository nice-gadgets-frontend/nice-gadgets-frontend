import React, { useState } from 'react';
import { PrimaryButton } from '../../../Atoms/Buttons/PrimaryButton';
import { useInCartStore } from '../../../../services/useStore/useInCartStore';

type AddToCartButtonProps = {
  productId: string;
};

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ productId }) => {
  const addToCart = useInCartStore(state => state.addToCart);
  const [isInCart, setIsInCart] = useState(false);

  const handleAddToCart = () => {
    addToCart(productId);
    setIsInCart(true);
    setTimeout(() => setIsInCart(false), 1500);
  };

  return (
    <PrimaryButton onClick={handleAddToCart} isDisabled={isInCart} >
      {isInCart ? 'Added to cart' : 'Add to cart'}
    </PrimaryButton>
  );
};