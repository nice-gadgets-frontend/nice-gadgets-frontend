export interface DescriptionSection {
  title: string;
  text: string[];
}

export interface ProductType {
  id: number | string;
  category: string;
  itemId: string;
  name: string;
  fullPrice: number;
  priceDiscount: number;
  priceRegular: number;
  price?:number;
  screen?: string;
  resolution?: string;
  processor?: string;
  capacity: string;
  capacityAvailable?: string[];
  color: string;
  colorsAvailable?: string[];
  ram?: string;
  year?: number;
  image?: string;
  images?: string[];
  camera?: string;
  zoom?: string;
  cell?: string[];
  description: DescriptionSection[];
}
