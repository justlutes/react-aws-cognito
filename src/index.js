import React from 'react';
import ReactDOM from 'react-dom';
import Amplify from 'aws-amplify';
import awsmobile from './aws-exports';
import registerServiceWorker from './registerServiceWorker';
import './css/global.css';
import App from './App';

Amplify.configure(awsmobile);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
