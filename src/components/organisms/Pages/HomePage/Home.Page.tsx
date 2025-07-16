import { useEffect, useState } from 'react';
import { Slider } from '../../../Atoms/Slider/Slider';
import { ShopByCategory } from '../../../Molecules/ShopByCategory/ShopByCategory';
import { BrandNewmodelsSection } from './Sections/BrandNewModelsSection';
import { getProducts } from '../../../../services/getProducts';
import { HotPricesSection } from './Sections/HotPricesSection';
import type { ProductType } from '../../../../types/ProductType';

export const HomePage = () => {
  const [productsFromJSON, setProductsFromJSON] = useState<ProductType[]>([]);

  useEffect(() => {
    getProducts().then((products) => {
      setProductsFromJSON(products);
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-[auto_1fr_auto] gap-0 sm:gap-4 items-center xl:w-[1136px] mx-auto sm:pt-2 sm:pb-8 lg:pt-8 lg:pb-14 pb-6">
        <span className="text-primary text-[32px] leading-[41px] sm:text-[48px] sm:leading-[56px] tracking-[-0.1px] font-['Mont-Bold']">
          Welcome to Nice Gadgets store!
        </span>
      </div>

      <div className="-mx-4 sm:mx-0">
        <Slider />
      </div>
      <BrandNewmodelsSection products={productsFromJSON} />
      <ShopByCategory />
      <HotPricesSection products={productsFromJSON} />
    </>
  );
};
