import { gasPriceDefaults, InsecureWalletName } from 'config/data';
import { AUX_DEFAULT } from 'config/dpaths';
import { makeExplorer } from 'utils/helpers';
import * as types from './types';

export const STATIC_NETWORKS_INITIAL_STATE: types.ConfigStaticNetworksState = {
  AUX: {
    id: 'AUX',
    name: 'Auxilium',
    unit: 'AUX',
    chainId: 8,
    isCustom: false,
    color: '#35395c',
    blockExplorer: makeExplorer({
      name: 'Explore Auxilium',
      origin: 'https://explore.auxilium.global/blockchain'
    }),
    tokens: require('config/tokens/auxilium.json'),
    contracts: require('config/contracts/auxilium.json'),
    dPathFormats: {
      [InsecureWalletName.MNEMONIC_PHRASE]: AUX_DEFAULT
    },
    gasPriceSettings: gasPriceDefaults,
    shouldEstimateGasPrice: true
  },
  ETC: {
    id: 'ETC',
    name: 'Ethereum Classic',
    unit: 'ETC',
    chainId: 61,
    isCustom: false,
    color: '#669073',
    blockExplorer: makeExplorer({
      name: 'GasTracker',
      origin: 'https://gastracker.io',
      addressPath: 'addr'
    }),
    tokens: require('config/tokens/etc.json'),
    contracts: require('config/contracts/etc.json'),
    dPathFormats: {
      [InsecureWalletName.MNEMONIC_PHRASE]: AUX_DEFAULT
    },
    gasPriceSettings: {
      min: 0.1,
      max: 10,
      initial: 1
    }
  }
};

export function staticNetworksReducer(
  state: types.ConfigStaticNetworksState = STATIC_NETWORKS_INITIAL_STATE,
  action: any
) {
  switch (action.type) {
    default:
      return state;
  }
}
