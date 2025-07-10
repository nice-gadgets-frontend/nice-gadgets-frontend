import React, { useState } from 'react';
import '../../../styles/responsive.css';
import { PrimaryButton } from '../../Atoms/Buttons/PrimaryButton';
import { FavouritesButton } from '../../Atoms/Buttons/FavouritesButton';
import { useFavouritesStore } from '../../../services/useStore/useFavouritesStore';
import { useInCartStore } from '../../../services/useStore/useInCartStore';
import type { ProductType } from '../../../types/ProductType';
import { useNavigate } from 'react-router-dom';

type CardItemProps = {
  product: ProductType;
  className?: string;
};


export const CardItem: React.FC<CardItemProps> = ({ product, className }) => {
  const itemsInFavourites = useFavouritesStore(
    (state) => state.itemsInFavourites,
  );
  const addToFavourites = useFavouritesStore((state) => state.addToFavourites);
  const addToCart = useInCartStore((state) => state.addToCart);

  const isSelected = itemsInFavourites.includes(product.itemId);
  const [isInCart, setIsInCart] = useState(false);

  const navigate = useNavigate();

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

  const handleCardClick = () => {
    navigate(`/product/${product.category}/${product.itemId}`);
  };

  return (

    <div
      className={`
      product-card text-[#F1F2F9] font-[Mont-Regular] text-[14px] bg-[#161827] p-8 box-border
      flex flex-col justify-center gap-2
      ${className}
      `}
    >
      <div className="cursor-pointer product-card__image max-h-[129px] sm:max-h-[168px] lg:max-h-[196px] aspect-square flex justify-center box-border"
          onClick={handleCardClick}>
        <img
          className="w-full h-full object-contain object-center"
          src={`gadgets/${product.image}`}
          alt="phone"
        />
      </div>

      <div className="product-card__name leading-[21px] pt-4 min-h-[58px]">
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

      <div className="product-card__features flex flex-col gap-2 sm:gap-3 font-[Mont-SemiBold] text-[12px] flex-grow">
        <div className="product-card__feature feature-screen flex justify-between">
          <span className="text-[#75767F]">Screen</span>
          <p className="product-card-screen break-words overflow-wrap-anywhere text-right ml-10">
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

      <div className="product-interaction flex flex-row justify-between gap-2 sm:gap-3 mt-auto">
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
