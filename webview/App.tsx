import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import {StyleSheet} from 'react-native';
import {HttpServer, ToastExample} from './Toast/toast';

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
  }

  render() {
    const {port} = this.state;
    return (
      <WebView
        source={{uri: `http://localhost:${port}/index.html`}}
        style={styles.webview}
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
