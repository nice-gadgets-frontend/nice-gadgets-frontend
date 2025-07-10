export const getProducts = () => {
  return fetch('/gadgets/products.json')
    .then((response) => response.json())
    .then((data) => data);
};
