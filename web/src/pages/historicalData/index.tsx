import {Component, ReactNode} from 'react';

import {inject, observer} from 'mobx-react';

import type {IHistoricalDataPage} from './types';
import type {IStores} from '../../stores/types';

@inject(({historicalDataStore}: IStores) => ({historicalDataStore}))
@observer
export class HistoricalDataPage extends Component<IHistoricalDataPage> {
  render(): ReactNode {
    const {historicalDataStore} = this.props;
    console.log(
      'log historicalDataStore?.historicalDatas:',
      historicalDataStore?.historicalDatas?.length,
    );
    return (
      <Box alignSelf="center">
        <VStack space={4} alignItems="center" paddingTop="2%">
          <Center w="80" h="20" rounded="md">
            <Text fontSize="xl">实验数据</Text>
          </Center>
          <ScrollView w="100%">
            {historicalDataStore?.historicalDatas?.map(
              ({key, timestamp, rgbBase64}, id) => {
                const date = new Date(Number(timestamp));
                return (
                  <Box
                    bg="#E1E4E7"
                    p="4"
                    shadow={2}
                    key={key}
                    borderRadius="4"
                    rounded="xl"
                    marginBottom="5%"
                    flexDirection="row"
                    onTouchStart={() => {
                      historicalDataStore.setCheckedDataId(id);
                    }}
                    w="100%">
                    <AspectRatio h="40" w="45%">
                      <Image
                        resizeMode="cover"
                        src={`data:image/png;base64, ${rgbBase64}`}
                        alt="Picture of a Flower"
                      />
                    </AspectRatio>
                    <Stack space={2} w="40%" marginLeft="5%">
                      <Text fontSize="16">实验时间</Text>
                      <Text fontSize="16">{date.toLocaleString()}</Text>
                    </Stack>
                  </Box>
                );
              },
            )}
          </ScrollView>
        </VStack>
      </Box>
    );
  }
}
