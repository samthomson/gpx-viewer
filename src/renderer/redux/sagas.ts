import * as fs from 'fs'
import { all, put, takeLatest } from 'redux-saga/effects'
import { readingFileFailed, readingFileSucceded } from '../redux/actions'
import { Action, ActionType } from '../redux/actions'
import { parseGPXData } from '../lib/helper'
import { GPXData } from '../../declarations'

function* readFile(action: Action) {
	try {
		// load data
		// @ts-ignore
		const sFileData = fs.readFileSync(action.filename, 'utf8')
		const gpxData: GPXData = parseGPXData(sFileData)

		yield new Promise(r => setTimeout(r, 5000))

		yield put(readingFileSucceded(gpxData))
	} catch (e) {
		console.log('error reading or parsing file? ', e.message)
		put(readingFileFailed())
	}
}

function* watchReadFile() {
	yield takeLatest(ActionType.START_LOADING_FILE, readFile)
}

export default function* rootSaga() {
	yield all([watchReadFile()])
}
