function getAllLocalStorageItems() {
  const items = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    items[key] = localStorage.getItem(key);
  }
  return items;
}

export function getLocalStorageItem(key) {
  if (!key) {
    return getAllLocalStorageItems();
  }
  return localStorage.getItem(key);
}

export function setLocalStorageItem(key, value) {
  localStorage.setItem(key, value);
}

export function removeLocalStorageItem(key) {
  localStorage.removeItem(key);
}

export function clearLocalStorage() {
  localStorage.clear();
}
