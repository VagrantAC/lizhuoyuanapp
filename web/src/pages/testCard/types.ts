import type {IHistoricalDataStore} from '../historicalData/types';
import type {IRootStore} from "../../stores/types.ts";

export interface ITestCardPage {
  historicalDataStore?: IHistoricalDataStore;
}

export interface ITestCardPageStore {
  rootStore: IRootStore;
}
