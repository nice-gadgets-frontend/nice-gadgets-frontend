import React, { useState, useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { ColorSelector } from '../../Atoms/Buttons/ColorSelector';
import { FavouritesButton } from '../../Atoms/Buttons/FavouritesButton';
import { PrimaryButton } from '../../Atoms/Buttons/PrimaryButton';
import { SwiperGallery } from './SwiperGallery';
import { HomePageIcon } from '../../Atoms/Icons/HomePageIcon';
import { ChevronRight } from 'lucide-react';
import { YouMayAlsoLike } from './YouMayAlsoLike';
import type { ProductType } from '../../../types/ProductType';

const colorHexMap: Record<string, string> = {
  black: '#000000',
  green: '#008000',
  yellow: '#FFD700',
  white: '#FFFFFF',
  purple: '#800080',
  red: '#FF0000',
  spacegray: '#4B4B4F',
  midnightgreen: '#004953',
  gold: '#FFD700',
  silver: '#C0C0C0',
  rosegold: '#B76E79',
  coral: '#FF7F50',
  midnight: '#1E1E2F',
  spaceblack: '#1A1A1A',
  blue: '#007AFF',
  pink: '#FFC0CB',
  graphite: '#383838',
  sierrablue: '#9BB7D4',
};

export const ProductDetailPage: React.FC = () => {
  const { category, itemId } = useParams<{
    category: string;
    itemId: string;
  }>();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!category) return;

    const getQueryParams = () => {
      const searchParams = new URLSearchParams(location.search);
      return {
        color: searchParams.get('color'),
        capacity: searchParams.get('capacity'),
      };
    };

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
        setAllProducts(products);

        const { color: urlColor, capacity: urlCapacity } = getQueryParams();

        // Шукаємо product за id (itemId)
        let found = itemId ? products.find((p) => p.id === itemId) : null;

        // Якщо не знайшли за id або itemId не передано, шукаємо за namespaceId + color + capacity
        if (!found && urlColor && urlCapacity) {
          found = products.find(
            (p) =>
              p.namespaceId === itemId && // або заміни itemId на namespaceId, якщо треба
              p.color?.toLowerCase() === urlColor.toLowerCase() &&
              p.capacity === urlCapacity,
          );
        }

        // Якщо і досі не знайшли, беремо дефолтний
        if (!found && products.length > 0) {
          found = products[0];
        }

        if (found) {
          setProduct(found);

          const validColor =
            (
              urlColor &&
              found.colorsAvailable?.some(
                (c) => c.toLowerCase() === urlColor.toLowerCase(),
              )
            ) ?
              urlColor
            : found.color || found.colorsAvailable?.[0] || null;
          setSelectedColor(validColor);

          const validCapacity =
            urlCapacity && found.capacityAvailable?.includes(urlCapacity) ?
              urlCapacity
            : found.capacity || found.capacityAvailable?.[0] || null;
          setSelectedCapacity(validCapacity);
        } else {
          setProduct(null);
        }
      })
      .catch((error) => {
        console.error('Error loading data:', error);
        setProduct(null);
      });
  }, [itemId, category, location.search]);

  // const updateUrl = (newProductId: string, color: string | null, capacity: string | null) => {
  //   const params = new URLSearchParams();
  //   if (color) params.set('color', color);
  //   if (capacity) params.set('capacity', capacity);

  //   navigate(`/product/${category}/${newProductId}?${params.toString()}`);
  // };

  const updateUrl = (
    newProductId: string,
    color: string | null,
    capacity: string | null,
  ) => {
    const params = new URLSearchParams();
    if (color) params.set('color', color);
    if (capacity) params.set('capacity', capacity);

    navigate(`/product/${category}/${newProductId}?${params.toString()}`);
  };

  if (!product) {
    return (
      <div className="text-white p-10">Product not found or loading...</div>
    );
  }

  const underlineSections = 'border-b border-b-[0.5px] border-elements';

  return (
    <main className="max-w-6xl mx-auto font-[mont] text-white">
      {/* breadcrumb */}
      <div className="flex items-center text-sm text-gray-400 mb-10 gap-2">
        <Link
          to="/"
          className="hover:text-white flex items-center gap-1"
        >
          <HomePageIcon />
        </Link>
        <div className="text-secondary">
          <ChevronRight size={16} />
        </div>

        <Link
          to={`/${category}`}
          className="text-white capitalize"
        >
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
        <SwiperGallery
          images={product.images ?? []}
          altPrefix={product.name}
        />

        <div className="grid grid-col gap-6 max-w-[320px]">
          {/* кольори */}
          {product.colorsAvailable && product.colorsAvailable.length > 0 && (
            <fieldset className={underlineSections}>
              <legend className="block mb-2">Available colors</legend>
              <div className="grid grid-cols-8 gap-2 w-full">
                {product.colorsAvailable.map((colorKey) => {
                  const sameColorAndCapacityProduct = allProducts.find(
                    (p) =>
                      p.namespaceId === product.namespaceId &&
                      p.color?.toLowerCase() === colorKey.toLowerCase() &&
                      p.capacity === selectedCapacity,
                  );

                  return (
                    <button
                      key={colorKey}
                      onClick={() => {
                        if (sameColorAndCapacityProduct) {
                          setSelectedColor(colorKey);
                          updateUrl(
                            String(sameColorAndCapacityProduct.id),
                            colorKey,
                            selectedCapacity,
                          );
                        }
                      }}
                      className="focus:outline-none cursor-pointer mb-6"
                      aria-pressed={selectedColor === colorKey}
                      aria-label={`Select color ${colorKey}`}
                    >
                      <ColorSelector
                        color={colorHexMap[colorKey] || '#000'}
                        selected={selectedColor === colorKey}
                      />
                    </button>
                  );
                })}
              </div>
            </fieldset>
          )}

          {/* пам'ять */}
          {product.capacityAvailable &&
            product.capacityAvailable.length > 0 && (
              <fieldset className={underlineSections}>
                <legend className="block mb-2">Select capacity</legend>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 w-full">
                  {product.capacityAvailable.map((capacity) => {
                    const isSelected = capacity === selectedCapacity;

                    const sameCapacityAndColorProduct = allProducts.find(
                      (p) =>
                        p.namespaceId === product.namespaceId &&
                        p.capacity === capacity &&
                        p.color?.toLowerCase() === selectedColor?.toLowerCase(),
                    );

                    return (
                      <button
                        key={capacity}
                        onClick={() => {
                          if (sameCapacityAndColorProduct) {
                            setSelectedCapacity(capacity);
                            updateUrl(
                              String(sameCapacityAndColorProduct.id),
                              selectedColor,
                              capacity,
                            );
                          }
                        }}
                        className={`cursor-pointer px-4 py-2 border border-elements text-sm transition-colors mb-6 ${
                          isSelected ?
                            'bg-white text-black border-black'
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
          <div
            className="text-2xl"
            aria-label="Price"
          >
            <span className="text-white mr-2 font-[Mont-Bold]">
              ${product.priceDiscount}
            </span>
            <span className="line-through text-secondary font-[Mont-Light]">
              ${product.priceRegular}
            </span>
          </div>

          {/* кнопки */}
          <div className="grid grid-cols-[1fr_48px] gap-2 w-full">
            <PrimaryButton onClick={() => console.log('Added to cart')}>
              Add to cart
            </PrimaryButton>
            <FavouritesButton
              onClick={() => console.log('Added to favorites')}
            />
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
            <h2 className="border-b border-b-[0.5px] border-elements pb-4 text-2xl font-bold">
              About
            </h2>
          </div>
          {product.description.map((section, idx) => (
            <article
              key={idx}
              className="mb-6"
            >
              <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
              {section.text.map((paragraph, pidx) => (
                <p
                  key={pidx}
                  className="leading-relaxed mb-2 text-gray-400"
                >
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
        </section>

        <section>
          <div className="mb-8">
            <div className="mb-8">
              <h2 className="border-b border-b-[0.5px] border-elements pb-4 text-2xl font-bold">
                Tech specs
              </h2>
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
                  <li className="text-secondary font-semibold">
                    Build in memory
                  </li>
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
        <YouMayAlsoLike
          youMayAlsoLikeProducts={allProducts}
          currentProductCategory={category || ''}
        />
      </section>
    </main>
  );
};
