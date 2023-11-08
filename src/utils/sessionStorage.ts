export const setSessionStorageItem = <T>(key: string, value: T): void => {
  const serializedItem = JSON.stringify(value);
  window.sessionStorage.setItem(key, serializedItem);
};

export const getSessionStorageItem = <T>(key: string): T | null => {
  const serializedItem = window.sessionStorage.getItem(key);
  if (serializedItem !== null) {
    try {
      return JSON.parse(serializedItem) as T;
    } catch (error) {
      return null;
    }
  }
  return null;
};

export const removeSessionStorageItem = (key: string): void => {
  window.sessionStorage.removeItem(key);
};

export const clearSessionStorage = (): void => {
  window.sessionStorage.clear();
};
