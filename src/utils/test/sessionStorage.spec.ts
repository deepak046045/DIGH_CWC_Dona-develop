import {
  setSessionStorageItem,
  getSessionStorageItem,
  removeSessionStorageItem,
  clearSessionStorage,
} from '../sessionStorage';

describe('sessionStorage utilities', () => {
  afterEach(() => {
    window.sessionStorage.clear();
  });

  it('sets and retrieves an item in sessionStorage', () => {
    const key = 'testKey';
    const value = { data: 'testValue' };

    setSessionStorageItem(key, value);
    const retrievedItem = getSessionStorageItem<typeof value>(key);
    expect(retrievedItem).toEqual(value);
  });

  it('returns null if item does not exist in sessionStorage', () => {
    const retrievedItem = getSessionStorageItem('nonExistentKey');
    expect(retrievedItem).toBeNull();
  });

  it('returns null if item in sessionStorage is not valid JSON', () => {
    window.sessionStorage.setItem('invalidJSON', 'this is not JSON');
    const retrievedItem = getSessionStorageItem('invalidJSON');
    expect(retrievedItem).toBeNull();
  });

  it('removes an item from sessionStorage', () => {
    const key = 'testKey';
    const value = 'testValue';
    window.sessionStorage.setItem(key, value);
    removeSessionStorageItem(key);
    expect(window.sessionStorage.getItem(key)).toBeNull();
  });

  it('clears all items from sessionStorage', () => {
    window.sessionStorage.setItem('key1', 'value1');
    window.sessionStorage.setItem('key2', 'value2');

    clearSessionStorage();

    expect(window.sessionStorage.length).toBe(0);
  });
});
