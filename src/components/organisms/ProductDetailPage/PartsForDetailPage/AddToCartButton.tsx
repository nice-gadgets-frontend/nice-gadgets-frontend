import React from 'react';
import { PrimaryButton } from '../../../Atoms/Buttons/PrimaryButton';
import { useInCartStore } from '../../../../services/useStore/useInCartStore';

type AddToCartButtonProps = {
  productId: string;
};

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
}) => {
  const addToCart = useInCartStore((state) => state.addToCart);
  const itemsInCart = useInCartStore((state) => state.itemsIdsInCart);
  const itemsIdsInCart = itemsInCart.map((item) => item.id);
  const deleteFromCart = useInCartStore((state) => state.deleteFromCart);
  const isInCart = itemsIdsInCart.includes(String(productId))

  const handleAddToCart = () => {
    addToCart(productId);
  };

  const deleteFromCartHandle = () => {
    deleteFromCart(productId);
  };

  return (
    <PrimaryButton
      isDelete={isInCart}
      onClick={(e) => {
        e.stopPropagation();
        if (isInCart) {
          deleteFromCartHandle();
        } else {
          handleAddToCart();
        }
      }}
    >
      {isInCart ? 'Delete from cart' : 'Add to cart'}
    </PrimaryButton>
  );
};
