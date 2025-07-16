import { useState, useEffect } from 'react';
import type { ProductType } from '../../types/ProductType';

export function useProduct(category: string | undefined, itemId: string | undefined, locationSearch: string) {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedCapacity, setSelectedCapacity] = useState<string | null>(null);

  useEffect(() => {
    if (!category) return;

    const getQueryParams = () => {
      const searchParams = new URLSearchParams(locationSearch);
      return {
        color: searchParams.get('color'),
        capacity: searchParams.get('capacity'),
      };
    };

    const basePath = '/gadgets';
    const url = `${basePath}/${category}.json`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${url}: ${res.statusText}`);
        return res.json();
      })
      .then((products: ProductType[]) => {
        setAllProducts(products);

        const { color: urlColor, capacity: urlCapacity } = getQueryParams();

        let found = itemId ? products.find(p => p.id === itemId) : null;

        if (!found && urlColor && urlCapacity) {
          found = products.find(
            p =>
              p.namespaceId === itemId &&
              p.color?.toLowerCase() === urlColor.toLowerCase() &&
              p.capacity === urlCapacity,
          );
        }

        if (!found && products.length > 0) found = products[0];

        if (found) {
          setProduct(found);

          const validColor =
            urlColor && found.colorsAvailable?.some(c => c.toLowerCase() === urlColor.toLowerCase())
              ? urlColor
              : found.color || found.colorsAvailable?.[0] || null;
          setSelectedColor(validColor);

          const validCapacity =
            urlCapacity && found.capacityAvailable?.includes(urlCapacity)
              ? urlCapacity
              : found.capacity || found.capacityAvailable?.[0] || null;
          setSelectedCapacity(validCapacity);
        } else {
          setProduct(null);
        }
      })
      .catch(error => {
        console.error('Error loading data:', error);
        setProduct(null);
      });
  }, [category, itemId, locationSearch]);

  return {
    product,
    allProducts,
    selectedColor,
    setSelectedColor,
    selectedCapacity,
    setSelectedCapacity,
  };
}