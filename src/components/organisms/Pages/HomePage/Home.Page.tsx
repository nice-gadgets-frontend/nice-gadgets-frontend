import { useEffect, useState } from 'react';
import { Slider } from '../../../Atoms/Slider/Slider';
import { ShopByCategory } from '../../../Molecules/ShopByCategory/ShopByCategory';
import { BrandNewmodelsSection } from './Sections/BrandNewModelsSection';
import { getPhones } from '../../../../services/getPhones';
import type { Phone } from '../../../../types/Phone';

export const HomePage = () => {
  const [phonesFromJSON, setPhonesFromJSON] = useState<Phone[]>([]);

  useEffect(() => {
    getPhones().then((phones) => {
      setPhonesFromJSON(phones);
    });
  }, []);

  return (
    <>
      <h2 className="text-white">Home Page</h2>
      <Slider />
      <BrandNewmodelsSection phones={phonesFromJSON} />
      <ShopByCategory />
    </>
  );
};
