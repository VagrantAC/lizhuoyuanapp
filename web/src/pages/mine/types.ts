import type {IRootStore} from '../../../old_app/stores/types';

export interface IMinePageStore {
  rootStore: IRootStore;
}

export interface IMinePage {
  minePageStore?: IMinePageStore;
}
