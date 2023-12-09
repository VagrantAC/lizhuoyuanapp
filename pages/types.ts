import type {IRootStore} from '../stores/types';

export interface IPageControllerStore {
  rootStore: IRootStore;
  checkedPage: IPagesKey;
  setCheckedPage: (pageKey: IPagesKey) => void;
}

export enum IPagesKey {
  ImageAcquisition,
  HistoricalData,
  Mine,
  PermissionStatus,
  Media,
  TestCard,
}

export interface IPageController {
  pageControllerStore?: IPageControllerStore;
}
