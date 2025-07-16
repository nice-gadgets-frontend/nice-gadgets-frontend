import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AddressType } from "../../types/NovaPoshtaTypes/AddressType";

type Recipient = {
  name: string;
  surname: string;
  patronymic: string;
  phone: string;
};

type RecipientStore = {
  recipient: Recipient;
  setRecipient: (recipient: Recipient) => void;
  selectedCity: AddressType;
  setSelectedCity: (city: AddressType) => void;
  selectedDelivery: string;
  setSelectedDelivery: (delivery: string) => void;
  // selectedDepartment: any;
  // setSelectedDepartment: (department: any) => void;
};

const defaultCity = {
  Present: "м. Київ, Київська обл.",
  Warehouses: 10118,
  MainDescription: "Київ",
  Area: "Київська",
  Region: "",
  SettlementTypeCode: "м.",
  Ref: "e718a680-4b33-11e4-ab6d-005056801329",
  DeliveryCity: "8d5a980d-391c-11dd-90d9-001a92567626",
  AddressDeliveryAllowed: true,
  StreetsAvailability: true,
  ParentRegionTypes: "область",
  ParentRegionCode: "обл.",
  RegionTypes: "",
  RegionTypesCode: "",
};

export const useRecipientStore = create<RecipientStore>()(
  persist(
    (set) => ({
      recipient: {
        name: "John",
        surname: "Smith",
        patronymic: "Tarasovych",
        phone: "+38055555555",
      },
      setRecipient: (recipient) => set({ recipient }),
      selectedCity: defaultCity,
      setSelectedCity: (city) => set({ selectedCity: city }),
      selectedDelivery: "pickup",
      setSelectedDelivery: (delivery) => set({ selectedDelivery: delivery }),
    //   selectedDepartment: null,
    //   setSelectedDepartment: (department) =>
    //     set({ selectedDepartment: department }),
    }),
    {
      name: "recipient-storage",
    }
  )
);
