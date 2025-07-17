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
  const itemsInCart = useInCartStore((state) => state.itemsIdsInCart);
  const itemsIdsInCart = itemsInCart.map((item) => item.id);
  const addToFavourites = useFavouritesStore((state) => state.addToFavourites);
  const addToCart = useInCartStore((state) => state.addToCart);
  const deleteFromCart = useInCartStore((state) => state.deleteFromCart);

  const isSelected = itemsInFavourites.includes(product.itemId);
  const [isInCart, setIsInCart] = useState(
    itemsIdsInCart.includes(String(product.itemId)),
  );

  const navigate = useNavigate();

  const addToCartHandle = () => {
    addToCart(product.itemId);
    setIsInCart(true);
  };

  const deleteFromCartHandle = () => {
    deleteFromCart(product.itemId);
    setIsInCart(false);
  };

  const addToFavouritesHandle = () => {
    addToFavourites(product.itemId);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.category}/${product.itemId}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className={`
  cursor-pointer product-card text-primary font-[Mont-Regular] text-[14px] bg-surface-1 p-8 box-border
  flex flex-col justify-center gap-2 rounded-lg 
  border-2 border-elements dark:border-transparent
  transition-shadow transition-colors duration-300
  hover:shadow-[0_0_15px_2px_rgba(144,91,255,0.5)] hover:border-accent
  ${className}
`}
    >
      <div className="product-card__image max-h-[129px] sm:max-h-[168px] lg:max-h-[196px] aspect-square flex justify-center box-border">
        <img
          className="w-full h-full object-contain object-center"
          src={`/gadgets/${product.image}`}
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

      <div className="bg-elements w-full h-[1px]"></div>

      <div className="product-card__features flex flex-col gap-2 sm:gap-3 font-[Mont-SemiBold] text-[12px] flex-grow">
        <div className="product-card__feature feature-screen flex justify-between">
          <span className="text-secondary">Screen</span>
          <p className="product-card-screen break-words overflow-wrap-anywhere text-right ml-10">
            {product.screen}
          </p>
        </div>
        <div className="product-card__feature feature-capacity flex justify-between">
          <span className="text-secondary">Capacity</span>
          <p className="product-card-screen">{product.capacity}</p>
        </div>
        <div className="product-card__feature feature-ram flex justify-between">
          <span className="text-secondary">RAM</span>
          <p className="product-card-screen">{product.ram}</p>
        </div>
      </div>

      <div className="product-interaction flex flex-row justify-between gap-2 sm:gap-3 mt-auto">
        <PrimaryButton
          isDelete={isInCart}
          onClick={(e) => {
            e.stopPropagation();
            if (isInCart) {
              deleteFromCartHandle();
            } else {
              addToCartHandle();
            }
          }}
        >
          {isInCart ? 'Delete from cart' : 'Add to cart'}
        </PrimaryButton>
        <FavouritesButton
          onClick={(e) => {
            e.stopPropagation();
            addToFavouritesHandle();
          }}
          selected={isSelected}
        />
      </div>
    </div>
  );
};
