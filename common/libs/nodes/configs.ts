import { RawNodeConfig } from 'types/node';
import { StaticNetworkIds } from 'types/network';

export const makeNodeName = (network: string, name: string) => {
  return `${network.toLowerCase()}_${name}`;
};

export const NODE_CONFIGS: { [key in StaticNetworkIds]: RawNodeConfig[] } = {
  AUX: [
    {
      name: makeNodeName('AUX', 'auxilium'),
      type: 'rpc',
      service: 'Localhost',
      url: 'http://localhost:8545/'
    }
  ],
  ETC: [
    {
      name: makeNodeName('ETC', 'etccooperative'),
      type: 'rpc',
      service: 'ETC Cooperative',
      url: 'https://ethereumclassic.network'
    }
  ]
};

export default NODE_CONFIGS;
