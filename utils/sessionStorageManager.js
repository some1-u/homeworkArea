function getAllSessionStorageItems() {
  const items = {};
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    items[key] = sessionStorage.getItem(key);
  }
  return items;
}

export function getSessionStorageItem(key) {
  if (!key) {
    return getAllSessionStorageItems();
  }
  return sessionStorage.getItem(key);
}

export function setSessionStorageItem(key, value) {
  sessionStorage.setItem(key, value);
}

export function removeSessionStorageItem(key) {
  sessionStorage.removeItem(key);
}

export function clearSessionStorage() {
  sessionStorage.clear();
}
