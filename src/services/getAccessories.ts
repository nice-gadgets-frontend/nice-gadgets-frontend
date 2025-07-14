export const getAccessories= () => {
  return fetch('/gadgets/accessories.json')
    .then((response) => response.json())
    .then((data) => data);
};
