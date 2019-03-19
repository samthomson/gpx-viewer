import { Action } from './actions'
import { Store } from './store'
import { GPXPoint } from '../../declarations';

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
				filepoints: action.filepoints,
				aPointsInView: action.filepoints
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
			let oBounds = action.oBounds
			let aPointsInView: GPXPoint[] = []
			state.filepoints.forEach(oP => {
				if (oBounds.contains([oP.latitude, oP.longitude])) {
					aPointsInView.push(oP)
				}
			})

			return {
				...state,
				aPointsInView: aPointsInView
			}
	}

	return state
}