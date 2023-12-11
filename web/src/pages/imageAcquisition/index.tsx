import React, {Component, createRef} from 'react';
import {Camera} from "react-camera-pro";
import {inject, observer} from "mobx-react";
import {IImageAcquisitionPageType} from "./types.ts";
import {IStores} from "../../stores/types.ts";
import {CameraOutlined} from "@ant-design/icons";
import {Button} from "antd";

@inject(({imageAcquisitionStore}: IStores) => ({imageAcquisitionStore}))
@observer
export class ImageAcquisitionPage extends Component<IImageAcquisitionPageType> {
    constructor(props: IStores) {
        super(props);
        const {imageAcquisitionStore} = this.props;
        if (imageAcquisitionStore) {
            imageAcquisitionStore.ref = createRef();
        }
    }
  render(): React.ReactNode {
      const {imageAcquisitionStore} = this.props;
      if (!imageAcquisitionStore) {
          return null;
      }
      return (
          <div style={{
              display: 'flex',
              justifyContent: 'center'
          }}>
              <Camera ref={imageAcquisitionStore.ref} aspectRatio={window.innerWidth / window.innerHeight / 0.9}
                      errorMessages={imageAcquisitionStore.errorMessages}/>
              <Button style={{
                  height: '4rem',
                  width: '4rem',
                  display: 'flex',
                  justifyContent: 'center',
                  border: 'none',
                  opacity: '75%',
                  position: 'absolute',
                  alignItems: 'center',
                  bottom: '15%',
                  backgroundColor: '#262626',
                  borderRadius: '50%',
              }}>
              <CameraOutlined
                  style={{
                      fontSize: '3rem',
                      color: '#ffffff',
                  }}
                  onClick={() => imageAcquisitionStore.takePhoto()}
              />
              </Button>
          </div>
      )
  }
}
