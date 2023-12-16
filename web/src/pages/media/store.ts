import {makeAutoObservable, observable} from 'mobx';
import {IRootStore} from '../../stores/types';
import {IPagesKey} from '../types';
import {IMediaPageStore, ISavingState} from './types';
import {message} from "antd";
import {localServiceClient} from "../../service/asyncStorage";

export class MediaPageStore implements IMediaPageStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @observable hasMediaLoaded: boolean = false;

  @observable savingState: ISavingState = ISavingState.None;

  @observable image: string = '';

  setHasMediaLoaded = (value: boolean) => {
    this.hasMediaLoaded = value;
  };

  setImage = (image: string) => {
    this.savingState = ISavingState.None;
    this.image = image;
    const {pageControllerStore} = this.rootStore.stores;
    pageControllerStore.setCheckedPage(IPagesKey.Media);
  };

  savingImage = async () => {
    try {
      const hsvImage = (await localServiceClient.rgb2hsv(this.image.replace("data:image/jpeg;base64,",""))).data;
      console.log("log hsv:", hsvImage)
      await localServiceClient.post(JSON.stringify( {
        rgbBase64: this.image,
        timestamp: Date.now(),
        hsvBase64: `data:image/jpeg;base64,${hsvImage}`,
      }));
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
