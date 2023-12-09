import {IRootStore} from '../../stores/types';

export interface IHistoricalDataStore {
  rootStore: IRootStore;
  checkedDataId: number;
  historicalDatas: IHistoricalData[];
  getCheckedData: () => IHistoricalData;
  getImageKeys: () => void;
  setCheckedDataId: (id: number) => void;
}

export interface IHistoricalData {
  key: string;
  timestamp: string;
  rgbBase64: string;
  hsvBase64: string;
}

export interface IHistoricalDataPage {
  historicalDataStore?: IHistoricalDataStore;
}
