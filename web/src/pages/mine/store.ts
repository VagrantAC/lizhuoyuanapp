import type {IMinePageStore} from './types';
import type {IRootStore} from "../../stores/types.ts";

export class MinePageStore implements IMinePageStore {
  rootStore: IRootStore;

  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }
}
