import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import StartPage from './components/StartPage'
import MapViewPage from './components/MapViewPage'

import { applyMiddleware, createStore, Store as ReduxStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { appReducers } from './redux/reducers'
import {
	goToStartPage,
	startLoadingFile,
	setFileLoading,
} from './redux/actions'
import rootSaga from './redux/sagas'
import { Store } from './redux/store'

const sagaMiddleware = createSagaMiddleware()

const store: ReduxStore<Store.App> = createStore(
	appReducers,
	applyMiddleware(sagaMiddleware),
)

sagaMiddleware.run(rootSaga)

import { createBrowserHistory } from 'history'
export const history = createBrowserHistory()

// Import the styles here to process them with webpack
import './style.scss'

store.dispatch(goToStartPage())
// store.dispatch(loadFile('./Kuwait.gpx'))
// store.dispatch(setFileLoading(true))
// store.dispatch(startLoadingFile('./big-file.gpx'))
// store.dispatch(loadFile('./big-file.gpx'))

ReactDOM.render(
	<div>
		<Provider store={store}>
			<Router history={history}>
				<div>
					<Route path="/" exact component={StartPage} />
					<Route path="/mapview" component={MapViewPage} />
				</div>
			</Router>
		</Provider>
	</div>,
	document.getElementById('app'),
)
