// import RNFS from 'react-native-fs';
// import * as ImageManipulator from 'expo-image-manipulator';
// import {SaveFormat} from 'expo-image-manipulator';
// import convert from 'color-convert';
// expo install expo-image-manipulator```

// 安装完成后，可以使用以下代码将图像从RGB转换为HSV：

// ```javascriptimport * as ImageManipulator from 'expo-image-manipulator';

// const convertRGBtoHSV = async (path: string) => {
//   const manipResult = await ImageManipulator.manipulateAsync(path, [], {
//     format: SaveFormat.PNG,
//   });
//
//   const convertedData = convert.rgb.hsv(manipResult.pixelData);
//
//   const fileBody = await RNFS.readFile(path, 'base64');
//   const convertedData = convert.rgb.hsv(convert.rgb.hex(imageData));
//   return manipResult.uri;
// };
//
// export async function RGB2HSV(path: string) {
// const hsvImage = await ImageFilter.process(image, [
//   {
//     name: 'RGBToHSV',
//     params: {},
//   },
// ]);
//
// const base64 = `data:image/jpeg;base64,${hsvImage.base64}`;
// setBase64Image(base64);
// try {
//   let width = 0;
//   let height = 0;
//   await Image.getSize(path, (w: number, h: number) => {
//     width = w;
//     height = h;
//   });
//   const cropData = {
//     offset: {x: 0, y: 0},
//     size: {width, height},
//     displaySize: {width, height},
//   };
//
//   const pixelData = await ImageEditor.cropImage(path, cropData);
//   const colors = [];
//
//   for (let i = 0; i < pixelData.length; i += 4) {
//     console.log('log pixelData:', pixelData);
//     const r = Number(pixelData[i]);
//     const g = Number(pixelData[i + 1]);
//     const b = Number(pixelData[i + 2]);
//     const hsv = convert.rgb.hsv([r, g, b]);
//     colors.push({
//       hue: hsv[0],
//       saturation: hsv[1],
//       value: hsv[2],
//     });
//   }
//   return colors;
// } catch (error) {
//   console.error('Error getting image colors:', error);
//   return [];
// }
// }
