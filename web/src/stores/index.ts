import {HistoricalDataStore} from '../pages/historicalData/store';
import {MediaPageStore} from '../pages/media/store';
import {PageControllerStore} from '../pages/store';
import type {IRootStore, IStores} from './types';
import {ImageAcquisitionStore} from "../pages/imageAcquisition/store.ts";

class RootStore implements IRootStore {
  stores: IStores;

  constructor() {
    this.stores = {
      pageControllerStore: new PageControllerStore(this),
      historicalDataStore: new HistoricalDataStore(this),
      mediaPageStore: new MediaPageStore(this),
      imageAcquisitionStore: new ImageAcquisitionStore(this),
    };
  }

  getStores = () => this.stores;
}

export const rootStore: IRootStore = new RootStore();