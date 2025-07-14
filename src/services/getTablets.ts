export const getTablets= () => {
  return fetch('/gadgets/tablets.json')
    .then((response) => response.json())
    .then((data) => data);
};
