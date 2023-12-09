import type {IRootStore} from '../../stores/types';

export interface IMinePageStore {
  rootStore: IRootStore;
}

export interface IMinePage {
  minePageStore?: IMinePageStore;
}
