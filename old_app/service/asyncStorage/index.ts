import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

export class AsyncStorageClient {
  storeImage = async (timestamp: number, path: string) => {
    const fileBody = await RNFS.readFile(path, 'base64');
    await AsyncStorage.setItem(`rgb_image_${timestamp}`, fileBody);

    // const hsvBody = await RGB2HSV(path);
    // console.log('log hsvBody:', hsvBody);
    // await AsyncStorage.setItem(`hsv_image_${timestamp}`, hsvBody);
  };

  getImageKeys = async () => {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      return allKeys.filter(key => key.includes('_image_')).map(key => key);
    } catch (e) {
      console.error(e);
    }
    return [];
  };

  get = async (key: string) => {
    try {
      const res = AsyncStorage.getItem(key);
      return res;
    } catch (e) {
      console.error(e);
    }
    return null;
  };

  multiGet = async (keys: string[]) => {
    try {
      const res = AsyncStorage.multiGet(keys);
      return res;
    } catch (e) {
      console.error(e);
    }
    return [];
  };
}

export const asyncStorageClient = new AsyncStorageClient();
