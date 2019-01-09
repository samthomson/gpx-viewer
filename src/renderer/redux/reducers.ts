import { Action } from './actions'
import { Store } from './store'

const initialState: Store.App = {
	haveAFile: false,
	filePath: 'fdsfds'
}

export function appReducers (state: Store.App = initialState, action: Action): Store.App {
	const { filePath } = state

	switch (action.type) {
		case 'MAP_PAGE':
			return {
				haveAFile: true,
				filePath: action.filePath
			}
		case 'START_PAGE':
			return {
				haveAFile: false,
				filePath: ''
			}
	}

	return state
}