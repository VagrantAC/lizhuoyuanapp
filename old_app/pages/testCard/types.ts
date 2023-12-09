import type {IRootStore} from '../../stores/types';
import type {IHistoricalDataStore} from '../historicalData/types';

export interface ITestCardPage {
  historicalDataStore?: IHistoricalDataStore;
}

export interface ITestCardPageStore {
  rootStore: IRootStore;
}
