import React from 'react';
import {NativeBaseProvider, Center} from 'native-base';
import {PageController} from './pages';
import {Provider} from 'mobx-react';
import {rootStore} from './stores';

export function App() {
  return (
    <Provider {...rootStore.getStores()} forceRenderOnLocaleChange={false}>
      <NativeBaseProvider>
        <Center>
          <PageController key={'page_controller'} />
        </Center>
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;
