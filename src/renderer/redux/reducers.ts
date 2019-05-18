import { Action, ActionType } from './actions'
import { Store } from './store'
import { GPXPoint } from '../../declarations'

const initialState: Store.App = {
	haveAFile: false,
	filename: null,
	filepoints: [],
	bFileLoading: false,
	aPointsInView: [],
}

export function appReducers(
	state: Store.App = initialState,
	action: Action,
): Store.App {
	switch (action.type) {
		case ActionType.LOAD_FILE:
			return {
				...state,
				bFileLoading: false,
				haveAFile: true,
				filename: action.filename,
				filepoints: action.filepoints,
				aPointsInView: action.filepoints,
			}
		case ActionType.START_PAGE:
			const { filename } = action
			return {
				...state,
				haveAFile: false,
				filename,
			}
		case ActionType.START_LOADING_FILE:
			const { bFileLoading } = action
			return {
				...state,
				bFileLoading,
			}
		case ActionType.UPDATE_POINTS_IN_VIEW:
			let oBounds = action.oBounds
			let aPointsInView: GPXPoint[] = []
			state.filepoints.forEach(oP => {
				if (oBounds.contains([oP.latitude, oP.longitude])) {
					aPointsInView.push(oP)
				}
			})

			return {
				...state,
				aPointsInView,
			}
	}

	return state
}
