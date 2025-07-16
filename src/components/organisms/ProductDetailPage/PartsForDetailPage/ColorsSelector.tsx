import React from 'react';
import { ColorSelector } from '../../../Atoms/Buttons/ColorSelector';
import type { ProductType } from '../../../../types/ProductType';

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

type ColorsSelectorProps = {
  colors: string[];
  selectedColor: string | null;
  allProducts: ProductType[];
  namespaceId?: string;
  selectedCapacity: string | null;
  onColorSelect: (color: string) => void;
  updateUrl: (newProductId: string, color: string | null, capacity: string | null) => void;
};

export const ColorsSelector: React.FC<ColorsSelectorProps> = ({
  colors,
  selectedColor,
  allProducts,
  namespaceId,
  selectedCapacity,
  onColorSelect,
  updateUrl,
}) => {
  return (
    <fieldset className="border-b border-b-[0.5px] border-elements">
      <legend className="block mb-2">Available colors</legend>
<div className="grid grid-cols-[repeat(auto-fit,minmax(30px,40px))] gap-[8px] w-full">
        {colors.map(colorKey => {
          const sameColorAndCapacityProduct = allProducts.find(
            p =>
              p.namespaceId === namespaceId &&
              p.color?.toLowerCase() === colorKey.toLowerCase() &&
              p.capacity === selectedCapacity,
          );

          return (
            <button
              key={colorKey}
              onClick={() => {
                if (sameColorAndCapacityProduct) {
                  onColorSelect(colorKey);
                  updateUrl(String(sameColorAndCapacityProduct.id), colorKey, selectedCapacity);
                }
              }}
              className="focus:outline-none cursor-pointer mb-6"
              aria-pressed={selectedColor === colorKey}
              aria-label={`Select color ${colorKey}`}
            >
              <ColorSelector color={colorHexMap[colorKey] || ''} selected={selectedColor === colorKey} />
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};
