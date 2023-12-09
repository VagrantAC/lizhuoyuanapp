import {inject, observer} from 'mobx-react';
import React, {Component, ReactNode} from 'react';
import {IStores} from '../../stores/types';
import {ITestCardPage} from './types';
import {
  ArrowBackIcon,
  ArrowForwardIcon,
  AspectRatio,
  Box,
  Center,
  Image,
  ScrollView,
  Text,
  VStack,
  HStack,
  IconButton,
} from 'native-base';
import {
  brightness,
  ColorMatrix,
  concatColorMatrices,
  grayscale,
  hueRotate,
  saturate,
} from 'react-native-color-matrix-image-filters';
@inject(({historicalDataStore}: IStores) => ({historicalDataStore}))
@observer
export class TestCardPage extends Component<ITestCardPage> {
  render(): ReactNode {
    const {historicalDataStore} = this.props;
    const checkedData = historicalDataStore?.getCheckedData();
    return (
      <Box alignSelf="center">
        <ScrollView w="100%" h="80%">
          <VStack space={4} alignItems="center" paddingTop="2%">
            <Center h="20" rounded="md">
              <HStack space={3} justifyContent="center">
                <Center width="20%">
                  <IconButton
                    size="lg"
                    icon={<ArrowBackIcon />}
                    onPress={() => {
                      historicalDataStore?.setCheckedDataId(
                        Number(historicalDataStore?.checkedDataId) - 1,
                      );
                    }}
                  />
                </Center>

                <Center width="60%">
                  <Text fontSize="2xl" paddingTop="2%">
                    #第{Number(historicalDataStore?.checkedDataId) + 1}次实验
                  </Text>
                </Center>

                <Center width="20%">
                  <IconButton
                    size="lg"
                    icon={<ArrowForwardIcon />}
                    onPress={() => {
                      historicalDataStore?.setCheckedDataId(
                        Number(historicalDataStore?.checkedDataId) - 1,
                      );
                    }}
                  />
                </Center>
              </HStack>
            </Center>
            <Center h="40%" rounded="md">
              <Text fontSize="xl">原照片</Text>
              <AspectRatio h="80%" w="80%">
                <Image
                  resizeMode="cover"
                  src={`data:image/png;base64, ${checkedData?.rgbBase64}`}
                  alt="Picture of a Flower"
                />
              </AspectRatio>
            </Center>
            <Center h="40%" rounded="md">
              <Text fontSize="xl">灰度照片</Text>
              <AspectRatio h="80%" w="80%">
                <ColorMatrix matrix={concatColorMatrices(grayscale(1))}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={{
                      uri: `data:image/png;base64, ${checkedData?.rgbBase64}`,
                    }}
                  />
                </ColorMatrix>
              </AspectRatio>
            </Center>
          </VStack>
        </ScrollView>
      </Box>
    );
  }
}
