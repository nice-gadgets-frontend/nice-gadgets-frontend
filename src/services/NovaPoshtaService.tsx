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
