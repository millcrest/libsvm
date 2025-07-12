import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'jquery';
import 'tether';
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

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Suspense fallback={null}>
        <Component />
      </Suspense>
    </Provider>,
    app,
  );
};

render(App);
