import {action, makeAutoObservable, observable} from 'mobx';
import {asyncPermissionStatus} from '../service/permissions';
import {IRootStore} from '../stores/types';
import {IPageControllerStore, IPagesKey} from './types';

export class PageControllerStore implements IPageControllerStore {
  rootStore: IRootStore;

  @observable checkedPage = IPagesKey.ImageAcquisition;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
    asyncPermissionStatus();
  }

  @action
  setCheckedPage = async (pageKey: IPagesKey) => {
    if (pageKey === IPagesKey.PermissionStatus) {
      await asyncPermissionStatus();
    }
    this.checkedPage = pageKey;
  };
}
