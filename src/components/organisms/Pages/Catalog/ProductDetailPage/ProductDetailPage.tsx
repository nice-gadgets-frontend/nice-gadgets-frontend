import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ColorSelector } from '../../../../Atoms/Buttons/ColorSelector';
import { FavouritesButton } from '../../../../Atoms/Buttons/FavouritesButton';
import { PrimaryButton } from '../../../../Atoms/Buttons/PrimaryButton';
import { SwiperGallery } from './SwiperGallery';
import { HomePageIcon } from '../../../../Atoms/Icons/HomePageIcon';
import { ChevronRight } from 'lucide-react';
import { YouMayAlsoLike } from './YouMayAlsoLike';
import type { ProductType } from '../../../../../types/ProductType';

const colorHexMap: Record<string, string> = {
  'spacegray': '#4B4B4F',
  'silver': '#C0C0C0',
  'rose gold': '#B76E79',
  'green': '#008000',
  'sky blue': '#87CEEB',
  'starlight': '#E6E8FA',
  'pink': '#FFC0CB',
  'gold': '#FFD700',
};

export const ProductDetailPage: React.FC = () => {
  const { category, itemId } = useParams<{ category: string; itemId: string }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  // const [currentCategory, setCurrentCategory] = useState<string | null>(null);

useEffect(() => {
  if (!itemId || !category) return;

  const basePath = '/gadgets';

  const url = `${basePath}/${category}.json`;

  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to load ${url}: ${res.statusText}`);
      }
      return res.json();
    })
    .then((products: ProductType[]) => {
      const found = products.find(p => p.id === itemId);

      if (found) {
        setProduct(found);
        setSelectedColor(found.colorsAvailable?.[0] || null);
        setSelectedCapacity(found.capacityAvailable?.[0] || null);
        setAllProducts(products);
        console.log('Found product:', found);
      } else {
        console.log('Product not found');
        setProduct(null);
      }
    })
    .catch((error) => {
      console.error('Error loading data:', error);
      setProduct(null);
    });
}, [itemId, category]);




  if (!product) {
    return <div className="text-white p-10">Product not found or loading...</div>;
  }

  const underlineSections = 'border-b border-b-[0.5px] border-elements';

  return (
    <main className="max-w-6xl mx-auto font-[mont] text-white">
      {/* breadcrumb */}
      <div className="flex items-center text-sm text-gray-400 mb-10 gap-2">
        <Link to="/" className="hover:text-white flex items-center gap-1">
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
          {product.colorsAvailable && (
            <fieldset className={underlineSections}>
              <legend className="block mb-2">Available colors</legend>
              <div className="grid grid-cols-8 gap-2 w-full">
                {product.colorsAvailable.map((colorKey) => (
                  <button
                    key={colorKey}
                    onClick={() => setSelectedColor(colorKey)}
                    className="focus:outline-none cursor-pointer mb-6"
                    aria-pressed={selectedColor === colorKey}
                    aria-label={`Select color ${colorKey}`}
                  >
                    <ColorSelector
                      color={colorHexMap[colorKey] || '#000'}
                      selected={selectedColor === colorKey}
                    />
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {/* пам'ять */}
          {product.capacityAvailable && (
            <fieldset className={underlineSections}>
              <legend className="block mb-2">Select capacity</legend>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 w-full">
                {product.capacityAvailable.map((capacity) => {
                  const isSelected = capacity === selectedCapacity;
                  return (
                    <button
                      key={capacity}
                      onClick={() => setSelectedCapacity(isSelected ? null : capacity)}
                      className={`cursor-pointer px-4 py-2 border border-elements text-sm transition-colors mb-6 ${
                        isSelected
                          ? 'bg-white text-black border-black'
                          : 'bg-transparent text-white border-gray-300 hover:border-gray-500'
                      }`}
                      aria-pressed={isSelected}
                      aria-label={`Select capacity ${capacity}`}
                    >
                      {capacity}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* ціна */}
          <div className="text-2xl" aria-label="Price">
            <span className="text-white mr-2 font-[Mont-Bold]">${product.priceDiscount}</span>
            <span className="line-through text-secondary font-[Mont-Light]">${product.priceRegular}</span>
          </div>

          {/* кнопки */}
          <div className="grid grid-cols-[1fr_48px] gap-2 w-full">
            <PrimaryButton onClick={() => console.log('Added to cart')}>
              Add to cart
            </PrimaryButton>
            <FavouritesButton onClick={() => console.log('Added to favorites')} />
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
                <p key={pidx} className="leading-relaxed mb-2 text-gray-400">
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </section>

<section>
  <div className="mb-8">
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
  </div>
</section>

      </section>

      {/* You may also like */}
      <section>
        <YouMayAlsoLike youMayAlsoLikeProducts={allProducts} currentProductCategory={category || ''} />
      </section>
    </main>
  );
};
