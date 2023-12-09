import type {IRootStore} from '../../stores/types';
import type {IMinePageStore} from './types';

export class MinePageStore implements IMinePageStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }
}
