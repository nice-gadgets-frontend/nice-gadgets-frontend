import type { AddressType } from './AddressType';

type AddressSearch = {
  Addresses: AddressType[];
  TotalCount: number;
};

export type SearchSettlementsResponseType = {
  id: number;
  data: AddressSearch[];
  errorCodes: string[];
  errors: string[];
  info: string[];
  infoCodes: string[];
  messageCodes: string[];
  warningCodes: string[];
  warnings: string[];
  success: boolean;
};
