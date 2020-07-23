import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App } from './components/App';
import { initializeIcons } from '@uifabric/icons';

initializeIcons('fonts/');

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);