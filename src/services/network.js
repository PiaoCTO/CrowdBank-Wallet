import _ from 'lodash';
import { rpc } from '@cityofzion/neon-js';

import { store } from '../store';
import storage from './storage';
import { intervals } from '../constants';

const NETWORK_STORAGE_KEY = 'cbank.network';
const NETWORKS = [
  {
    label: 'MainNet',
    value: {
      aph: '',
      net: 'MainNet',
//      rpc: 'http://192.168.50.135:10332',
      rpc: 'http://206.189.144.103:50332',
    },
  },
];

let loadNetworkStatusIntervalId;

export default {
  getNetworks() {
    return _.sortBy(NETWORKS, 'label');
  },

  getRpcClient() {
    return rpc.default.create.rpcClient(this.getSelectedNetwork().rpc);
  },

  getSelectedNetwork() {
    return storage.get(NETWORK_STORAGE_KEY, _.first(NETWORKS).value);
  },

  init() {
    this.setSelectedNetwork(this.getSelectedNetwork());
  },

  loadStatus() {
    const network = this.getSelectedNetwork();
    const rpcClient = this.getRpcClient();

    rpcClient.getBestBlockHash()
      .then((blockHash) => {
        rpcClient.getBlock(blockHash)
          .then((data) => {
            if (network.bestBlock && network.bestBlock.index === data.index) {
              return;
            }
            store.commit('setLastReceivedBlock');
            store.commit('setLastSuccessfulRequest');
            this.normalizeAndStore(_.set(network, 'bestBlock', data)).sync();
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  },

  normalizeAndStore(network) {
    storage.set(NETWORK_STORAGE_KEY, network);

    return this;
  },

  setSelectedNetwork(network) {
    this.normalizeAndStore(network).sync();

    if (loadNetworkStatusIntervalId) {
      clearInterval(loadNetworkStatusIntervalId);
    }

    this.loadStatus();
    loadNetworkStatusIntervalId = setInterval(() => {
      this.loadStatus();
    }, intervals.NETWORK_STATUS);

    return this;
  },

  sync() {
    store.commit('setCurrentNetwork', this.getSelectedNetwork());
  },

};
