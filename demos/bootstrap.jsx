import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import 'bootstrap';
import { loadSVM } from '../wasm.js';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import store from './store';
import './style.css';

const App = React.lazy(async () => {
  const SVM = await loadSVM();
  window.SVM = SVM;
  return import('./containers/App');
});

const app = document.getElementById('app');
const root = createRoot(app);

root.render(
  <Provider store={store}>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </Provider>,
);
