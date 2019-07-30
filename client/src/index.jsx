// client/src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as registerServiceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker.unregister();