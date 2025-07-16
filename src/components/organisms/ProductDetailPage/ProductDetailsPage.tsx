import React from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { useProduct } from '../../../services/useStore/useProduct';
import { ColorsSelector } from './PartsForDetailPage/ColorsSelector';
import { CapacitySelector } from './PartsForDetailPage/CapacitySelector';
import { AddToCartButton } from './PartsForDetailPage/AddToCartButton';
import { FavouritesToggleButton } from './PartsForDetailPage/FavoritesToggleButton';
import { SwiperGallery } from './PartsForDetailPage/SwiperGallery';
import { HomePageIcon } from '../../Atoms/Icons/HomePageIcon';
import { ChevronRight } from 'lucide-react';
import { YouMayAlsoLike } from './PartsForDetailPage/YouMayAlsoLike';

export const ProductDetailPage: React.FC = () => {
  const { category, itemId } = useParams<{ category: string; itemId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    product,
    allProducts,
    selectedColor,
    setSelectedColor,
    selectedCapacity,
    setSelectedCapacity,
  } = useProduct(category, itemId, location.search);

  const updateUrl = (newProductId: string, color: string | null, capacity: string | null) => {
    const params = new URLSearchParams();
    if (color) params.set('color', color);
    if (capacity) params.set('capacity', capacity);

    navigate(`/product/${category}/${newProductId}?${params.toString()}`);
  };

  if (!product) {
    return <div className="text-primary p-10">Product not found or loading...</div>;
  }

  return (
    <main className="max-w-6xl mx-auto font-[mont] text-primary">
      {/* breadcrumb */}
      <div className="flex items-center text-sm text-secondary mb-10 gap-2">
        <Link
          to="/"
          className="hover:text-primary flex items-center gap-1"
        >
          <HomePageIcon />
        </Link>
        <div className="text-secondary">
          <ChevronRight size={16} />
        </div>

        <Link to={`/${category}`} className="text-white capitalize">
          {category}
        </Link>

        <div className="text-secondary">
          <ChevronRight size={16} />
        </div>

        <span className="text-secondary">{product.name}</span>
      </div>

      <h1 className="text-3xl font-mont mb-8">{product.name}</h1>

      {/* зображення + деталі */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
        <SwiperGallery images={product.images ?? []} altPrefix={product.name} />

        <div className="grid grid-col gap-6 max-w-[320px]">
          {/* кольори */}
          {product.colorsAvailable && product.colorsAvailable.length > 0 && (
            <ColorsSelector
              colors={product.colorsAvailable}
              selectedColor={selectedColor}
              allProducts={allProducts}
              namespaceId={product.namespaceId}
              selectedCapacity={selectedCapacity}
              onColorSelect={setSelectedColor}
              updateUrl={updateUrl}
            />
          )}

          {/* пам'ять */}
          {product.capacityAvailable && product.capacityAvailable.length > 0 && (
            <CapacitySelector
              capacities={product.capacityAvailable}
              selectedCapacity={selectedCapacity}
              allProducts={allProducts}
              namespaceId={product.namespaceId}
              selectedColor={selectedColor}
              onCapacitySelect={setSelectedCapacity}
              updateUrl={updateUrl}
            />
          )}

          {/* ціна */}
          <div className="text-2xl" aria-label="Price">
            <span className="text-primary mr-2 font-[Mont-Bold]">${product.priceDiscount}</span>
            <span className="line-through text-secondary font-[Mont-Light]">${product.priceRegular}</span>
          </div>

          {/* кнопки */}
          <div className="grid grid-cols-[1fr_48px] gap-2 w-full mt-auto">
            <AddToCartButton productId={String(product.id)} />
            <FavouritesToggleButton productId={String(product.id)} />
          </div>

          {/* основні характеристики */}
          <section aria-label="Main specifications">
            <ul className="grid gap-1 text-sm ">
              {product.screen && (
                <li className="grid grid-cols-2">
                  <strong className="text-secondary">Screen</strong>
                  <span className="text-right">{product.screen}</span>
                </li>
              )}
              {product.resolution && (
                <li className="grid grid-cols-2">
                  <strong className="text-secondary">Resolution</strong>
                  <span className="text-right">{product.resolution}</span>
                </li>
              )}
              {product.processor && (
                <li className="grid grid-cols-2">
                  <strong className="text-secondary">Processor</strong>
                  <span className="text-right">{product.processor}</span>
                </li>
              )}
              {product.ram && (
                <li className="grid grid-cols-2">
                  <strong className="text-secondary">RAM</strong>
                  <span className="text-right">{product.ram}</span>
                </li>
              )}
            </ul>
          </section>
        </div>
      </section>

      {/* Опис */}
      <section className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10 mt-12">
        <section>
          <div className="mb-8">
            <h2 className="border-b border-b-[0.5px] border-elements pb-4 text-2xl font-bold">About</h2>
          </div>
          {product.description.map((section, idx) => (
            <article key={idx} className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
              {section.text.map((paragraph, pidx) => (
                <p key={pidx} className="leading-relaxed mb-2 text-secondary">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </section>

        <section>
          <div className="mb-8">
            <h2 className="border-b border-b-[0.5px] border-elements pb-4 text-2xl font-bold">Tech specs</h2>
          </div>

          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {product.screen && (
              <>
                <li className="text-secondary font-semibold">Screen</li>
                <li className="text-right">{product.screen}</li>
              </>
            )}

            {product.resolution && (
              <>
                <li className="text-secondary font-semibold">Resolution</li>
                <li className="text-right">{product.resolution}</li>
              </>
            )}

            {product.processor && (
              <>
                <li className="text-secondary font-semibold">Processor</li>
                <li className="text-right">{product.processor}</li>
              </>
            )}

            {product.ram && (
              <>
                <li className="text-secondary font-semibold">RAM</li>
                <li className="text-right">{product.ram}</li>
              </>
            )}

            {product.capacity && (
              <>
                <li className="text-secondary font-semibold">Build in memory</li>
                <li className="text-right">{product.capacity}</li>
              </>
            )}

            {product.camera && (
              <>
                <li className="text-secondary font-semibold">Camera</li>
                <li className="text-right">{product.camera}</li>
              </>
            )}

            {product.zoom && (
              <>
                <li className="text-secondary font-semibold">Zoom</li>
                <li className="text-right">{product.zoom}</li>
              </>
            )}

            {product.cell && (
              <>
                <li className="text-secondary font-semibold">Cell</li>
                <li className="text-right">{product.cell.join(', ')}</li>
              </>
            )}
          </ul>
        </section>
      </section>

      {/* You may also like */}
      <section>
        <YouMayAlsoLike youMayAlsoLikeProducts={allProducts} currentProductCategory={category || ''} />
      </section>
    </main>
  );
};