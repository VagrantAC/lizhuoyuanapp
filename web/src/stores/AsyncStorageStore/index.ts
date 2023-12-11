import type {IRootStore} from '../types';
import type {IAsyncStorageStore} from './types';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export class AsyncStorageStore implements IAsyncStorageStore {
  rootStore: IRootStore;
  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }

  storeImage = async (path: string) => {
    try {
      const jsonValue = JSON.stringify(path);
      // await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {
      console.log('log error:', e);
      // saving error
    }
  };
}
