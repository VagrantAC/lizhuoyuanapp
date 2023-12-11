import {inject, observer} from 'mobx-react';
import {Component, ReactNode} from 'react';
import {ITestCardPage} from './types';
import {IStores} from "../../stores/types.ts";

@inject(({historicalDataStore}: IStores) => ({historicalDataStore}))
@observer
export class TestCardPage extends Component<ITestCardPage> {
  render(): ReactNode {
    const {historicalDataStore} = this.props;
    const checkedData = historicalDataStore?.getCheckedData();
    // return (
    //   <div>
    //     <div>
    //       <div>
    //         <div>
    //           <div>
    //             <div>
    //               <IconButton
    //                 size="lg"
    //                 icon={<ArrowBackIcon />}
    //                 onPress={() => {
    //                   historicalDataStore?.setCheckedDataId(
    //                     Number(historicalDataStore?.checkedDataId) - 1,
    //                   );
    //                 }}
    //               />
    //             </div>
    //
    //             <Center width="60%">
    //               <Text fontSize="2xl" paddingTop="2%">
    //                 #第{Number(historicalDataStore?.checkedDataId) + 1}次实验
    //               </Text>
    //             </Center>
    //
    //             <Center width="20%">
    //               <IconButton
    //                 size="lg"
    //                 icon={<ArrowForwardIcon />}
    //                 onPress={() => {
    //                   historicalDataStore?.setCheckedDataId(
    //                     Number(historicalDataStore?.checkedDataId) - 1,
    //                   );
    //                 }}
    //               />
    //             </Center>
    //           </div>
    //         </div>
    //         <Center h="40%" rounded="md">
    //           <Text fontSize="xl">原照片</Text>
    //           <AspectRatio h="80%" w="80%">
    //             <Image
    //               resizeMode="cover"
    //               src={`data:image/png;base64, ${checkedData?.rgbBase64}`}
    //               alt="Picture of a Flower"
    //             />
    //           </AspectRatio>
    //         </Center>
    //         <Center h="40%" rounded="md">
    //           <Text fontSize="xl">灰度照片</Text>
    //           <AspectRatio h="80%" w="80%">
    //             <ColorMatrix matrix={concatColorMatrices(grayscale(1))}>
    //               <Image
    //                 style={{width: '100%', height: '100%'}}
    //                 source={{
    //                   uri: `data:image/png;base64, ${checkedData?.rgbBase64}`,
    //                 }}
    //               />
    //             </ColorMatrix>
    //           </AspectRatio>
    //         </Center>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}
