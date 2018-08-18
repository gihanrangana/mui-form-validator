import React from 'react';
import ReactDOM from 'react-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import { createGenerateClassName } from '@material-ui/core/styles';

import './styles.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const generateClassName = createGenerateClassName({
    dangerouslyUseGlobalCSS: true,
    productionPrefix: 'c',
});

ReactDOM.render(
    <JssProvider generateClassName={generateClassName}>
        <App />
    </JssProvider>, document.getElementById('root'));
registerServiceWorker();
