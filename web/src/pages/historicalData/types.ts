import {IRootStore} from '../../stores/types';

export interface IHistoricalDataStore {
  rootStore: IRootStore;
  checkedDataId: number;
  historicalDatas: IHistoricalData[];
  getCheckedData: () => IHistoricalData;
  getImageKeys: () => void;
  setCheckedDataId: (id: number) => void;
  deleteById: (id: number) => void;
}

export interface IHistoricalData {
  key: number;
  timestamp: number;
  rgbBase64: string;
  hsvBase64: string;
}

export interface IHistoricalDataPage {
  historicalDataStore?: IHistoricalDataStore;
}
