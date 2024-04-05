import _ from 'lodash';
import axios from 'axios';

const isIpfsSchema = (
  keyTypeMap: Record<string, string | string[]>,
  value: any,
) => {
  if (typeof value !== 'object') {
    return false;
  }
  const invalidKeys = _.difference(_.keys(value), _.keys(keyTypeMap));
  if (invalidKeys.length > 0) {
    return false;
  }
  return _.reduce(
    keyTypeMap,
    (flag, keyType, key) => {
      if (!flag) {
        return flag;
      }
      const foundType: string = typeof value[key];
      if (_.isArray(keyType)) {
        return keyType.includes(foundType);
      }
      return typeof value[key] === keyType;
    },
    true,
  );
};
export interface IpfsClassicMarket {
  title: string;
  description: string;
  categories: string[];
}

export type SchemaData = EspnData | Record<string, never>;

type EspnData = {
  type: DataType.Espn;
  id: string;
  sport: string;
  league: string;
};

export enum DataType {
  Espn = 'espn',
}

export interface ParimutuelMarketSchema {
  version: number;
  title: string;
  description: string;
  categories: string[];
  data: SchemaData;
  showPublic: boolean;
}

export const isIpfsClassicMarket = (value: any): value is IpfsClassicMarket =>
  isIpfsSchema(
    {
      title: 'string',
      description: 'string',
      categories: 'object',
    },
    value,
  );

export const isIpfsPredictionMarket = (
  value: any,
): value is ParimutuelMarketSchema =>
  isIpfsSchema(
    {
      version: 'number',
      title: 'string',
      description: 'string',
      categories: 'object',
      data: 'object',
      showPublic: 'boolean',
    },
    value,
  );

export type IpfsSchemaType = keyof typeof SchemaValidationMap;
const SchemaValidationMap = {
  IpfsClassicMarket: isIpfsClassicMarket,
};

async function fetchIpfsSchema<T>(
  validationFn: (value: any) => value is T,
  hash: string,
): Promise<T> {
  const data = await getFileFromHash(hash);

  const isValid = validationFn(data);
  if (!isValid) {
    throw new Error(`Ipfs JSON is invalid for hash ${hash}`);
  }
  return data;
}

export const fetchIpfsClassicMarket = (ipfsHash: string) =>
  fetchIpfsSchema(isIpfsClassicMarket, ipfsHash);

export const fetchIpfsPredictionMarket = (ipfsHash: string) =>
  fetchIpfsSchema(isIpfsPredictionMarket, ipfsHash);

export const validateSchema = (
  schemaType: keyof typeof SchemaValidationMap,
  data: any,
) => {
  const isValid = SchemaValidationMap[schemaType](data);
  if (!isValid) {
    throw new Error(`Invalid object for schemaType: ${schemaType}`);
  }
};

const getFileFromHash = async (hash: string) => {
  if (!hash) {
    throw 'No hash was given';
  }

  try {
    const response = await axios(`https://nftstorage.link/ipfs/${hash}`, {
      timeout: 5000,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};
