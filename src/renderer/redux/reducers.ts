import { Action } from './actions'
import { Store } from './store'

const initialState: Store.App = {
	haveAFile: false,
	filename: null,
	filepoints: [],
	bFileLoading: false,
	aPointsInView: []
}

export function appReducers (state: Store.App = initialState, action: Action): Store.App {

	switch (action.type) {
		case 'LOAD_FILE':
			return {
				...state,
				bFileLoading: false,
				haveAFile: true,
				filename: action.filename,
				filepoints: action.filepoints
			}
		case 'START_PAGE':
			return {
				...state,
				haveAFile: false,
				filename: action.filename
			}
		case 'START_LOADING_FILE':
			return {
				...state,
				bFileLoading: action.bFileLoading
			}
		case 'UPDATE_POINTS_IN_VIEW':
			return {
				...state,
				aPointsInView: action.aPointsInView
			}
	}

	return state
}