import React, {Component} from 'react';
import {Box, Image} from 'native-base';
import {CameraApp} from '../camera';
export class ImageAcquisitionPage extends Component {
  render(): React.ReactNode {
    return <CameraApp />;
    return (
      <Box alignSelf="center">
        <Image
          source={require('../../public/camera_background.png')}
          alt="Alternate Text"
          padding="100"
          size="xl"
          shadow={3}
          marginTop="60%"
          onProgress={() => {}}
        />
      </Box>
    );
  }
}
