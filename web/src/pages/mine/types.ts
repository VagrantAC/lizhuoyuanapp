import {IRootStore} from "../../stores/types.ts";

export interface IMinePageStore {
  rootStore: IRootStore;
}

export interface IMinePage {
  minePageStore?: IMinePageStore;
}
