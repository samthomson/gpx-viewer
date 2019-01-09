import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom'
import StartPage from './components/StartPage';
import MapViewPage from './components/MapViewPage';

// Import the styles here to process them with webpack
import './style.scss';

ReactDOM.render(
    <div>
        <h4>GPX Viewer</h4>
		<HashRouter	>
			<div>
				<Route path="/" exact component={ StartPage } />
				<Route path="/mapview" exact component={ MapViewPage } />
			</div>
		</HashRouter>
    </div>,
    document.getElementById('app')
);
