import { CategoryType } from './CategoryType';

type CategoryCardProps = {
  categoryType: CategoryType;
  title: string;
  modelsCount: number;
};

export const CategoryCard = ({
  categoryType,
  title,
  modelsCount,
}: CategoryCardProps) => {
  let imgSrc = '';
  let bgColor = '';

  switch (categoryType) {
    case 'Phones':
      imgSrc = '/public/gadgets/img/category-phones-test.png';
      bgColor = '#6D6474';
      break;
    case 'Tablets':
      imgSrc = '/public/gadgets/img/category-tablets-test.png';
      bgColor = '#8D8D92';
      break;
    case 'Accessories':
      imgSrc = '/public/gadgets/img/category-accessories-test.png';
      bgColor = '#973D5F';
      break;
    default:
      imgSrc = '/public/gadgets/img/category-phones-test.png';
      bgColor = '#6D6474';
  }
  return (
    <div className="flex flex-col gap-6 w-full max-w-[368px]">
      <div
        className="w-full h-[288px] flex justify-end items-end overflow-hidden transition-all duration-300 ease-in-out md:h-[187px] lg:h-[368px]"
        style={{ backgroundColor: bgColor }}
      >
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-contain object-right-bottom relative"
        />
      </div>
      <div className="flex flex-col items-start">
        <span className="font-[Mont-SemiBold] text-[20px] text-[#F1F2F9]">
          {title}
        </span>
        <span className="count font-[Mont-Regular] text-[14px] leading-[21px] text-gray-400">
          {modelsCount} models
        </span>
      </div>
    </div>
  );
};
