import {Camera} from 'react-native-vision-camera';
import {Linking, PermissionsAndroid} from 'react-native';

export const asyncPermissionStatus = async () => {
  if ((await Camera.requestCameraPermission()) === 'denied') {
    await Linking.openSettings();
  }

  if ((await Camera.requestMicrophonePermission()) === 'denied') {
    await Linking.openSettings();
  }

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  if (!(await PermissionsAndroid.check(permission))) {
    const permissionRequestResult = await PermissionsAndroid.request(
      permission,
    );

    console.log('XXXXX', permissionRequestResult);
    if (permissionRequestResult !== 'granted') {
      await Linking.openSettings();
    }
  }
};
