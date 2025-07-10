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
      <h2 className="text-white">Home Page</h2>
      <Slider />
      <BrandNewmodelsSection products={productsFromJSON} />
      <ShopByCategory />
      <HotPricesSection products={productsFromJSON} />
    </>
  );
};
