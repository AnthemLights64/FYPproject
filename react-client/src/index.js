import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import memoryUtils from '../src/utils/memoryUtils';
import storageUtils from '../src/utils/storageUtils';

// Read the user saved in local and save it to memory
const user = storageUtils.getUser();
memoryUtils.user = user;

// Render the component tag to the div on the index page
ReactDOM.render(<App />, document.getElementById('root'));