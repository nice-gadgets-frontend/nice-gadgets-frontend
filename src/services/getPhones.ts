export const getPhones= () => {
  return fetch('/gadgets/phones.json')
    .then((response) => response.json())
    .then((data) => data);
};
