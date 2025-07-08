import { CategoryCard } from '../CategoryCard/CategoryCard';
import { CategoryType } from '../CategoryCard/CategoryType';
import phonesFromServer from '../../../../public/gadgets/phones.json';
import tabletsFromServer from '../../../../public/gadgets/tablets.json';
import accessoriesfromServer from '../../../../public/gadgets/accessories.json';
import { Link } from 'react-router-dom';

export const ShopByCategory = () => {
  return (
    <div className="w-full bg-[#0F1121] py-10 font-inter">
      <span className="block text-[#F1F2F9] text-[32px] leading-[41px] font-[Mont-Bold] mb-6 text-left px-4 md:px-6 xl:w-[1136px] xl:mx-auto">
        Shop by Category
      </span>
      <div className="grid gap-4 grid-cols-1 px-4 md:grid-cols-3 md:px-6 xl:grid-cols-3 xl:w-[1136px] xl:mx-auto justify-items-center">
        <Link to="/phones">
          <CategoryCard
            categoryType={CategoryType.Phones}
            title="Mobile Phones"
            modelsCount={phonesFromServer.length}
          />
        </Link>
        <Link to="/tablets">
          <CategoryCard
            categoryType={CategoryType.Tablets}
            title="Tablets"
            modelsCount={tabletsFromServer.length}
          />
        </Link>
        <Link to="/accessories">
          <CategoryCard
            categoryType={CategoryType.Accessories}
            title="Accessories"
            modelsCount={accessoriesfromServer.length}
          />
        </Link>
      </div>
    </div>
  );
};
