import {action, makeAutoObservable, observable} from 'mobx';
import {IPageControllerStore, IPagesKey} from './types';
import type {IRootStore} from "../stores/types.ts";

export class PageControllerStore implements IPageControllerStore {
  rootStore: IRootStore;

  @observable checkedPage = IPagesKey.ImageAcquisition;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @action
  setCheckedPage = async (pageKey: IPagesKey) => {
    if (pageKey === IPagesKey.PermissionStatus) {
      // await asyncPermissionStatus();
    }
    this.checkedPage = pageKey;
  };
}
