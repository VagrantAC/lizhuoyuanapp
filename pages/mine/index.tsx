import React, {Component, ReactNode} from 'react';

import {IMinePage} from './types';
import {inject, observer} from 'mobx-react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Box, Button, Center, HStack, Text, Toast, VStack} from 'native-base';
import {cosClient} from '../../service/cos';
import {VERSION} from '../../configs';
import {Linking} from 'react-native';
@inject(({}) => ({}))
@observer
export class MinePage extends Component<IMinePage> {
  render(): ReactNode {
    return (
      <Box alignSelf="center">
        <VStack space={4} alignItems="center" paddingTop="2%">
          <Center w="80" h="20" rounded="md">
            <Text fontSize="xl">我的设置</Text>
          </Center>
          <Button
            variant="subtle"
            borderRadius="xl"
            h="16"
            onPress={async () => {
              const version = await cosClient.getNewVersion();
              if (version === VERSION) {
                Toast.show({
                  bg: '#B6F8C4',
                  description: <Text color="#000">这已经是最新版本了</Text>,
                  placement: 'top',
                });
                return;
              }
              Linking.openURL(
                'https://lizhuoyuan-rn-project-1305502573.cos.ap-nanjing.myqcloud.com/apk/app-v' +
                  version,
              );
            }}>
            <HStack marginRight="40">
              <Ionicons name="cloud-download-outline" size={28} />
              <Text fontSize="lg"> 下载最新版本</Text>
            </HStack>
          </Button>
        </VStack>
      </Box>
    );
  }
}
