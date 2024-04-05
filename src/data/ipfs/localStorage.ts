import _ from 'lodash';

const LOCAL_STORAGE_IPFS_CACHE = 'IPFS_CACHE_CLASSIC';

export const getIpfsLocalStorageItem = (key: string): Object | undefined => {
  if (typeof window === 'undefined') {
    throw new Error(`Window is undefined`);
  }
  const localStorageIpfsCache = window.localStorage.getItem(
    LOCAL_STORAGE_IPFS_CACHE,
  );
  if (localStorageIpfsCache === null) {
    localStorage.setItem(LOCAL_STORAGE_IPFS_CACHE, JSON.stringify({}));
    return;
  }
  const ipfsCacheObj = JSON.parse(localStorageIpfsCache);
  try {
    return ipfsCacheObj[key];
  } catch (err) {
    console.warn(err);
    return;
  }
};

export const setIpfsLocalStorageItem = (
  upsertObj: Record<string, Object>,
): boolean => {
  if (typeof window === 'undefined') {
    throw new Error(`Window is undefined`);
  }
  const localStorageIpfsCache = window.localStorage.getItem(
    LOCAL_STORAGE_IPFS_CACHE,
  );
  let existingObject: Object;
  if (localStorageIpfsCache === null) {
    existingObject = {};
  } else {
    existingObject = JSON.parse(localStorageIpfsCache);
  }
  const finalObj = JSON.stringify(_.assign(existingObject, upsertObj));
  window.localStorage.setItem(LOCAL_STORAGE_IPFS_CACHE, finalObj);
  return true;
};
