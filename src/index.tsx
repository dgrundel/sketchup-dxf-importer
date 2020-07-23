import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import { initializeIcons } from '@uifabric/icons';

initializeIcons('fonts/');
import './css/style.scss';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);