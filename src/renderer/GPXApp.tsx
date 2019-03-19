import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router'
import { Route, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import StartPage from './components/StartPage';
import MapViewPage from './components/MapViewPage';

import { createStore, Store as ReduxStore } from 'redux'
import { appReducers } from './redux/reducers'
import { goToStartPage, loadFile } from './redux/actions'
import { Store } from './redux/store'

const store: ReduxStore<Store.All> = createStore(appReducers)
import createBrowserHistory from 'history/createBrowserHistory'
export const history = createBrowserHistory()

// Import the styles here to process them with webpack
import './style.scss';


store.subscribe(() => {
	console.log(store.getState())
})

store.dispatch(goToStartPage()) 
store.dispatch(loadFile('./Kuwait.gpx')) 
// store.dispatch(loadFile('./big-file.gpx')) 

ReactDOM.render(
    <div>
		<Provider store={store}>
			<Router history={history}>
				<div>
					<Route path="/" exact component={ StartPage } />
					<Route path="/mapview" component={ MapViewPage } />
				</div>
			</Router>
		</Provider>
    </div>,
    document.getElementById('app')
);
