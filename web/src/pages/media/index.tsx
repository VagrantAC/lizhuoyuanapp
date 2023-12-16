import {inject, observer} from 'mobx-react';
import {Component, ReactNode} from 'react';
import {IMediaPage, ISavingState} from './types';
import {IStores} from '../../stores/types';
import {Image} from "antd-mobile";
import {CheckOutlined, CloseOutlined, DownloadOutlined} from "@ant-design/icons";

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
      <div>
        <Image  src={mediaPageStore?.image} alt="Base64 Image"/>
        {mediaPageStore?.savingState === ISavingState.None && (
          <DownloadOutlined
              onClick={() => mediaPageStore?.savingImage()}
              style={{
                  fontSize: '2.5rem',
                  color: '#0f0',
                  display: 'flex',
                  justifyContent: 'center',
                  border: 'none',
                  position: 'absolute',
                  alignItems: 'center',
                  bottom: '15%',
                  left: '5%',
              }}
          />
        )}
        {mediaPageStore?.savingState === ISavingState.Saved && (
          <CheckOutlined
              style={{
                  fontSize: '2.5rem',
                  color: '#0f0',
                  display: 'flex',
                  justifyContent: 'center',
                  border: 'none',
                  position: 'absolute',
                  alignItems: 'center',
                  bottom: '15%',
                  left: '5%',
              }}
          />
        )}
        <CloseOutlined
            onClick={() => mediaPageStore?.closeImage()}
            disabled={mediaPageStore?.savingState !== ISavingState.None}
            style={{
                fontSize: '2.5rem',
                color: '#f00',
                display: 'flex',
                justifyContent: 'center',
                border: 'none',
                position: 'absolute',
                alignItems: 'center',
                top: '5%',
                right: '5%',
            }}
        />
      </div>
    );
  }
}
