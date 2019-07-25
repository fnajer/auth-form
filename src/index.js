import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'modules/App';
import * as serviceWorker from './serviceWorker';
import localeStorage from 'shared/helpers/localStorage'

import { store } from './redux/store'
import { Provider } from 'react-redux'

localeStorage.init()

const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(<AppWithStore/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) {
  module.hot.accept()
}