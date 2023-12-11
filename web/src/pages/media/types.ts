import {IRootStore} from '../../../old_app/stores/types';

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
  imagePath: string;

  setImagePath: (path: string) => void;
  setHasMediaLoaded: (value: boolean) => void;
  savingImage: () => void;
  closeImage: () => void;
}
