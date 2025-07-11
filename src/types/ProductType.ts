export interface ProductType {
  id: number | string;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  screen: string;
  capacity: string;
  color: string;
  priceDiscount: number;
  priceRegular: number;
  price:number;
  resolution?: string;
  processor?: string;
  capacityAvailable?: string[];
  colorsAvailable?: string[];
  ram?: string;
  year?: number;
  image?: string;
  images?: string[];
  camera?: string;
  zoom?: string;
  cell?: string[];
  description: DescriptionSection[];
};

export interface DescriptionSection {
  title: string;
  text: string[];
}