import { Action } from './actions'
import { Store } from './store'

const initialState: Store.App = {
	haveAFile: false,
	fileData: null
}

export function appReducers (state: Store.App = initialState, action: Action): Store.App {
	const { fileData } = state

	switch (action.type) {
		case 'LOAD_FILE':
			return {
				haveAFile: true,
				fileData: action.fileData
			}
		case 'START_PAGE':
			return {
				haveAFile: false,
				fileData: fileData
			}
	}

	return state
}