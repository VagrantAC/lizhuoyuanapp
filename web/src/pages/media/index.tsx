import {inject, observer} from 'mobx-react';
import {Component, ReactNode} from 'react';
import {IMediaPage, ISavingState} from './types';
import {STYLES} from './configs';
import {IStores} from '../../stores/types';

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
