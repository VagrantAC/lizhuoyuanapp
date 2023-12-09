import {inject, observer} from 'mobx-react';
import {Component, ReactNode} from 'react';
import {IMediaPage, ISavingState} from './types';
import React from 'react';
import {StyleSheet, View, Image, ActivityIndicator} from 'react-native';
import {PressableOpacity} from 'react-native-pressable-opacity';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {BlurView, BlurViewProps} from '@react-native-community/blur';
import {STYLES} from './configs';
import {IStores} from '../../stores/types';
import {Center} from 'native-base';

export const StatusBarBlurBackground = React.memo(
  ({style, ...props}: BlurViewProps): React.ReactElement | null => {
    return (
      <BlurView
        style={[STYLES.statusBarBackground, style]}
        blurAmount={25}
        blurType="light"
        reducedTransparencyFallbackColor="rgba(140, 140, 140, 0.3)"
        {...props}
      />
    );
  },
);

@inject(({mediaPageStore}: IStores) => ({mediaPageStore}))
@observer
export class MediaPage extends Component<IMediaPage> {
  componentDidMount() {
    const {mediaPageStore} = this.props;
    mediaPageStore?.setHasMediaLoaded(false);
  }

  render(): ReactNode {
    const {mediaPageStore} = this.props;
    return (
      <View
        style={[
          STYLES.container,
          {opacity: mediaPageStore?.hasMediaLoaded ? 1 : 0},
        ]}>
        <Image
          source={{
            uri: `file://${mediaPageStore?.imagePath}`,
          }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onLoadEnd={() => mediaPageStore?.setHasMediaLoaded(true)}
        />

        <PressableOpacity
          style={STYLES.saveButton}
          onPress={() => {
            mediaPageStore?.savingImage();
          }}
          disabled={mediaPageStore?.savingState !== ISavingState.None}>
          {mediaPageStore?.savingState === ISavingState.None && (
            <Center>
              <Ionicons name="download" size={40} />
            </Center>
          )}
          {mediaPageStore?.savingState === ISavingState.Saved && (
            <Center>
              <Ionicons name="checkmark" size={40} />
            </Center>
          )}
          {mediaPageStore?.savingState === ISavingState.Saving && (
            <ActivityIndicator color="white" />
          )}
        </PressableOpacity>

        <PressableOpacity
          style={STYLES.closeButton}
          onPress={() => {
            mediaPageStore?.closeImage();
          }}
          disabled={mediaPageStore?.savingState !== ISavingState.None}>
          <Center>
            <Ionicons name="close" size={40} color="#000" />
          </Center>
        </PressableOpacity>
        <StatusBarBlurBackground />
      </View>
    );
  }
}
