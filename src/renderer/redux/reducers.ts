import { Action } from './actions'
import { Store } from './store'

const initialState: Store.App = {
	haveAFile: false,
	// fileData: null,
	filename: null,
	filepoints: [],
	bFileLoading: false,
	aPointsInView: []
}

export function appReducers (state: Store.App = initialState, action: Action): Store.App {
	// const { fileData } = state

	switch (action.type) {
		case 'LOAD_FILE':
			return {
				...state,
				bFileLoading: false,
				haveAFile: true,
				// fileData: action.fileData
				filename: action.filename,
				filepoints: action.filepoints
			}
		case 'START_PAGE':
			return {
				...state,
				haveAFile: false,
				// fileData: fileData
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