import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import the styles here to process them with webpack
import './style.scss';

ReactDOM.render(
    <div>
        <h4>Rendered ReactJS / Typescript in Electron</h4>
    </div>,
    document.getElementById('app')
);

