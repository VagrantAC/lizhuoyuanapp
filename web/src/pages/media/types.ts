import {IRootStore} from "../../stores/types.ts";

export interface IMediaPage {
  mediaPageStore?: IMediaPageStore;
}

export enum ISavingState {
  None,
  Saving,
  Saved,
}

export interface IMediaPageStore {
  rootStore: IRootStore;
  hasMediaLoaded: boolean;
  savingState: ISavingState;
  image: string;

  setImage: (image: string) => void;
  setHasMediaLoaded: (value: boolean) => void;
  savingImage: () => void;
  closeImage: () => void;
}
