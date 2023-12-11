import type {IRootStore} from '../../../old_app/stores/types';
import type {IHistoricalDataStore} from '../historicalData/types';

export interface ITestCardPage {
  historicalDataStore?: IHistoricalDataStore;
}

export interface ITestCardPageStore {
  rootStore: IRootStore;
}
