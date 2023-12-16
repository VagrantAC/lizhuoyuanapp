import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet} from 'react-native';
import {HttpServer, ToastExample} from './Toast/toast';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      port: 0,
    };
  }

  componentDidMount() {
    ToastExample.reset().then(port => this.setState({port}));
    console.log("log HttpServer", HttpServer)
    HttpServer.reset();
    this.requestCamera();
  }

  async requestCamera() {
    try {
      await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
    } catch (error) {
      console.log('Error requesting camera permission:', error);
    }
    try {
      await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    } catch (error) {
      console.log('Error requesting camera permission:', error);
    }
    try {
      await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    } catch (error) {
      console.log('Error requesting camera permission:', error);
    }
    try {
      await request(PERMISSIONS.ANDROID.CAMERA);
    } catch (error) {
      console.log('Error requesting camera permission:', error);
    }
  }

  render() {
    const {port} = this.state;
    return (
      <WebView
        source={{uri: `http://localhost:${port}/index.html`}}
        style={styles.webview}
        mediaPlaybackRequiresUserAction={false}
      />
    );
  }
}

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});

export default App;
