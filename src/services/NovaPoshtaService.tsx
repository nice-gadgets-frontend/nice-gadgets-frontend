export const searchSettlements = async (searchQuery: string) => {
  return await fetch(import.meta.env.VITE_NOVA_POSHTA_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      modelName: 'AddressGeneral',
      calledMethod: 'searchSettlements',
      methodProperties: {
        CityName: searchQuery,
        Limit: 50,
        Page: 1,
      },
    }),
  });
};

export const getWarehouses = async (
  cityRef: string,
  searchQuery: string = '',
) => {
  return await fetch(import.meta.env.VITE_NOVA_POSHTA_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      modelName: 'AddressGeneral',
      calledMethod: 'getWarehouses',
      methodProperties: {
        FindByString: searchQuery,
        CityRef: cityRef,
        Language: 'UA',
      },
    }),
  });
};

export const getShippingPrice = async (
  cityRecipient: string) => {
  return fetch(import.meta.env.VITE_NOVA_POSHTA_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apiKey: import.meta.env.VITE_NOVA_POSHTA_API_KEY,
      modelName: "InternetDocumentGeneral",
      calledMethod: "getDocumentPrice",
      methodProperties: {
        CitySender: "8d5a980d-391c-11dd-90d9-001a92567626",
        CityRecipient: cityRecipient,
        Weight: "0.1",
        ServiceType: "WarehouseWarehouse",
        Cost: "300",
        CargoType:"Cargo",
        SeatsAmount: "1",
      },
    }),
  });
};