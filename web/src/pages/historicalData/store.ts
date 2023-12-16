import {action, makeAutoObservable, observable} from 'mobx';
import {localServiceClient} from '../../service/asyncStorage';
import {IRootStore} from '../../stores/types';
import {IPagesKey} from '../types';
import {IHistoricalData, IHistoricalDataStore} from './types';

export class HistoricalDataStore implements IHistoricalDataStore {
  rootStore: IRootStore;

  @observable historicalDatas: IHistoricalData[] = [];

  @observable checkedDataId: number = 0;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    setInterval(() => {
      this.getImageKeys();
    }, 2000);
  }

  getImageKeys = async () => {
    const keys = await localServiceClient.getKeys();
    const historicalDatas: IHistoricalData[] = [];
    (await Promise.all(keys.map(async (key) => {
      try {
        const info = (await localServiceClient.get(key))?.data.info;
        const res: IHistoricalData = JSON.parse(info);
        res.key = key;
        historicalDatas.push((res))
      }catch (e) {
        console.error(e)
      }
    })))
    this.historicalDatas = historicalDatas.sort((a, b) => a.key < b.key ? 1 : -1);
  };

  @action
  setCheckedDataId = (id: number) => {
    const len = this.historicalDatas.length;
    this.checkedDataId = (id + len) % len;

    const {pageControllerStore} = this.rootStore.stores;
    pageControllerStore.setCheckedPage(IPagesKey.TestCard);
  };

  getCheckedData = () => {
    return this.historicalDatas[this.checkedDataId];
  };
}
