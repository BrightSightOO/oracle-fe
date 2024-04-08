import {
  getIpfsLocalStorageItem,
  setIpfsLocalStorageItem,
} from './localStorage';
import * as Schema from './schemas';

export * from './schemas';
export { getIpfsLocalStorageItem, setIpfsLocalStorageItem };

export async function getPredictionMarketInfo(
  hash: string,
): Promise<Schema.ParimutuelMarketSchema> {
  if (hash.startsWith('ipfs://')) {
    const parsedHash = hash.slice('ipfs://'.length);
    const cachedResource = getIpfsLocalStorageItem(
      parsedHash,
    ) as Schema.ParimutuelMarketSchema;
    if (!cachedResource) {
      const resource = await Schema.fetchIpfsPredictionMarket(parsedHash);
      setIpfsLocalStorageItem({ [parsedHash]: resource });
      return resource;
    }

    return cachedResource;
  }

  throw Error(`Uri ${hash} has unknown type`);
}
