export const getPhones = () => {
  return fetch('/api/phones.json')
    .then(response => response.json())
    .then(data => data);
};
