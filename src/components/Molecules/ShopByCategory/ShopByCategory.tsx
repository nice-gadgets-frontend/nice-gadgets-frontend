import { CategoryCard } from '../CategoryCard/CategoryCard';
import { CategoryType } from '../CategoryCard/CategoryType';
import { getAccessories } from '../../../services/getAccessories';
import { getPhones } from '../../../services/getPhones';
import { getTablets } from '../../../services/getTablets';
import { Link } from 'react-router-dom';
import { CategoryCardSkeleton } from '../CategoryCard/CategoryCardSkeleton';
import { useEffect, useState } from 'react';

export const ShopByCategory = () => {
  const [phonesCount, setPhonesCount] = useState<number | null>(null);
  const [tabletsCount, setTabletsCount] = useState<number | null>(null);
  const [accessoriesCount, setAccessoriesCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      setLoading(true);
      try {
        const [phonesData, tabletsData, accessoriesData] = await Promise.all([
          getPhones(),
          getTablets(),
          getAccessories(),
        ]);

        await new Promise((resolve) => setTimeout(resolve));

        setPhonesCount(phonesData.length);
        setTabletsCount(tabletsData.length);
        setAccessoriesCount(accessoriesData.length);
      } catch (error) {
        console.error('Failed to fetch category counts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section className="mx-auto tablet:px-6 tablet:max-w-[1136px] py-10">
      <h2 className="text-[32px] text-primary font-[Mont-Bold] leading-[41px] mb-6 xl:w-[1136px] xl:mx-auto">
        Shop by category
      </h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-3 xl:w-[1136px] xl:mx-auto justify-items-center">
        {
          loading ?
            // Render skeletons while loading
            <>
              <CategoryCardSkeleton />
              <CategoryCardSkeleton />
              <CategoryCardSkeleton />
            </>
            // Render actual cards once data is loaded
          : <>
              <Link to="/phones">
                <CategoryCard
                  categoryType={CategoryType.Phones}
                  title="Mobile Phones"
                  modelsCount={phonesCount !== null ? phonesCount : 0}
                />
              </Link>
              <Link to="/tablets">
                <CategoryCard
                  categoryType={CategoryType.Tablets}
                  title="Tablets"
                  modelsCount={tabletsCount !== null ? tabletsCount : 0}
                />
              </Link>
              <Link to="/accessories">
                <CategoryCard
                  categoryType={CategoryType.Accessories}
                  title="Accessories"
                  modelsCount={accessoriesCount !== null ? accessoriesCount : 0}
                />
              </Link>
            </>

        }
      </div>
    </section>
  );
};
