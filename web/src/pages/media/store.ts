import {makeAutoObservable, observable} from 'mobx';
import {asyncStorageClient} from '../../service/asyncStorage';
import {IRootStore} from '../../stores/types';
import {IPagesKey} from '../types';
import {IMediaPageStore, ISavingState} from './types';
import {message} from "antd";

export class MediaPageStore implements IMediaPageStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @observable hasMediaLoaded: boolean = false;

  @observable savingState: ISavingState = ISavingState.None;

  @observable imagePath: string = '';

  setHasMediaLoaded = (value: boolean) => {
    this.hasMediaLoaded = value;
  };

  setImagePath = (path: string) => {
    this.savingState = ISavingState.None;
    this.imagePath = path;
    const {pageControllerStore} = this.rootStore.stores;
    pageControllerStore.setCheckedPage(IPagesKey.Media);
  };

  savingImage = async () => {
    this.savingState = ISavingState.Saving;
    try {
      await asyncStorageClient.storeImage(Date.now(), this.imagePath);
      message.info('保存成功');
      this.savingState = ISavingState.Saved;
      const {pageControllerStore} = this.rootStore.stores;
      pageControllerStore.setCheckedPage(IPagesKey.HistoricalData);
    } catch (e) {
      message.info( '保存失败，请前往设置页面确定当前APP是否有存储权限');
      this.savingState = ISavingState.None;
    }
  };

  closeImage = async () => {
    const {pageControllerStore} = this.rootStore.stores;
    pageControllerStore.setCheckedPage(IPagesKey.HistoricalData);
  };
}
