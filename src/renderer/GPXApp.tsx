import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import the styles here to process them with webpack
import './style.scss';

ReactDOM.render(
    <div>
        <h4>GPX Viewer</h4>
		<p>Drag a gpx file in to see it rendered on a map.</p>
    </div>,
    document.getElementById('app')
);

