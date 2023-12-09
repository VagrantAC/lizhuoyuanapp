import {action, makeAutoObservable, observable} from 'mobx';
import {asyncStorageClient} from '../../service/asyncStorage';
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
    const keys = await asyncStorageClient.getImageKeys();
    this.historicalDatas = (await asyncStorageClient.multiGet(keys))
      .map(([key, value]) => {
        const timestamp = key.split('_')[2];
        const rgbBase64 = value ?? '';
        const data: IHistoricalData = {
          key,
          timestamp,
          rgbBase64,
          hsvBase64: '',
        };
        return data;
      })
      .sort((a: IHistoricalData, b: IHistoricalData) => {
        return a.timestamp < b.timestamp ? 1 : -1;
      });

    this.historicalDatas.forEach(async data => {
      const hsvBody = await asyncStorageClient.get(
        `hsv_image_${data.timestamp}`,
      );
      data.hsvBase64 = hsvBody ?? '';
    });
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
