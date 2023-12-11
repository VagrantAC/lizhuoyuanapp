import {PageController} from './pages';
import {Provider} from 'mobx-react';
import {rootStore} from './stores';

export function App() {
  return (
    <Provider {...rootStore.getStores()}>
        <PageController key={'page_controller'} />
    </Provider>
  );
}

export default App;