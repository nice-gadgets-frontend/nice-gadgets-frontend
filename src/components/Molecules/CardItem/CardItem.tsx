import React, { useState } from 'react';
import '../../../styles/responsive.css';
import { PrimaryButton } from '../../Atoms/Buttons/PrimaryButton';
import { FavouritesButton } from '../../Atoms/Buttons/FavouritesButton';
import { useFavouritesStore } from '../../../services/useStore/useFavouritesStore';
import { useInCartStore } from '../../../services/useStore/useInCartStore';
import type { ProductType } from '../../../types/ProductType';

type PhoneType = {
  product: ProductType;
};

export const CardItem: React.FC<PhoneType> = ({ product }) => {
  const itemsInFavourites = useFavouritesStore(
    (state) => state.itemsInFavourites,
  );
  const addToFavourites = useFavouritesStore((state) => state.addToFavourites);
  const addToCart = useInCartStore((state) => state.addToCart);

  const isSelected = itemsInFavourites.includes(product.itemId);
  const [isInCart, setIsInCart] = useState(false);

  const addToCartHandle = () => {
    addToCart(product.itemId);
    setIsInCart(true);
    setTimeout(() => {
      setIsInCart(false);
    }, 1500);
  };

  const addToFavouritesHandle = () => {
    addToFavourites(product.itemId);
  };

  return (
    <div className="product-card text-[#F1F2F9] w-full font-[Mont-Regular] text-[14px] bg-[#161827] p-8 box-border flex flex-col justify-center gap-2">
      <div className="product-card__image h-[129px] sm:h-[196px] aspect-square flex justify-center box-border">
        <img
          className="w-full h-full object-contain object-center"
          src={`gadgets/${product.image}`}
          alt="phone"
        />
      </div>
      <div className="product-card__name leading-[21px] pt-4">
        {product.name}
      </div>
      <div className="product-card__price flex gap-2">
        <div className="product-card__price font-[Mont-Bold] text-[22px] leading-[31px]">
          ${product.price}
        </div>
        <div className="product-card__price font-[Mont-Bold] text-gray line-through text-secondary text-[22px] leading-[31px]">
          ${product.fullPrice}
        </div>
      </div>
      <div className="bg-[#3B3E4A] w-full h-[1px]"></div>
      <div className="product-card__features gap-2 font-[Mont-SemiBold] text-[12px]">
        <div className="product-card__feature feature-screen flex justify-between">
          <span className="text-[#75767F]">Screen</span>
          <p className="product-card-screen break-words overflow-wrap-anywhere text-right  ml-10">
            {product.screen}
          </p>
        </div>
        <div className="product-card__feature feature-capacity flex justify-between">
          <span className="text-[#75767F]">Capacity</span>
          <p className="product-card-screen">{product.capacity}</p>
        </div>
        <div className="product-card__feature feature-ram flex justify-between">
          <span className="text-[#75767F]">RAM</span>
          <p className="product-card-screen">{product.ram}</p>
        </div>
      </div>
      <div className="product-interaction flex flex-row justify-between gap-2">
        <PrimaryButton
          onClick={addToCartHandle}
          isDisabled={isInCart}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </PrimaryButton>
        <FavouritesButton
          onClick={addToFavouritesHandle}
          selected={isSelected}
        />
      </div>
    </div>
  );
};
