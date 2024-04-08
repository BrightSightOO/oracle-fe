import _ from 'lodash';
import * as DevnetConstants from './devnet';
import * as MainnetBetaConstants from './mainnetBeta';
import { PublicKey } from '@metaplex-foundation/umi';

const CLUSTER_MAP = {
  devnet: DevnetConstants,
  'mainnet-beta': MainnetBetaConstants,
};

const DEFAULT_CLUSTER = 'mainnet-beta';

export type ClusterKey = keyof typeof CLUSTER_MAP;

interface CLUSTER_KEY_MAP {
  QUOTE_TOKEN: PublicKey;
  HOGP_TOKEN: PublicKey;
  OPTIMISTIC_ORACLE: PublicKey;
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
      `ClusterConstants are undefined: ${undefinedValues.join(' ')}`,
    );
  }
  return retval as Pick<CLUSTER_KEY_MAP, K>;
}

export function getClusterConstant<K extends ClusterConstantKey>(
  constant: K,
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
