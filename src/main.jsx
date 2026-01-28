import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import App from './app/App';

import { Provider } from 'react-redux';
import store from './redux/configureStore';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
