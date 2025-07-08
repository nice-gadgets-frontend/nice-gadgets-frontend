export const CategoryType = {
  Phones: 'Phones',
  Tablets: 'Tablets',
  Accessories: 'Accessories',
} as const;

export type CategoryType = (typeof CategoryType)[keyof typeof CategoryType];