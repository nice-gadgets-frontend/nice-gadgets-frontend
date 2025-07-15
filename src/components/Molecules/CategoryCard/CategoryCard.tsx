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
      imgSrc = '/gadgets/img/figma-category-phone.png';
      bgColor = '#6D6474';
      break;
    case 'Tablets':
      imgSrc = '/gadgets/img/category-tablets.png';
      bgColor = '#8D8D92';
      break;
    case 'Accessories':
      imgSrc = '/gadgets/img/category-accessories.webp';
      bgColor = '#973D5F';
      break;
    default:
      imgSrc = '/public/gadgets/img/category-phones.webp';
      bgColor = '#6D6474';
  }
  return (
    <div className="group flex flex-col gap-6 w-full max-w-[368px]">
      <div
        className="block w-full aspect-square overflow-hidden mb-6
                   transition-transform duration-300 ease-in-out
                   hover:[&>img]:scale-[0.9] hover:[&>img]:translate-x-0 hover:[&>img]:translate-y-0"
        style={{ backgroundColor: bgColor }}
      >
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-contain
                   transform translate-x-[15%] translate-y-[20%] scale-[1.23]
                   transition-all duration-300 ease-in-out
                   group-hover:scale-[0.9] group-hover:translate-x-0 group-hover:translate-y-0"
        />
      </div>
      <div className="flex flex-col items-start">
        <h4 className="text-[20px] font-[Mont-SemiBold] text-primary leading-[26px] mb-1">
          {title}
        </h4>
        <span className="font-[Mont-Regular] text-[14px] leading-[21px] text-gray-400">
          {modelsCount} models
        </span>
      </div>
    </div>
  );
};
