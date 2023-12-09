import {inject, observer} from 'mobx-react';
import {Box, Text, HStack, Center, Pressable} from 'native-base';
import React, {Component, ReactNode} from 'react';
import {IStores} from '../stores/types';
import {IPageController, IPagesKey} from './types';
import {ImageAcquisitionPage} from './imageAcquisition';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MinePage} from './mine';
import {HistoricalDataPage} from './historicalData';
import {MediaPage} from './media';
import {TestCardPage} from './testCard';

@inject(({pageControllerStore}: IStores) => ({pageControllerStore}))
@observer
export class PageController extends Component<IPageController> {
  render(): ReactNode {
    const {pageControllerStore} = this.props;
    return (
      <>
        <Box height={'92%'} width="100%" alignSelf="center">
          {pageControllerStore?.checkedPage === IPagesKey.ImageAcquisition ? (
            <ImageAcquisitionPage />
          ) : null}
          {pageControllerStore?.checkedPage === IPagesKey.Mine ? (
            <MinePage />
          ) : null}
          {pageControllerStore?.checkedPage === IPagesKey.HistoricalData ? (
            <HistoricalDataPage />
          ) : null}
          {pageControllerStore?.checkedPage === IPagesKey.Media ? (
            <MediaPage />
          ) : null}
          {pageControllerStore?.checkedPage === IPagesKey.TestCard ? (
            <TestCardPage />
          ) : null}
        </Box>
        <Box safeAreaTop width="100%" alignSelf="center" height={'12%'}>
          <HStack alignItems="center" shadow={6}>
            {[
              {
                key: IPagesKey.ImageAcquisition,
                desc: '图像采集',
                icon: (
                  <Ionicons
                    name="camera"
                    color="black"
                    key={Math.random()}
                    size={22}
                  />
                ),
              },
              {
                key: IPagesKey.HistoricalData,
                desc: '历史数据',
                icon: (
                  <Ionicons
                    name="md-stats-chart"
                    color="black"
                    key={Math.random()}
                    size={22}
                  />
                ),
              },
              {
                key: IPagesKey.Mine,
                desc: '我的',
                icon: (
                  <Ionicons
                    name="md-person-sharp"
                    color="black"
                    key={Math.random()}
                    size={22}
                  />
                ),
              },
            ].map(({key, desc, icon}) => {
              return (
                <Pressable
                  opacity={pageControllerStore?.checkedPage === key ? 1 : 0.5}
                  key={key}
                  py="3"
                  flex={1}
                  onPress={() => {
                    pageControllerStore?.setCheckedPage(key);
                  }}>
                  <Center>
                    {icon}
                    <Text color="black" fontSize="14">
                      {desc}
                    </Text>
                  </Center>
                </Pressable>
              );
            })}
          </HStack>
        </Box>
      </>
    );
  }
}
