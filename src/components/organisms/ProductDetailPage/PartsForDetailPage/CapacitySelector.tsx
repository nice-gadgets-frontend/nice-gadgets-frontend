import React from 'react';
import type { ProductType } from '../../../../types/ProductType';

type CapacitySelectorProps = {
  capacities: string[];
  selectedCapacity: string | null;
  allProducts: ProductType[];
  namespaceId?: string;
  selectedColor: string | null;
  onCapacitySelect: (capacity: string) => void;
  updateUrl: (
    newProductId: string,
    color: string | null,
    capacity: string | null,
  ) => void;
};

export const CapacitySelector: React.FC<CapacitySelectorProps> = ({
  capacities,
  selectedCapacity,
  allProducts,
  namespaceId,
  selectedColor,
  onCapacitySelect,
  updateUrl,
}) => {
  return (
    <fieldset className="border-b border-b-[0.5px] border-elements">
      <legend className="block mb-2">Select capacity</legend>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 w-full">
        {capacities.map((capacity) => {
          const isSelected = capacity === selectedCapacity;

          const sameCapacityAndColorProduct = allProducts.find(
            (p) =>
              p.namespaceId === namespaceId &&
              p.capacity === capacity &&
              p.color?.toLowerCase() === selectedColor?.toLowerCase(),
          );

          return (
            <button
              key={capacity}
              onClick={() => {
                if (sameCapacityAndColorProduct) {
                  onCapacitySelect(capacity);
                  updateUrl(
                    String(sameCapacityAndColorProduct.id),
                    selectedColor,
                    capacity,
                  );
                }
              }}
              className={`cursor-pointer px-4 py-2 border border-elements text-sm transition-colors mb-6 ${
                isSelected ?
                  'bg-primary text-black border-black'
                : 'bg-transparent text-primary border-secondary hover:icons'
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
  );
};
