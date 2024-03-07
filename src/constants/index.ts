import _ from 'lodash';
import { PublicKey } from '@solana/web3.js';
import * as DevnetConstants from './devnet';
import * as MainnetBetaConstants from './mainnetBeta';

export const SECONDS_MS = 1000;
export const MINUTES_SECONDS = 60;
export const HOURS_SECONDS = 3600;
export const DAYS_SECONDS = 86400;
export const WEEK_SECONDS = DAYS_SECONDS * 7;
export const MONTH_SECONDS = WEEK_SECONDS * 4;

export const DAILY_MAX_POINTS = 100;
export const POINTS_PER_RESPONSE = 10;

export const TIME_CHART_OPTIONS: { [key: string]: number } = {
  '1W': WEEK_SECONDS * SECONDS_MS,
  '1M': MONTH_SECONDS * SECONDS_MS,
  '3M': MONTH_SECONDS * SECONDS_MS * 3,
  '6M': MONTH_SECONDS * SECONDS_MS * 6,
  '1Y': MONTH_SECONDS * SECONDS_MS * 12,
  ALL: new Date().getTime(),
};

const CLUSTER_MAP = {
  devnet: DevnetConstants,
  'mainnet-beta': MainnetBetaConstants,
};

const DEFAULT_CLUSTER = 'mainnet-beta';

export type ClusterKey = keyof typeof CLUSTER_MAP;

interface CLUSTER_KEY_MAP {
  QUOTE_TOKEN: PublicKey;
  HOGP_TOKEN: PublicKey;
  MINT_PUBKEY_TO_DECIMAL: { [key: string]: number };
  TOKEN_TYPES: { [key: string]: PublicKey };
  MINT_PUBKEY_TO_NAME: { [key: string]: string };
}

export type ClusterConstantKey = keyof CLUSTER_KEY_MAP;

class ClusterSingelton {
  readonly currentCluster: ClusterKey;
  readonly clusterConstants: Partial<CLUSTER_KEY_MAP>;

  constructor(cluster: ClusterKey) {
    this.currentCluster = cluster;
    const clusterConstants = _.assign({}, CLUSTER_MAP[cluster]);
    this.clusterConstants = clusterConstants;
  }

  getClusterConstants() {
    return this.clusterConstants;
  }
}

let clusterSingleton = new ClusterSingelton(DEFAULT_CLUSTER);

export const setCluster = (cluster: ClusterKey) => {
  clusterSingleton = new ClusterSingelton(cluster);
};

export function getClusterConstants<K extends ClusterConstantKey>(
  ...constants: K[]
): Pick<CLUSTER_KEY_MAP, K> {
  const clusterConstants = clusterSingleton.getClusterConstants();
  const retval = _.pick(clusterConstants, constants);
  let undefinedValues: string[] = [];
  _.forEach(retval, (value, key) => {
    if (value === undefined) {
      undefinedValues.push(key);
    }
  });
  if (undefinedValues.length > 0) {
    throw new Error(
      `ClusterConstants are undefined: ${undefinedValues.join(' ')}`
    );
  }
  return retval as Pick<CLUSTER_KEY_MAP, K>;
}

export function getClusterConstant<K extends ClusterConstantKey>(
  constant: K
): CLUSTER_KEY_MAP[K] {
  const clusterConstants = clusterSingleton.getClusterConstants();
  const value = (clusterConstants[constant] ?? undefined) as
    | CLUSTER_KEY_MAP[K]
    | undefined;
  if (typeof value === 'undefined') {
    throw new Error(`Cluster constant is undefined: ${constant}`);
  }
  return value;
}
