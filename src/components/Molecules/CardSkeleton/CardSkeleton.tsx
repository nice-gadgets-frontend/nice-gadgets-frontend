import '../../../styles/responsive.css';
import { PrimaryButton } from '../../Atoms/Buttons/PrimaryButton';
import { FavouritesButton } from '../../Atoms/Buttons/FavouritesButton';
import Skeleton from 'react-loading-skeleton';

export const CardSkeleton = () => {
  return (
    <div
      className={`
      product-card text-[#F1F2F9] font-[Mont-Regular] text-[14px] bg-[#161827] p-8 box-border
      flex flex-col justify-center gap-2 max-w-[212px] sm:max-w-[237px] lg:max-w-[272px]
    `}
    >
      <div className="product-card__image max-h-[129px] sm:max-h-[168px] lg:max-h-[196px] aspect-square box-border">
        <Skeleton height={'100%'} />
      </div>

      <div className="product-card__name leading-[21px] pt-4 min-h-[58px]">
        <p>
          <Skeleton />
          <Skeleton width={'50%'} />
        </p>
      </div>

      <div className="product-card__price flex gap-2">
        <div className="product-card__price font-[Mont-Bold] text-[22px] leading-[31px]">
          <Skeleton />
        </div>
      </div>

      <div className="bg-transparent w-full h-[1px]"></div>

      <div className="product-card__features flex flex-col gap-2 sm:gap-3 font-[Mont-SemiBold] text-[12px] flex-grow">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>

      <div className="product-interaction flex flex-row justify-between gap-2 sm:gap-3 mt-auto">
        <PrimaryButton
          onClick={() => {}}
          isDisabled={true}
        >
          Loading...
        </PrimaryButton>
        <FavouritesButton onClick={() => {}} />
      </div>
    </div>
  );
};
