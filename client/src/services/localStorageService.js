export const setItemInLocalStorage = (key, value) =>
  localStorage.setItem(key, value);

export const getItemFromLocalStorage = (key) => {
  const result = localStorage.getItem(key);
  if (!result) return null;
  return result;
};

export const removeItemFromLocalStorage = (key) => localStorage.removeItem(key);
