import type {IHistoricalDataStore} from '../pages/historicalData/types';
import type {IMediaPageStore} from '../pages/media/types';
import type {IPageControllerStore} from '../pages/types';
import type {IAsyncStorageStore} from './AsyncStorageStore/types';
import type {IImageAcquisitionStore} from "../pages/imageAcquisition/types.ts";

export interface IStores {
  pageControllerStore: IPageControllerStore;
  asyncStorageStore: IAsyncStorageStore;
  historicalDataStore: IHistoricalDataStore;
  mediaPageStore: IMediaPageStore;
  imageAcquisitionStore: IImageAcquisitionStore;
}

export interface IRootStore {
  stores: IStores;
  getStores: () => IStores;
}
